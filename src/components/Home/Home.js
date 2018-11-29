import React from 'react';

import Carousel from './Carousel';
import MatchesHome from './Matches/';
import MeetPlayers from './MeetPlayer';
import Promotion from './Promotion';

const Home = () => {
    return (
        <div className="bck_blue">
            <Carousel />
            <MatchesHome />
            <MeetPlayers />
            <Promotion />
        </div>
    );
};

export default Home;