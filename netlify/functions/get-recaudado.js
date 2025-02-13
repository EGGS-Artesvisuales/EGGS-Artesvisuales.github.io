const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    // Obtiene las credenciales de PayPal de las variables de entorno
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      throw new Error("Las credenciales de PayPal no están configuradas en Netlify.");
    }

    // Autenticación con PayPal
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
    const authResponse = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!authResponse.ok) throw new Error("Error en autenticación con PayPal.");

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Obtener transacciones desde PayPal
    const transactionsResponse = await fetch("https://api-m.paypal.com/v1/reporting/transactions?start_date=2024-01-01T00:00:00Z&end_date=2024-12-31T23:59:59Z", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!transactionsResponse.ok) throw new Error("Error al obtener transacciones.");

    const transactionsData = await transactionsResponse.json();

    // Sumar el total recaudado
    let totalRecaudado = 0;
    transactionsData.transaction_details.forEach(txn => {
      totalRecaudado += parseFloat(txn.transaction_info.transaction_amount.value);
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ recaudado: totalRecaudado }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al obtener datos de PayPal", details: error.message }),
    };
  }
};
