import React, { useState } from "react";

//to dispatch and select our actions
import { useDispatch, useSelector } from "react-redux";

//import my function ACTION
import { login, userLoggedIn } from "../store/auth/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //add this on the root of default function
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    console.log("TODO login with:", email, password);

    //Send user email and password to the server through action.js
    dispatch(login(email, password));
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
