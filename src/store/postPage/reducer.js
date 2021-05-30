const initialState = {
  loading: true,
  post: null,
  comments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
