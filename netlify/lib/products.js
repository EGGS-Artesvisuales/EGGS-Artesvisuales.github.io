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
  "EGGS-W0019-PUB01-LEP": Object.freeze({
    title: "Mapamundi",
    description: "Publicación de artista en leporello, numerada y firmada",
    currency: "CLP",
    unitPrice: 85000,
    initialStock: 50,
    deliveryOptions: Object.freeze({
      santiago: "Entrega sin costo en Santiago",
      quote_later: "Despacho fuera de Santiago cotizado y pagado después",
    }),
  }),
  "EGGS-S0009-PUB01-LEP": Object.freeze({
    title: "Remiendas Urbanas",
    description: "Publicación de artista en leporello, numerada y firmada",
    currency: "CLP",
    unitPrice: 95000,
    initialStock: 50,
    deliveryOptions: Object.freeze({
      santiago: "Entrega sin costo en Santiago",
      quote_later: "Despacho fuera de Santiago cotizado y pagado después",
    }),
  }),
});

module.exports = { PRODUCTS };
