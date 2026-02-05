// netlify/functions/get-recaudado.js
// Node 18+ trae fetch nativo: NO uses node-fetch.

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

exports.handler = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      console.error("Error: Las credenciales de PayPal no están definidas.");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Faltan las credenciales de PayPal." }),
      };
    }

    // Por ahora: valor fijo (placeholder).
    // Aquí luego conectas con API real de PayPal si lo necesitas.
    const recaudadoUSD = 0;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ recaudado: recaudadoUSD }),
    };
  } catch (error) {
    console.error("Error al obtener datos de PayPal:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        error: "No se pudo obtener la recaudación.",
        details: error?.message || String(error),
      }),
    };
  }
};
