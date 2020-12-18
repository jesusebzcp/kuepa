import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Pages
import Home from "../pages/Home";
import Login from "../pages/Login";

//Components
import NavBar from "../components/NavBar";

const RouterApp = () => {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};
export default RouterApp;
