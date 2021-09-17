import { getYesterdayDate } from "../../util/general";
import { makeRequest } from "./client";

const polygonRequest = async ({ path, params }) => {
  const baseURL = `https://api.polygon.io`;
  const response = await makeRequest(baseURL, {
    path,
    queryParams: {
      ...params,
      apiKey: process.env.REACT_APP_POLYGON_API_KEY,
    },
    headers: {
      // Authorization: `Bearer ${process.env.REACT_APP_POLYGON_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const polygonResponse = response?.data;

  return polygonResponse;
};

export const requestStockTicker = ({ stockTicker }) =>
  polygonRequest({
    path: `/v3/reference/tickers`,
    params: {
      ticker: stockTicker,
    },
  });

export const requestStockNews = ({ stockTicker }) =>
  polygonRequest({
    path: `/v2/reference/news`,
    params: {
      ticker: stockTicker,
    },
  });

export const requestStockDailyOpenCloseByDate = ({ stockTicker }) =>
  polygonRequest({
    path: `/v1/open-close/${stockTicker}/${getYesterdayDate()}`,
  });

export const requestStockPreviousDayOpenClose = ({ stockTicker }) =>
  polygonRequest({
    path: `/v2/aggs/ticker/${stockTicker}/prev`,
  });
