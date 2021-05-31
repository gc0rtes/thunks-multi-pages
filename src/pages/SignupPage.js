import { useState } from "react";
import { signup } from "../store/auth/actions";
import { useDispatch } from "react-redux";

//Use history to send user to another page
import { useHistory } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //add this on the root of default function
  const dispatch = useDispatch();
  //add this on the root of default function
  const history = useHistory();

  const onSignupSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password, history));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={onSignupSubmit}>
        <div>
          <label style={{ marginRight: 20 }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: 20 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: 20 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
