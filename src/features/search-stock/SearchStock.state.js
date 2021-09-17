const INITIAL_STATE = {
  requestPending: false,
  requestError: false,
  forms: {
    searchStockTerm: "",
  },
  stockData: {},
};

export const SEARCH_STOCK_TERM_ACTION = "searchStock/SEARCH_STOCK_TERM_ACTION";
export const searchStockTermAction = (searchTerm) => ({
  type: SEARCH_STOCK_TERM_ACTION,
  payload: {
    searchTerm,
  },
});

export const FETCH_STOCK_DATA = "searchStock/FETCH_STOCK_DATA";
export const fetchStockData = () => ({
  type: FETCH_STOCK_DATA,
});

export const FETCH_STOCK_DATA_SUCCESS = "searchStock/FETCH_STOCK_DATA_SUCCESS";
export const fetchStockDataSuccess = (payload) => ({
  type: FETCH_STOCK_DATA_SUCCESS,
  payload,
});

export const FETCH_STOCK_DATA_FAILURE = "searchStock/FETCH_STOCK_DATA_FAILURE";
export const fetchStockDataFailure = () => ({
  type: FETCH_STOCK_DATA_FAILURE,
});

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_STOCK_TERM_ACTION:
      return {
        ...state,
        forms: {
          ...state.forms,
          searchStockTerm: payload.searchTerm,
        },
      };
    case FETCH_STOCK_DATA:
      return {
        ...state,
        requestPending: true,
      };
    case FETCH_STOCK_DATA_SUCCESS:
      return {
        ...state,
        requestPending: false,
        stockData: payload,
      };
    case FETCH_STOCK_DATA_FAILURE:
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
  ...state.searchStock,
});

export const mapDispatchToProps = (dispatch) => ({
  searchStockTermAction: (searchTerm) =>
    dispatch(searchStockTermAction(searchTerm)),
  fetchStockData: () => dispatch(fetchStockData()),
  fetchStockDataSuccess: (payload) => dispatch(fetchStockDataSuccess(payload)),
  fetchStockDataFailure: () => dispatch(fetchStockDataFailure()),
});
