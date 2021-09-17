import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./RootReducer";
import rootEpic from "./RootEpic";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().prepend(
      epicMiddleware
  ),
  devTools: process.env.NODE_ENV !== "production",
});

epicMiddleware.run(rootEpic);

export default store
