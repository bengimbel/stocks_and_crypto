import * as RxOp from "rxjs/operators";
import * as Rx from "rxjs";
import {
  FETCH_STOCK_DATA,
  fetchStockDataSuccess,
  fetchStockDataFailure,
} from "./SearchStock.state";
import {
  requestStockTicker,
  requestStockNews,
  requestStockDailyOpenCloseByDate,
  requestStockPreviousDayOpenClose,
} from "../../app/api/polygon.requests";

const buildSearchStockArgs = (state) => ({
  stockTicker: state.searchStock.forms.searchStockTerm,
});

const buildResponsePayload = (stockTicker) => ({
  stockTickerData: requestStockTicker({ stockTicker }),
  stockNewsData: requestStockNews({ stockTicker }),
  stockOpenCloseByDateData: requestStockDailyOpenCloseByDate({
    stockTicker,
  }),
  stockPreviousDayOpenCloseData: requestStockPreviousDayOpenClose({
    stockTicker,
  }),
});

const fetchStockDataEpic = (action$, state$) =>
  action$.ofType(FETCH_STOCK_DATA).pipe(
    RxOp.mergeMap(() =>
      Rx.from([buildSearchStockArgs(state$.value)]).pipe(
        RxOp.mergeMap(({ stockTicker }) =>
          Rx.forkJoin(buildResponsePayload(stockTicker)).pipe(
            RxOp.flatMap((response) => {
              console.log(response, "response");
              return Rx.of(fetchStockDataSuccess(response));
            }),
            RxOp.catchError((error) => {
              console.error(`Error: ${error}`);
              return Rx.of(fetchStockDataFailure());
            })
          )
        )
      )
    )
  );

export default fetchStockDataEpic;
