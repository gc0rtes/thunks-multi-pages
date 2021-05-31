//to fetch some data
import axios from "axios";

const API_URL = "https://codaisseur-coders-network.herokuapp.com";

//ACTION creator
export function setToken(token) {
  return {
    type: "authPage/SET_TOKEN",
    payload: token,
  };
}

export function setProfile(profile) {
  return {
    type: "authPage/SET_PROFILE",
    payload: profile,
  };
}

export const logout = () => ({
  type: "authPage/LOGOUT",
});

// A thunk creator to make a request to /login
export function login(email, password, history) {
  return async function thunk(dispatch, getState) {
    try {
      const loginResponse = await axios.post(`${API_URL}/login/`, {
        email: email,
        password: password,
      });
      const jwtoken = loginResponse.data.jwt;

      dispatch(setToken(jwtoken));

      localStorage.setItem("jwtoken", jwtoken);

      dispatch(bootstrapLoginState(jwtoken));

      // const profileResponse = await axios.get(`${API_URL}/me`, {
      //   headers: { Authorization: `Bearer ${jwtoken}` },
      // });
      // const profile = profileResponse.data;
      // dispatch(setProfile(profile));

      //if everthing went well we'll send the user to homePage
      history.push("/");
    } catch (e) {
      console.log("error from try/catch", e.message);
    }
  };
}

//An action (a thunk) to make a request to /signup
export const signup = (name, email, password) => async (dispatch, getSate) => {
  try {
    const signupResponse = await axios.post(`${API_URL}/signup`, {
      name: name,
      email: email,
      password: password,
    });
    const jwtoken = signupResponse.data.jwt;

    dispatch(setToken(jwtoken));

    localStorage.setItem("jwtoken", jwtoken);

    dispatch(bootstrapLoginState(jwtoken));

    // //request to the server the user profile
    // const profileResponse = await axios.get(`${API_URL}/me`, {
    //   headers: { Authorization: `Bearer ${jwt}` },
    // });
    // const profile = profileResponse.data;
    // dispatch(setProfile(profile));
  } catch (e) {
    console.log(e.message);
  }
};

// The profile request is the same on login and signup. Make a thunk specific to setProfile and DRY the code.
//Create a new thunk called 'bootstrapLoginState'  and dispatch the thunk once whenever the app is rendered
export const bootstrapLoginState = (token) => async (dispatch, getState) => {
  try {
    const profileResponse = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profile = profileResponse.data;
    dispatch(setProfile(profile));
  } catch (e) {
    console.log(e.message);
  }
};
