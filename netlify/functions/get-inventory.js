const { PRODUCTS } = require("../lib/products");
const { connectInventory, getInventory } = require("../lib/inventory");

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Método no permitido." });
  }

  const sku = String(event.queryStringParameters?.sku || "").trim();
  if (!PRODUCTS[sku]) {
    return jsonResponse(404, { error: "Producto no encontrado." });
  }

  try {
    await connectInventory(event);
    return jsonResponse(200, await getInventory(sku));
  } catch (error) {
    console.error("No se pudo consultar el inventario.", error);
    return jsonResponse(503, { error: "No se pudo consultar el inventario." });
  }
};
