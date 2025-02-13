exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total: 69000, porcentaje: (69000 / 23000000) * 100 })
    };
};
