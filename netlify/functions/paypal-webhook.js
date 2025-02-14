// netlify/functions/paypal-webhook.js
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

// Ruta donde guardaremos la recaudación en Netlify
const DATA_FILE = path.resolve(__dirname, "recaudacion.json");

// Función para obtener la recaudación actual
function obtenerRecaudacion() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data).recaudado || 0;
  }
  return 0;
}

// Función para actualizar la recaudación
function actualizarRecaudacion(nuevoMonto) {
  const totalRecaudado = obtenerRecaudacion() + nuevoMonto;
  fs.writeFileSync(DATA_FILE, JSON.stringify({ recaudado: totalRecaudado }), "utf8");
  return totalRecaudado;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const body = JSON.parse(event.body);
    console.log("Webhook recibido de PayPal:", body);

    // Validar que el evento es un pago completado
    if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const monto = parseFloat(body.resource.amount.value);
      
      // Actualizar la recaudación total
      const nuevoTotal = actualizarRecaudacion(monto);
      console.log(`Nuevo total recaudado: ${nuevoTotal} USD`);

