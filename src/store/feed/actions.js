import axios from "axios";

//Action creator
const savePosts = (allPosts) => ({ type: "STORE_POSTS", payload: allPosts });

const startLoading = () => ({ type: "START_LOADING" });
const stopLoading = () => ({ type: "STOP_LOADING" });

//const newPost

// Parametrized thunk,  my thunk  function can freely orchestrate any number of subsequent dispatches!!
export const fetchPosts = () => async (dispatch, getState) => {
  try {
    //Add the parameters dispatch()
    dispatch(startLoading());

    //Add the parameters getState()
    const state = getState();

    //Add offset
    const offset = state.feed.posts.length; //primeira vez offset=0 e vai fazer fetch de limite 5/ a segunda vez offset igual a 5 (igual o length da array) e vai puxar a partir do elemento cinco da array ( a parte inicial vai estar armazenada no reduxstate ). Na 3a volta, offset = 10 e vai puxar a aprti do elemento 10 na array...

    // console.log("what is offset", offset);

    const response = await axios.get(
      `https://codaisseur-coders-network.herokuapp.com/posts?offset=${offset}&limit=5`
    );
    const fetchNext5Posts = response.data.rows;
    dispatch(savePosts(fetchNext5Posts));

    dispatch(stopLoading());
  } catch (e) {
    console.log(e.message);
  }
};
