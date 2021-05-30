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

// A thunk creator
export function login(email, password) {
  // Return the thunk itself, i.e. a function
  return async function thunk(dispatch, getState) {
    try {
      //request to the server the JWToken
      const loginResponse = await axios.post(`${API_URL}/login/`, {
        email: email,
        password: password,
      });
      // console.log("what is loginResponse", loginResponse);

      //here is my token!!
      // console.log("what is my JWToken", loginResponse.data.jwt);
      const jwtoken = loginResponse.data.jwt;
      dispatch(setToken(jwtoken));

      //Send the TWKoen to local broswer storage so it persists even when refresh page browser
      localStorage.setItem("jwt", jwtoken);

      //request to the server the user profile
      const profileResponse = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${jwtoken}` },
      });
      // console.log("what is my profileResponse", profileResponse);

      //here is the user profile!!
      const profile = profileResponse.data;
      // console.log("what is my userProfile", userProfile);
      dispatch(setProfile(profile));
    } catch (e) {
      console.log("error from try/catch", e.message);
    }

    // console.log(
    //   "TODO: make login request, get an access token",
    //   email,
    //   password
    // );
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
    console.log("what is signupResponse", signupResponse);
    const jwt = signupResponse.data.jwt;
    dispatch(setToken(jwt));

    //request to the server the user profile
    const profileResponse = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("what is profileResponse", profileResponse);
    const profile = profileResponse.data;
    dispatch(setProfile(profile));
  } catch (e) {
    console.log(e.message);
  }
};

// //Create a new thunk called 'bootstrapLoginState'  and dispatch the thunk once whenever the app is rendered
// export const bootstrapLogin = () => async (dispatch, getState) =>  {
//   //Get the TWKoen from the local broswer storage
//   const jwt = localStorage.getItem("jwt");

// }
