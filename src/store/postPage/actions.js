//to fetch some data
import axios from "axios";

const API_URL = "https://codaisseur-coders-network.herokuapp.com";

export function startLoadingPost() {
  return {
    type: "postPage/startLoadingPost",
  };
}

export function postFullyFetched(data) {
  return {
    type: "postPage/postFullyFetched",
    payload: data,
  };
}

//const newPost
const oneNewPost = (post) => ({ type: "NEW_POST", payload: post });

//this function/action receive the parameter "id" from PostPage
export function fetchPost(id) {
  return async function thunk(dispatch, getState) {
    try {
      //indica que comecou o data loading
      dispatch(startLoadingPost());

      // we use Promise.all because this way, the two requests can be done at the same time, which is faster, instead of just two calls after each other
      const [postResponse, commentsResponse] = await Promise.all([
        axios.get(`${API_URL}/posts/${id}`),
        axios.get(`${API_URL}/posts/${id}/comments`),
      ]);
      console.log("what is postResponse", postResponse);
      console.log("what is commentsResponse", commentsResponse);

      //Dispatch responses to Action  postFullyFetched
      dispatch(
        postFullyFetched({
          post: postResponse.data,
          comments: commentsResponse.data,
        })
      );
    } catch (e) {
      console.log("error from try/catch", e.message);
    }
  };
}

//Create a new Post
export const createPost = (title, content) => async (dispatch, getState) => {
  try {
    const allState = getState();
    const token = allState.auth.token;
    // console.log(token);
    const response = await axios.post(
      `${API_URL}/posts`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("whats is postResponse?", response);

    dispatch(oneNewPost(response.data));
  } catch (e) {
    console.log("error from try/catch", e.message);
  }
};
