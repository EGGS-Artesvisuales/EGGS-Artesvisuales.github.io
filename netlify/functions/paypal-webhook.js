// netlify/functions/paypal-webhook.js

exports.handler = async (event, context) => {
  // Solo aceptar solicitudes POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  // Para depuración: loguear el cuerpo del webhook recibido
  console.log("Webhook recibido de PayPal:", event.body);

  // Aquí iría la lógica de validación y actualización de datos
  // Por ahora, solo responderemos confirmando la recepción

  return {
    statusCode: 200,
    body: "Webhook recibido"
  };
};

