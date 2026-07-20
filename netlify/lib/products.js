const PRODUCTS = Object.freeze({
  "EGGS-S0008-PUB01": Object.freeze({
    title: "Intervenciones publicitarias 2007–2011",
    description: "Publicación de artista numerada y firmada",
    currency: "CLP",
    unitPrice: 120000,
    initialStock: 50,
    deliveryOptions: Object.freeze({
      santiago: "Entrega sin costo en Santiago",
      quote_later: "Despacho fuera de Santiago cotizado y pagado después",
    }),
  }),
});

module.exports = { PRODUCTS };
