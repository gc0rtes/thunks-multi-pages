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

export function fetchSpecificPost(id) {
  return async function thunk(dispatch, getState) {
    //indica que comecou o data loading
    dispatch(startLoadingPost());

    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`${API_URL}/posts/${id}`),
      axios.get(`${API_URL}/posts/${id}/comments`),
    ]);
    console.log("what is postResponse", postResponse);
    console.log("what is commentsResponse", commentsResponse);
    //envia para a acao
    dispatch(
      postFullyFetched({
        post: postResponse.data,
        comments: commentsResponse.data,
      })
    );
  };
}
