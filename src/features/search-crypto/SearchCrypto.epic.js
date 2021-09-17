import * as RxOp from "rxjs/operators";
import * as Rx from "rxjs";
import {
  FETCH_CRYPTO_DATA,
  fetchCryptoDataSuccess,
  fetchCryptoDataFailure,
} from "./SearchCrypto.state";
import { requestCryptoMetadata } from "../../app/api/coinMarketCap.requests";

const buildSearchCryptoMetadataArgs = (state) => ({
  slug: state.searchCrypto.forms.searchCryptoTerm,
});

const fetchStockDataEpic = (action$, state$) =>
  action$.ofType(FETCH_CRYPTO_DATA).pipe(
    RxOp.mergeMap(() =>
      Rx.from(
        requestCryptoMetadata(buildSearchCryptoMetadataArgs(state$.value))
      ).pipe(
        RxOp.flatMap((response) => {
          console.log(response, "crypto response");
          return Rx.of(fetchCryptoDataSuccess(response));
        }),
        RxOp.catchError((error) => {
          console.error(`crypto Error: ${error}`);
          return Rx.of(fetchCryptoDataFailure());
        })
      )
    )
  );

export default fetchStockDataEpic;
