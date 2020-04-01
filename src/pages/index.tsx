import React, { FunctionComponent, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Kitchen = React.lazy(() => import('~/pages/kitchen'));
const Player = React.lazy(() => import('~/pages/player'));

const AppRouter: FunctionComponent<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route path='/kitchen'>
          <Suspense fallback={null}>
            <Kitchen />
          </Suspense>
        </Route>
        <Route>
          <Suspense fallback={null}>
            <Player />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
