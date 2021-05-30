const initialState = {
  profile: null, // the logged-in user
  token: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "authPage/SET_TOKEN": {
      return {
        ...state,
        token: action.payload,
      };
    }
    case "authPage/SET_PROFILE": {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case "authPage/LOGOUT": {
      return {
        profile: null,
        token: null,
      };
    }
    default: {
      return state;
    }
  }
}
