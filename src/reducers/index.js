import { combineReducers } from "redux";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  home: appReducer,
});

export default rootReducer;
