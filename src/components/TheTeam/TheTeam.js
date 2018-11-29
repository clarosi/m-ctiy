import React, { Component } from 'react';

import PlayerCard from '../Home/MeetPlayer/PlayerCard/PlayerCard';
import Fade from 'react-reveal';

import Stripes from '../../resources/images/stripes.png';
import { playersCollection, firebase } from '../../firebase/firebaseConfig';
import { firebaseDataTrans } from '../../shared/utility/helperFunctions';
import { Promise } from 'core-js';
import LinearProgress from '@material-ui/core/LinearProgress';

class TheTeam extends Component {
    state = {
        isLoading: true,
        categories: ['Keeper', 'Striker', 'Defence', 'MidField'],
        players: []
    };

    componentDidMount() {
        playersCollection.once('value')
        .then(res => {
            const players = firebaseDataTrans(res);
            let promises = [];

            for (let key in players) {
                 promises.push(
                     new Promise((resolve, reject) => {
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                        .then(url => {
                            players[key].url = url;
                            resolve();
                        });
                     })
                 );
            }

            Promise.all(promises).then(() => {
                this.setState({
                    players,
                    isLoading: false
                });
            });
        });
    }

    componentWillUnmount() {
        // TODO: Remove Promise.all this will cause memory leak.
    }

    showPlayersByCategoryHandler = (category) => (
        this.state.players ?
            this.state.players.map((player, index) => {
                return player.position === category ?
                    <Fade 
                        left 
                        key={index}
                    >
                        <div className="item">
                            <PlayerCard 
                                number={player.number}
                                firstName={player.name}
                                lastName={player.lastname}
                                background={player.url}
                            />
                        </div>
                    </Fade>
                    :
                    null
            })
            :
            null
    )

    render() {
        return (
           <div 
                className="the_team_container"
                style={{background: `url(${Stripes}) repeat`}}
            >
                {!this.state.isLoading ?
                    this.state.categories.map((category, index) => (
                        <div key={index}>
                            <div className="team_category_wrapper">
                                <div className="title">{category}</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategoryHandler(category)}
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <LinearProgress />
                }
           </div>
        );
    }
}

export default TheTeam;