import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

// <>는 Fragment로 많은 요소들을 render하고 싶을 때 사용한다. (부모요소가 없을 때)
// div태그나 span태그를 넣기 싫을 때 사용하기도 한다.
const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <>
          <Route exact path="/">
            {isLoggedIn ? <Home /> : <Auth />}
          </Route>
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;