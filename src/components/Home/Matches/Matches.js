import React, { Component } from 'react';

import { matchesCollection } from '../../../firebase/firebaseConfig';
import { firebaseDataTrans } from '../../../shared/utility/helperFunctions';

import MatchesBlock from './MatchesBlock/MatchesBlock';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from 'react-reveal/Slide';

class Matches extends Component {
    state = {
        matches: []
    }

    componentDidMount() {
        matchesCollection.limitToLast(6).once('value').then(res => {
            const matches = firebaseDataTrans(res);
            this.setState({matches: matches.reverse()});
        });
    }

    showMatchesHandler = () => (
        this.state.matches.length > 0 ?
            this.state.matches.map((match, index) => (
                <Slide 
                    key={index}
                    bottom
                >
                    <div className="item">
                        <div className="wrapper">
                            <MatchesBlock match={match} />
                        </div>
                    </div>
                </Slide>
            ))
        : 
        (
            <div style={{paddingBottom: '8%'}}>
                <CircularProgress 
                    size={100}
                    thickness={5} 
                    style={{color: '#DC143C'}}           
                />        
            </div>
        )
    )

    render() {
        return (
            <div className="home_matches">
                {this.showMatchesHandler()}
            </div>
        );
    }
}

export default Matches;