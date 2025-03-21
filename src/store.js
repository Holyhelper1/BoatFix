import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { appReducer, userReducer, orderReducer } from "./reducers";
import { authReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  order: orderReducer,
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
