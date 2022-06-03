import { createStore, applyMiddleware } from "redux";
// import dummyReducer from "./dummyReducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

function dummyReducer(state = {}, action) {
  return state;
}
//dont forget to replace dummy reducer
const store = createStore(
  dummyReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
