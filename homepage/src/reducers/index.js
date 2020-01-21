import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import itemReducer from "./itemReducer.js";
import errorReducer from "./errorReducer.js";
import authReducer from "./authReducer.js";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
export default history =>
  combineReducers({
    item: itemReducer,
    router: connectRouter(history),
    error: errorReducer,
    auth: authReducer,
    roomr: roomReducer,
    user: userReducer
  });
