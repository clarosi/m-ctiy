import React, { Component } from 'react';

import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';
import { animateDuration500 } from '../../shared/utility/numberConstants';

const delayMultiplyer = 50;

class MatchesList extends Component {
    state = {
        filterMatches: []
    };

    static getDerivedStateFromProps(nextProp, prevState) {
        return prevState = {
            filterMatches: nextProp.filterMatches
        };
    }

    showMatchesHandler = () => (
        this.state.filterMatches ?
            <NodeGroup
                data={this.state.filterMatches}
                keyAccessor={(data) => data._id}
                start={() => ({
                    opacity: 0,
                    x: -200
                })}
                enter={(data, index) => ({
                    opacity: [1],
                    x: [0],
                    timing: {duration: animateDuration500, delay: index * delayMultiplyer, ease: easePolyOut}
                })}
                update={(data, index) => ({
                    opacity: [1],
                    x: [0],
                    timing: {duration: animateDuration500, delay: index * delayMultiplyer, ease: easePolyOut}
                })}
                leave={(data, index) => ({
                    opacity: [0],
                    x: [-200],
                    timing: {duration: animateDuration500, delay: index * delayMultiplyer, ease: easePolyOut}
                })}
            >
                {(nodes) => (
                    <div>
                        {nodes.map(({key, data, state: {x, opacity}}) => (
                            <div 
                                key={data._id} 
                                className="match_box_big"
                                style={{
                                    opacity,
                                    transform: `translate(${x}px)`
                                }}
                            >
                                <div className="block_wraper">
                                    {/* Local */}
                                    <div className="block">
                                        <div
                                            className="icon"
                                            style={{background: `url(/images/team_icons/${data.localThmb}.png)`}}
                                        ></div>
                                        <div className="team">{data.local}</div>
                                        <div className="result">{data.resultLocal}</div>
                                    </div>
                                    {/* Away */}
                                    <div className="block">
                                        <div
                                            className="icon"
                                            style={{background: `url(/images/team_icons/${data.awayThmb}.png)`}}
                                        ></div>
                                        <div className="team">{data.away}</div>
                                        <div className="result">{data.resultAway}</div>
                                    </div>

                                </div>
                                <div className="block_wraper nfo">
                                    <div><strong>Date: </strong>{data.date}</div>
                                    <div><strong>Referee: </strong>{data.referee}</div>
                                    <div><strong>Played: </strong>{data.final}</div>
                                    <div><strong>Result: </strong>{data.result}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </NodeGroup>
            :
            null
    )

    render() {
        return (
            <div>
                {this.showMatchesHandler()}
            </div>
        );
    }
}

export default MatchesList;