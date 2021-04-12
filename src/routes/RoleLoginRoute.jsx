import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import Login from "../components/Login/Login";

const RoleLoginRoute = () => {
  let { path } = useRouteMatch();
  console.log(path);
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${path}/user`}>
          <Login role="user" />
        </Route>
        <Route exact path={`${path}/seller`}>
          <Login role="seller" />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default RoleLoginRoute;
