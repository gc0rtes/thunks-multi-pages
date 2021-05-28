import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div>
      <Switch>
        {/* more pages to be added here later */}
        <Route component={HomePage} />
      </Switch>
    </div>
  );
}
