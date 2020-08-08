import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


interface AppRouteProps {
  path?: string,
  component: React.LazyExoticComponent<any>,
}

const AppRoute: React.FC<AppRouteProps> = ({
  path,
  component: Component,
}) => (
  <Route path={path}>
    <React.Suspense fallback={null}>
      <Component/>
    </React.Suspense>
  </Route>
);

const Kitchen = React.lazy(() => import('~/pages/kitchen'));
const Player = React.lazy(() => import('~/pages/player'));

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <AppRoute path="/kitchen" component={Kitchen}/>
        <AppRoute component={Player}/>
      </Switch>
    </Router>
  );
};

export default AppRouter;
