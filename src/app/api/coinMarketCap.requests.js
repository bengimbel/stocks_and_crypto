import { makeRequest } from "./client";

const coinMarketCapRequest = async ({ path, params }) => {
  const baseURL = `https://pro-api.coinmarketcap.com/v1`;
  const response = await makeRequest(baseURL, {
    path,
    queryParams: {
      ...params,
      CMC_PRO_API_KEY: process.env.REACT_APP_COIN_MARKET_CAP_API_KEY,
    },
    headers: {
      // "X-CMC_PRO_API_KEY": `${process.env.REACT_APP_COIN_MARKET_CAP_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    json: true,
    gzip: true
  });
  const coinMarketCapResponse = response?.data;

  return coinMarketCapResponse;
};

export const requestCryptoMetadata = ({ slug }) =>
  coinMarketCapRequest({
    path: `/cryptocurrency/info`,
    params: {
      slug
    },
  });

// export const requestStockNews = ({ stockTicker }) =>
//   polygonRequest({
//     path: `/v2/reference/news`,
//     params: {
//       ticker: stockTicker,
//     },
//   });

// export const requestStockDailyOpenCloseByDate = ({ stockTicker }) =>
//   polygonRequest({
//     path: `/v1/open-close/${stockTicker}/${getYesterdayDate()}`,
//   });

// export const requestStockPreviousDayOpenClose = ({ stockTicker }) =>
//   polygonRequest({
//     path: `/v2/aggs/ticker/${stockTicker}/prev`,
//   });
