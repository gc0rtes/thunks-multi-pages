import React from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreatePost from "./pages/CreatePost";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./store/auth/selectors";
import { logout, bootstrapLoginState, setToken } from "./store/auth/actions";

//lets import useEffect to check if our browser has already a token on local storage
import { useEffect } from "react";

const NavBar = () => {
  const profile = useSelector(getProfile);
  // console.log("whats is profile", profile);
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 20, marginLeft: 10 }}>
        <NavLink to="/" style={{ fontSize: 20 }}>
          Home
        </NavLink>
      </div>
      {!profile ? (
        <>
          {/* if there's NO profile we show Login and Signup */}
          <div style={{ marginRight: 20, marginLeft: 10 }}>
            <NavLink style={{ fontSize: 20 }} to="/login">
              Login
            </NavLink>
          </div>
          <div style={{ marginRight: 20, marginLeft: 10 }}>
            <NavLink style={{ fontSize: 20 }} to="/signup">
              Signup
            </NavLink>
          </div>
        </>
      ) : (
        <>
          {/* if there IS profile we show Create a Post */}
          <div style={{ marginRight: 20, marginLeft: 10 }}>
            <NavLink style={{ fontSize: 20 }} to="/newpost">
              Create a Post
            </NavLink>
          </div>
          <div>
            <h3>Hello {profile.name}!</h3>
          </div>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      )}
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtoken = localStorage.getItem("jwtoken");
    console.log("is there a token in the browser?", jwtoken);
    if (jwtoken) {
      //after we check that exists a token, we get the profile
      dispatch(bootstrapLoginState(jwtoken));
      //however we need set this token on our ReduxState also!
      dispatch(setToken(jwtoken));
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Switch>
        {/* more pages to be added here later */}
        <Route path="/post/:id" component={PostPage} />
        <Route path="/newpost" component={CreatePost} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
