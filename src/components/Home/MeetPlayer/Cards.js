import React, { Component } from 'react';

import { firebase } from '../../../firebase/firebaseConfig';
import PlayerCard from './PlayerCard/PlayerCard';
import { firebaseDataTrans, immutableArrayReordering } from '../../../shared/utility/helperFunctions';
import { playersCollection } from '../../../firebase/firebaseConfig';
import CircularProgress from '@material-ui/core/CircularProgress';

import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';
//import playerOtamendi from '../../../resources/images/players/Otamendi.png';

class Cards extends Component {
    state = {
        cards: [
            {bottom: 90, left: 300},
            {bottom: 60, left: 200},
            {bottom: 30, left: 100},
            {bottom: 0, left: 0}
        ],
        players: []
    };

    componentDidMount() {
        playersCollection.limitToLast(4).once('value').then(res => {
            const newPlayers = firebaseDataTrans(res);

            for (const key in newPlayers) {
                firebase.storage().ref('players')
                .child(newPlayers[key].image).getDownloadURL()
                .then(url => {
                    newPlayers[key].image = url;
                });
            }
            this.setState({players: newPlayers});
        });
    }

    showAnimatedCardsHandler = () => {
        const length = this.state.players.length;

        let playerCard = (
            <div style={{marginTop: '40%'}}>
                <CircularProgress 
                    size={100}
                    thickness={5} 
                    style={{color: '#DC143C'}}           
                />  
            </div>
        );

        if (length > 0) {
            const reOrderdPlayerArray = immutableArrayReordering(this.state.players, Math.floor(Math.random() * Math.floor(length)), (length - 1));
            playerCard = (
                this.state.cards.map((card, index) => (
                    <Animate
                        key={index}
                        show={this.props.showCards}
                        start={{
                            bottom: 0,
                            left: 0
                        }}
                        enter={{
                            bottom: [card.bottom],
                            left: [card.left],
                            timing: {duration: 500, ease: easePolyOut}
                        }}
                    >
                        {({bottom, left}) => {
                            return (
                                <div style={{
                                    position: 'absolute',
                                    bottom,
                                    left
                                }}>
                                    <PlayerCard 
                                        number={reOrderdPlayerArray[index].number}
                                        firstName={reOrderdPlayerArray[index].name}
                                        lastName={reOrderdPlayerArray[index].lastname}
                                        background={reOrderdPlayerArray[index].image}
                                    />
                                </div>
                            );
                        }}
                    </Animate>
                )))
        }
          
        return playerCard;
    }

    render() {
        return (
            <div>
                {this.showAnimatedCardsHandler()}
            </div>
        );
    }
}

export default Cards;