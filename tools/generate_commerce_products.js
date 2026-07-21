#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "_productos_es");
const OUTPUT_FILE = path.join(ROOT, "netlify", "lib", "products.js");
const CHECKOUT_CATEGORIES = new Set(["impresiones-y-fotografia", "publicaciones"]);
const LOCALE_DIRECTORIES = Object.freeze({
  es: "_productos_es",
  en: "_productos_en",
  mpd: "_productos_mpd",
  chn: "_productos_chn",
});
const DELIVERY_OPTIONS = Object.freeze({
  santiago: "Santiago — entrega sin costo",
  rm_outer: "Región Metropolitana fuera de Santiago",
  chile_central: "Chile centro",
  chile_north: "Chile norte",
  chile_south: "Chile sur",
  chile_extreme: "Chile extremo o insular",
  international_americas: "Internacional — América",
  international_europe: "Internacional — Europa",
  international_rest: "Internacional — resto del mundo",
});

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  if (/^-?\d+$/.test(value)) return Number(value);
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

function readFrontMatter(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Falta front matter en ${filePath}`);

  return match[1].split(/\r?\n/).reduce((data, line) => {
    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (field) data[field[1]] = parseScalar(field[2]);
    return data;
  }, {});
}

const files = fs
  .readdirSync(PRODUCTS_DIR)
  .filter((file) => file.endsWith(".md"))
  .sort();

const localizedProducts = Object.fromEntries(
  Object.entries(LOCALE_DIRECTORIES).map(([locale, directory]) => {
    const collection = new Map();
    const directoryPath = path.join(ROOT, directory);
    for (const file of fs.readdirSync(directoryPath).filter((name) => name.endsWith(".md"))) {
      const data = readFrontMatter(path.join(directoryPath, file));
      if (data.sku) collection.set(String(data.sku), data);
    }
    return [locale, collection];
  }),
);

const products = files.map((file) => {
  const data = readFrontMatter(path.join(PRODUCTS_DIR, file));
  if (!CHECKOUT_CATEGORIES.has(data.category)) return null;
  const required = ["sku", "title", "description", "price_clp", "stock"];
  for (const field of required) {
    if (data[field] === undefined || data[field] === "") {
      throw new Error(`${file}: falta ${field}`);
    }
  }
  if (!Number.isInteger(data.price_clp) || data.price_clp <= 0) {
    throw new Error(`${file}: price_clp debe ser un entero positivo`);
  }
  if (!Number.isInteger(data.stock) || data.stock <= 0) {
    throw new Error(`${file}: stock debe ser un entero positivo`);
  }

  const localized = Object.fromEntries(
    Object.entries(localizedProducts).map(([locale, collection]) => {
      const translation = collection.get(String(data.sku));
      if (!translation?.title || !translation?.description) {
        throw new Error(`${file}: falta traducción ${locale} para ${data.sku}`);
      }
      return [
        locale,
        {
          title: String(translation.title),
          description: String(translation.description),
        },
      ];
    }),
  );

  return {
    sku: String(data.sku),
    title: String(data.title),
    description: String(data.description),
    unitPrice: data.price_clp,
    initialStock: data.stock,
    binaryMode: data.stock === 1,
    localized,
  };
}).filter(Boolean);

const duplicateSkus = products
  .map((product) => product.sku)
  .filter((sku, index, all) => all.indexOf(sku) !== index);
if (duplicateSkus.length) {
  throw new Error(`SKU duplicado: ${[...new Set(duplicateSkus)].join(", ")}`);
}

products.sort((a, b) => a.sku.localeCompare(b.sku));

const lines = [
  "// Productos estandarizados generados desde _productos_es. No editar manualmente.",
  "const DELIVERY_OPTIONS = Object.freeze({",
];

for (const [key, label] of Object.entries(DELIVERY_OPTIONS)) {
  lines.push(`  ${key}: ${JSON.stringify(label)},`);
}

lines.push("});", "", "const PRODUCTS = Object.freeze({");

for (const product of products) {
  lines.push(`  ${JSON.stringify(product.sku)}: Object.freeze({`);
  lines.push(`    sku: ${JSON.stringify(product.sku)},`);
  lines.push(`    title: ${JSON.stringify(product.title)},`);
  lines.push(`    description: ${JSON.stringify(product.description)},`);
  lines.push('    currency: "CLP",');
  lines.push(`    unitPrice: ${product.unitPrice},`);
  lines.push(`    initialStock: ${product.initialStock},`);
  lines.push(`    binaryMode: ${product.binaryMode},`);
  lines.push("    deliveryOptions: DELIVERY_OPTIONS,");
  lines.push("    localized: Object.freeze({");
  for (const [locale, translation] of Object.entries(product.localized)) {
    lines.push(`      ${locale}: Object.freeze({`);
    lines.push(`        title: ${JSON.stringify(translation.title)},`);
    lines.push(`        description: ${JSON.stringify(translation.description)},`);
    lines.push("      }),");
  }
  lines.push("    }),");
  lines.push("  }),");
}

lines.push("});", "", "module.exports = { PRODUCTS };", "");
fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf8");
console.log(`Catálogo de comercio generado: ${products.length} productos.`);
