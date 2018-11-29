import React from 'react';

import Matches from './Matches';
import { Tag } from '../../UI/Misc/Misc';

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag style={{
                    background: '#0e1731',
                    color: '#fff',
                    fontSize: '50px',
                }}
                >
                    Matches
                </Tag>
                <Matches />
                <Tag 
                    link
                    linkTo="/the-team"
                    style={{
                    background: '#fff',
                    color: '#0e1731',
                    fontSize: '22px',
                }}
                >
                    See more matches
                </Tag>
            </div>
        </div>
    );
};

export default MatchesHome;