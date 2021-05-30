const initialState = {
  loading: true,
  post: null,
  comments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "postPage/startLoadingPost": {
      return {
        loading: true,
        post: null,
        comments: [],
      };
    }
    case "postPage/postFullyFetched": {
      return {
        loading: false,
        post: action.payload.post,
        comments: action.payload.comments,
      };
    }

    default: {
      return state;
    }
  }
}
