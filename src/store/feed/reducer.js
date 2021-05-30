const initialState = {
  loading: false,
  posts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STORE_POSTS": {
      const newPosts = action.payload;
      return {
        // ...state, //in this case we won't need do this copy the state again
        posts: [...state.posts, ...newPosts], //we are getting the data with offset of 5, so we need to keeping what we have and then adding more when requested
      };
    }
    case "START_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "STOP_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
