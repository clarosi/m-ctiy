import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase/firebaseConfig';
import * as routes from '../../../shared/utility/routeConstants';

const AdminNav = (props) => {
    const links =[
        {title: 'Matches', linkTo: routes.adminMatchesRoute},
        {title: 'Add Match', linkTo: routes.adminAddEditMatch},
        {title: 'Players', linkTo: routes.adminPlayers},
        {title: 'Add Player', linkTo: routes.adminAddEditPlayer}
    ];

    const style = {
        color: '#fff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    };

    const renderItems = () => (
        links.map((link, index) => (
            <Link
                key={index}
                to={link.linkTo}
            >
                <ListItem
                    button
                    style={style}
                >
                {link.title}
                </ListItem>
            </Link>
        ))
    )

    const logoutHandler = () => {
        firebase.auth().signOut()
        .then(() => {
            props.onSetUserAuthData();
        })
        .catch(err => { 
        });
    }

    return (
        <div>
            {renderItems()}
            <ListItem
                button
                style={style}
                onClick={() => logoutHandler()}
            >
                Log out
            </ListItem>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onSetUserAuthData: () => dispatch(actions.setUserAuthData(null))
    };
};

export default connect(null, mapDispatchToProps)(AdminNav);