const { getTurnstileConfig } = require("../lib/checkout-security");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        Allow: "GET",
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const turnstile = getTurnstileConfig();
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify({
      turnstile_enabled: turnstile.enabled,
      turnstile_site_key: turnstile.enabled ? turnstile.siteKey : "",
    }),
  };
};
