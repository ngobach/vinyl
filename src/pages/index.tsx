import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import KitchenPage from "~/pages/kitchen";
import HomePage from "~/pages/home";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/kitchen" exact component={KitchenPage} />
        <Route component={HomePage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
