import React, { useState } from "react";

//to dispatch and select our actions
import { useDispatch, useSelector } from "react-redux";

//import my function ACTION
import { login, userLoggedIn } from "../store/auth/actions";

//Use history to send user to another page
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //add this on the root of default function
  const dispatch = useDispatch();

  //add this on the root of default function
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("TODO login with:", email, password);

    //Send user email and password to the server through action.js from useState of this component
    dispatch(login(email, password, history));

    //send the user to the HomePage after push login button here works...
    //However if something goes wrong on the server after press the button, the user is redirect to homepage without loggedin
    //is better send hitory to the thunk
    // history.push("/");
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Email:{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
    </div>
  );
}
