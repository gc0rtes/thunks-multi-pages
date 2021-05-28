import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//Inject the store into the app by wrapping the App component in React-Redux's Provider
import { Provider } from "react-redux";
import store from "./store";

//Inject the router into the app by wrapping the App component in a Router
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
