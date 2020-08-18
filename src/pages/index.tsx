import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import KitchenPage from '~/pages/kitchen';
import PlayerPage from '~/pages/player';

// FIX: Parcel bundler has something wrong with dynamic import
// interface AppRouteProps extends RouteProps {
//   // path?: string;
//   component: React.LazyExoticComponent<any>;
// }

// const AppRoute: React.FC<AppRouteProps> = ({
//   path,
//   component: Component,
//   ...rest
// }) => (
//   <Route path={path} {...rest}>
//     <React.Suspense fallback={null}>
//       <Component/>
//     </React.Suspense>
//   </Route>
// );

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/kitchen" exact component={KitchenPage} />
        <Route component={PlayerPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
