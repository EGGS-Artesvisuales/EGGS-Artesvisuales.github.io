exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaudado: 69000 }) // Puedes cambiarlo para probar
    };
};
