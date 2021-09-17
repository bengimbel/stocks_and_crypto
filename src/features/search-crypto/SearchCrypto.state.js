const INITIAL_STATE = {
  requestPending: false,
  requestError: false,
  forms: {
    searchCryptoTerm: "",
  },
  cryptoData: {},
};

export const SEARCH_CRYPTO_TERM_ACTION =
  "searchStock/SEARCH_CRYPTO_TERM_ACTION";
export const searchCryptoTermAction = (searchTerm) => ({
  type: SEARCH_CRYPTO_TERM_ACTION,
  payload: {
    searchTerm,
  },
});

export const FETCH_CRYPTO_DATA = "searchStock/FETCH_CRYPTO_DATA";
export const fetchCryptoData = () => ({
  type: FETCH_CRYPTO_DATA,
});

export const FETCH_CRYPTO_DATA_SUCCESS =
  "searchStock/FETCH_CRYPTO_DATA_SUCCESS";
export const fetchCryptoDataSuccess = (payload) => ({
  type: FETCH_CRYPTO_DATA_SUCCESS,
  payload,
});

export const FETCH_CRYPTO_DATA_FAILURE =
  "searchStock/FETCH_CRYPTO_DATA_FAILURE";
export const fetchCryptoDataFailure = () => ({
  type: FETCH_CRYPTO_DATA_FAILURE,
});

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_CRYPTO_TERM_ACTION:
      return {
        ...state,
        forms: {
          ...state.forms,
          searchCryptoTerm: payload.searchTerm,
        },
      };
    case FETCH_CRYPTO_DATA:
      return {
        ...state,
        requestPending: true,
      };
    case FETCH_CRYPTO_DATA_SUCCESS:
      return {
        ...state,
        requestPending: false,
        cryptoData: payload,
      };
    case FETCH_CRYPTO_DATA_FAILURE:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    default:
      return state;
  }
};

export const mapStateToProps = (state) => ({
  ...state.searchCrypto,
});

export const mapDispatchToProps = (dispatch) => ({
  searchCryptoTermAction: (searchTerm) =>
    dispatch(searchCryptoTermAction(searchTerm)),
  fetchCryptoData: () => dispatch(fetchCryptoData()),
  fetchCryptoDataSuccess: (payload) =>
    dispatch(fetchCryptoDataSuccess(payload)),
  fetchCryptoDataFailure: () => dispatch(fetchCryptoDataFailure()),
});
