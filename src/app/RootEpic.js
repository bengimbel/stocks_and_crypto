import { combineEpics } from "redux-observable";
import fetchStockDataEpic from "../features/search-stock/SearchStock.epic";
import fetchCryptoMetadataEpic from "../features/search-crypto/SearchCrypto.epic";
const rootEpic = combineEpics(
  fetchStockDataEpic,
  fetchCryptoMetadataEpic
);

export default rootEpic;
