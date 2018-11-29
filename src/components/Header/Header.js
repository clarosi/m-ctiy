import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { CityLogo } from '../UI/Icons/Icons';
import * as route from '../../shared/utility/routeConstants';

class Header extends Component {
    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: '#98c5e9',
                    boxShadow: 'none',
                    padding: '10px 0',
                    borderBottom: '2px solid #00285e'
                }}
            >
                <Toolbar style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>
                        <div className="header_logo">
                            <CityLogo 
                                link
                                linkTo="/"
                                width="70px"
                                height="70px"
                            />
                        </div>
                    </div>
                    <Link to={route.theTeamRoute}>
                        <Button color="inherit">The Team</Button>
                    </Link>
                    <Link to={route.theMatchesRoute}>
                        <Button color="inherit">Matches</Button>
                    </Link>
                    <Link to={this.props.userAuthData ? route.userDashboardRoute : route.userSignInRoute}>
                        <Button color="inherit">{this.props.userAuthData ? 'Dashboard' : 'SignIn'}</Button>
                    </Link>            
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAuthData: state.authReducer.userAuthData
    };
};

export default connect(mapStateToProps, null)(Header);