import React, { Component } from 'react';

import LeagueTable from './LeagueTable';
import MatchesList from './MatchesList';

import LinearProgress from '@material-ui/core/LinearProgress';
import { matchesCollection } from '../../firebase/firebaseConfig';
import { firebaseDataTrans } from '../../shared/utility/helperFunctions';

class TheMatches extends Component {
    state = {
        isLoading: true,
        matches: [],
        filterMatches: [],
        playFilter: 'All',
        resultFilter: 'All',
        optionsPlay: [
            {type: 'All', status: 'All'}, 
            {type: 'Played', status: 'Yes'}, 
            {type: 'Not Played', status: 'No'}
        ],
        optionsResult: [
            {type: 'All', status: 'All'}, 
            {type: 'W', status: 'W'}, 
            {type: 'L', status: 'L'},
            {type: 'D', status: 'D'}
        ]
    };

    componentDidMount() {
        matchesCollection.once('value')
        .then(res => {
            const matches = firebaseDataTrans(res).reverse();
            
            this.setState({
                isLoading: false,
                matches,
                filterMatches: matches
            });
        });
    }

    showPlayFilterMatcheHandler = (playStatus) => {
        const newFilterMatches = this.state.matches.filter(match => {
            return match.final === playStatus;
        });

        this.setState({
            filterMatches: playStatus === 'All' ? this.state.matches : newFilterMatches,
            playFilter: playStatus,
            resultFilter: 'All'
        })
    }

    showResultFilterMatcheHandler = (resultStatus) => {
        const newFilterMatches = this.state.matches.filter(match => {
            return match.result === resultStatus;
        });

        this.setState({
            filterMatches: resultStatus === 'All' ? this.state.matches : newFilterMatches,
            playFilter: 'All',
            resultFilter: resultStatus
        })
    }

    render() {
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            {/* Play Filter */}
                            <div className="match_filters_box">
                                <div className="tag">Show Match</div>
                                <div className="cont">
                                    {this.state.optionsPlay.map((option, index) => (
                                        <div 
                                            key={index}
                                            className={`option ${this.state.playFilter === option.status ? 'active' : ''}`}
                                            onClick={() => this.showPlayFilterMatcheHandler(option.status)}
                                        >
                                            {option.type}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*  Result Filter */}
                            <div className="match_filters_box">
                                <div className="tag">Result Game</div>
                                <div className="cont">
                                    {this.state.optionsResult.map((option, index) => (
                                        <div 
                                            key={index}
                                            className={`option ${this.state.resultFilter === option.status ? 'active' : ''}`}
                                            onClick={() => this.showResultFilterMatcheHandler(option.status)}
                                        >
                                            {option.type}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {!this.state.isLoading ? 
                            <MatchesList filterMatches={this.state.filterMatches} />
                            :
                            <LinearProgress />
                        }
                    </div>
                    <div className="right">
                        <LeagueTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default TheMatches;