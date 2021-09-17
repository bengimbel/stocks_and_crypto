import { connect } from "react-redux";

import {
  reducer,
  mapStateToProps,
  mapDispatchToProps,
} from "./SearchStock.state";
import SearchStock from "./SearchStock";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchStock);

export { reducer, mapStateToProps, mapDispatchToProps };
