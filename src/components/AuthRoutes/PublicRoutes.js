import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Route, Redirect } from 'react-router-dom';
import * as routes from '../../shared/utility/routeConstants';

const PublicRoutes = ({
    user,
    component: Component,
    ...others
}) => {

    others.onSetUserAuthData(user);

    return (
        <Route 
            {...others}
            component={(props) =>(
                others.restricted ?
                ( user ?
                    <Redirect to={routes.userDashboardRoute} />
                    :
                    <Component {...props} user={user} />
                )
                :
                <Component {...props} user={user} />
            )}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onSetUserAuthData: (userAuthData) => dispatch(actions.setUserAuthData(userAuthData))
    };
};

export default connect(null, mapDispatchToProps)(PublicRoutes);