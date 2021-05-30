//Create a combine root reducer
import { combineReducers } from "redux";
import feedReducer from "./feed/reducer";
import postPageReducer from "./postPage/reducer";
import authReducer from "./auth/reducer";

//here is where I defined my names of state /slices
export default combineReducers({
  feed: feedReducer,
  postPage: postPageReducer,
  auth: authReducer,
});
