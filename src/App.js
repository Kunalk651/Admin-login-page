import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthState from "./contexts/auth/AuthState";
import PrivetRoute from "./components/privateRoute";

function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <AuthState>
      <Router>
        <Navbar />
        <div className="container" style={{ width: "800px" }}>
          <Switch>
            <PrivetRoute exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
}
export default App;
