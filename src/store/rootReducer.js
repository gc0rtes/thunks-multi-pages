//Create a combine root reducer
import postReducer from "./posts/reducer";
import userReducer from "./user/reducer";
import specificPostReducer from "./postPage/reducer";
import { combineReducers } from "redux";

//here is where I defined my names of state /slices
export default combineReducers({
  posts: postReducer,
  user: userReducer,
  specificPost: specificPostReducer,
});
