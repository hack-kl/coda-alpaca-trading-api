import * as coda from "@codahq/packs-sdk";

const ALPACA_BASE_URL = "https://paper-api.alpaca.markets/v2/";


export async function alpacaApiFetch(
  context: coda.ExecutionContext,
  endpoint: string,
  query: string,
  options?: string[]
) {
  let invocationToken = context.invocationToken;
  let keyPlaceholder = "{{APCA-API-KEY-ID-" + invocationToken + "}}";
  let secretPlaceholder = "{{APCA-API-SECRET-KEY-" + invocationToken + "}}";

  // Build the URL
  let url =
    ALPACA_BASE_URL +
    endpoint;
  if (query)
    url += "/" + encodeURIComponent(query);
  // Add options to it, if any
  if (options?.length) {
    url += "/";
    options.forEach((option) => {
      url += option + ",";
    });
  }
  console.log(url);

  const response = await context.fetcher.fetch({
    method: "GET",
    headers: {
      "APCA-API-KEY-ID": keyPlaceholder,
      "APCA-API-SECRET-KEY": secretPlaceholder, 
    },
    url: url,
  });
  return response;
}

export async function getAccount(context: coda.ExecutionContext) {
  const res = await alpacaApiFetch(context, "account")
  return res.body;
}

export async function getPositions(context: coda.ExecutionContext, query: string) {
  const res = await alpacaApiFetch(context, "positions", query)
  return res.body;
}

export async function getAssets(context: coda.ExecutionContext, query: string) {
  const res = await alpacaApiFetch(context, "assets", query)
  return res.body;
}

export async function getOrders(context: coda.ExecutionContext, query: string) {
  const res = await alpacaApiFetch(context, "orders", query)
  return res.body;
}
