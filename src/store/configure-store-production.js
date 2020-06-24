import { createStore } from "redux";
import { applyMiddleware } from "redux";
import promise from "redux-promise";
import { rootReducer } from "../redux/reducers/index";

const enhancer = applyMiddleware(promise);

const configureStore = (initialState) =>
  createStore(rootReducer, initialState, enhancer);

export default configureStore();
