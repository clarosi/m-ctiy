import React from 'react';

import Header from '../../components/Header/Header';
import Foooter from '../../components/Footer/Footer';

const Layout = (props) => {
    return (
        <div>
            <Header />
            {props.children}
            <Foooter />
        </div>
    );
};

export default Layout;