import {
  map,
  has,
  ifElse,
  pipe,
  prop,
  mapObjIndexed,
  identity,
  cond,
  both,
  always,
  T,
} from "ramda";

export const init = reducer => reducer(undefined, { type: "@@INIT" });

// Redundant function call to get scoping rules to work
// properly
const initializeNestedStates = map(
  ifElse(
    has("reducer"),
    pipe(
      prop("reducer"),
      init
    ),
    o => initializeNestedStates(o)
  )
);

const mapNestedStateToProps = (nestedConfig, state) =>
  mapObjIndexed((value, key) => {
    return has("mapStateToProps", value)
      ? value.mapStateToProps(state[key])
      : mapNestedStateToProps(value, state[key]);
  }, nestedConfig);

const wrapActionFn = (actionFn, actionType, dispatch) => (...args) =>
  dispatch({
    type: actionType,
    payload: { action: actionFn(...args) },
  });

const wrapActionFnsRecursively = (actionFnsObj, actionType, dispatch) =>
  map(
    value =>
      typeof value === "function"
        ? wrapActionFn(value, actionType, dispatch)
        : wrapActionFnsRecursively(value, actionType, dispatch),
    actionFnsObj
  );

const mapNestedDispatchToProps = (nestedConfig, dispatch) =>
  map(
    value =>
      has("mapDispatchToProps", value)
        ? wrapActionFnsRecursively(
            value.mapDispatchToProps(identity),
            value.actionType,
            dispatch
          )
        : mapNestedDispatchToProps(value, dispatch),
    nestedConfig
  );

const evaluateNestedReducers = (nestedConfig, state, action) => {
  return mapObjIndexed(
    (value, key) =>
      cond([
        [
          both(has("reducer"), has("actionType")),
          cond([
            [
              v => v.actionType === action.type,
              v => v.reducer(state[key], action.payload.action),
            ],
            [T, always(state[key])],
          ]),
        ],
        [T, v => evaluateNestedReducers(v, state[key], action)],
      ])(value),
    nestedConfig
  );
};

export const nestedAction = actionType => action => ({
  type: actionType,
  payload: {
    action,
  },
});

export const nestStates = (
  { reducer, mapStateToProps, mapDispatchToProps },
  nestedConfig,
  stateKey
) => ({
  reducer: (
    state = {
      ...init(reducer),
      ...initializeNestedStates(nestedConfig),
    },
    action
  ) => {
    const stateWithNestedUpdated = evaluateNestedReducers(
      nestedConfig,
      state,
      action
    );
    return reducer(
      {
        ...state,
        ...stateWithNestedUpdated,
      },
      action
    );
  },
  mapStateToProps: state => ({
    ...mapStateToProps(state),
    ...mapNestedStateToProps(nestedConfig, state[stateKey]),
  }),
  mapDispatchToProps: dispatch => ({
    ...mapDispatchToProps(dispatch),
    actions: mapNestedDispatchToProps(nestedConfig, dispatch),
  }),
});
