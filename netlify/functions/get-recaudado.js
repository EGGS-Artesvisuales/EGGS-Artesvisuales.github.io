exports.handler = async function () {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaudado: 1000 }) // Simulación de datos
    };
};
