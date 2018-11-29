import React from 'react';

import Layout from './hoc/Layout/Layout';
import { Switch } from 'react-router-dom';
import * as routes from './shared/utility/routeConstants';

import PrivateRoute from './components/AuthRoutes/PrivateRoutes';
import PublicRoute from './components/AuthRoutes/PublicRoutes';

import HomeContainer from './containers/Home/Home';
import SignInContainer from './containers/SignIn/SignIn';
import TheTeamContainer from './containers/TheTeam/TheTeam';
import TheMatchesContainer from './containers/TheMatches/TheMatches';
import PageNotFound from './components/UI/PageNotFound/PageNotFound';

import AdminDashboardContainer from './containers/Admin/AdminDashboard';
import AdminMatchesContainer from './containers/Admin/AdminMatches';
import AdminAddEditMatchContainer from './containers/Admin/AdminAddEditMatch';
import AdminPlayersContainer from './containers/Admin/AdminPlayers';
import AdminAddEditPlayerContainer from './containers/Admin/AdminAddEditPlayer';

const App = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path={`${routes.adminAddEditPlayer}/:playerId`} component={AdminAddEditPlayerContainer} />  
        <PrivateRoute {...props} path={routes.adminAddEditPlayer} component={AdminAddEditPlayerContainer} /> 
        <PrivateRoute {...props} path={routes.adminPlayers} component={AdminPlayersContainer} />

        <PrivateRoute {...props} path={`${routes.adminAddEditMatch}/:matchId`} component={AdminAddEditMatchContainer} />  
        <PrivateRoute {...props} path={routes.adminAddEditMatch} component={AdminAddEditMatchContainer} />  
        <PrivateRoute {...props} path={routes.adminMatchesRoute} component={AdminMatchesContainer} />
          
        <PrivateRoute {...props} path={routes.userDashboardRoute} component={AdminDashboardContainer} /> 
             
        <PublicRoute {...props} restricted path={routes.userSignInRoute} component={SignInContainer} />
        <PublicRoute {...props} path={routes.theMatchesRoute} component={TheMatchesContainer} />
        <PublicRoute {...props} path={routes.theTeamRoute} component={TheTeamContainer} />
        <PublicRoute {...props} exact path="/" component={HomeContainer} />
        <PublicRoute component={PageNotFound} />
      </Switch>
    </Layout>
  );
};

export default App;