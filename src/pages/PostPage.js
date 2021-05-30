//To trigger our fetch function
import { useEffect } from "react";

//to dispatch and select our actions
import { useDispatch, useSelector } from "react-redux";

//To access route parameters from dynamic routes
import { useParams } from "react-router-dom";

//import my fetch thunk function ACTION
import { fetchSpecificPost } from "../store/postPage/actions";

export default function PostPage() {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSpecificPost(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Post Page Here!</h1>
      <p>Your id parameter is {id}</p>
    </div>
  );
}
