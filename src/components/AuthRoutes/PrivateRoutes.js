import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Route, Redirect } from 'react-router-dom';
import * as routes from '../../shared/utility/routeConstants';

const PrivateRoutes = ({
    user,
    component: Component,
    ...others
}) => {

    others.onSetUserAuthData(user);

    return (
        <Route 
            {...others}
            component={(props) =>(
                user ?
                <Component {...props} user={user} />
                : 
                <Redirect to={routes.userSignInRoute} />
            )}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onSetUserAuthData: (userAuthData) => dispatch(actions.setUserAuthData(userAuthData))
    };
};

export default connect(null, mapDispatchToProps)(PrivateRoutes);