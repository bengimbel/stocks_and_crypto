import { connect } from "react-redux";

import {
  reducer,
  mapStateToProps,
  mapDispatchToProps,
} from "./SearchCrypto.state";
import SearchCrypto from "./SearchCrypto";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCrypto);

export { reducer, mapStateToProps, mapDispatchToProps };
