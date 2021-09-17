import axios from "axios";
import qs from "query-string";

export const makeRequest = (
  baseURL,
  { HTTPMethod, path, queryParams, headers, body }
) =>
  axios({
    method: HTTPMethod,
    url: baseURL + path,
    params: queryParams,
    headers,
    body,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "bracket" }),
  });
