const fetch = require("node-fetch");

// Obtener credenciales de PayPal desde las variables de entorno
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
  console.error("Error: Las credenciales de PayPal no están definidas.");
}

exports.handler = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Faltan las credenciales de PayPal." })
      };
    }

    // Llamada a la API de PayPal (sustituir con una real)
    const recaudadoUSD = 0; // monto recaudado

    return {
      statusCode: 200,
      body: JSON.stringify({ recaudado: recaudadoUSD })
    };
  } catch (error) {
    console.error("Error al obtener datos de PayPal:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo obtener la recaudación.", details: error.message })
    };
  }
};

