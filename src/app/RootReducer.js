import { combineReducers } from "@reduxjs/toolkit";
import { reducer as searchStockReducer } from "../features/search-stock/SearchStock.state";
import { reducer as searchCryptoReducer } from "../features/search-crypto/SearchCrypto.state";

const rootReducer = combineReducers({
  searchStock: searchStockReducer,
  searchCrypto: searchCryptoReducer
});

export default rootReducer;
