import { combineReducers } from "redux";
import loaderReducer from "../reducers/loaderReducer";
import userReducer from "../reducers/userReducer";
import employeeRecordsReducer from "../reducers/employeeRecordsReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  employees: employeeRecordsReducer,
});
