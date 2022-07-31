import * as coda from "@codahq/packs-sdk";
import * as schemas from "./schemas";
import * as helpers from "./helpers";

export const pack = coda.newPack();

pack.addNetworkDomain("paper-api.alpaca.markets");

pack.setSystemAuthentication({
  type: coda.AuthenticationType.Custom,
  params: [
    {name: "APCA-API-KEY-ID", description: "The API key"},
    {name: "APCA-API-SECRET-KEY", description: "The Secret key"},
  ],
});


pack.addFormula({
  name: "Account",
  description:
    "Retrieve various account information.",
  parameters: [],
  resultType: coda.ValueType.Object,
  schema: schemas.AccountSchema,
  execute: async function ([], context) {
    return helpers.getAccount(context);
  },
});

pack.addFormula({
  name: "Positions",
  description:
    "Retrive a list of the account's open positions or the open position of the given symbol.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "symbol",
      description:
        "A given symbol.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Array,
  items: schemas.PositionSchema,
  execute: async function ([symbol], context) {
    return helpers.getPositions(context, symbol);
  },
});

pack.addFormula({
  name: "Assets",
  description:
    "Get a list of assets or an asset for the given symbol.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "symbol",
      description:
        "A given symbol.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Array,
  items: schemas.AssetSchema,
  execute: async function ([symbol], context) {
    return helpers.getAssets(context, symbol);
  },
});

pack.addFormula({
  name: "Orders",
  description:
    "Get a list of orders for the account or a single order for the given order id.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "order_id",
      description:
        "A given order id.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Array,
  items: schemas.OrderSchema,
  execute: async function ([order_id], context) {
    return helpers.getOrders(context, order_id);
  },
});
