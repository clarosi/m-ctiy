import React, { Component } from 'react';

import Reveal from 'react-reveal/Reveal';

import Cards from './Cards';
import stripeImage from '../../../resources/images/stripes.png';
import { Tag } from '../../UI/Misc/Misc';
import { theTeamRoute } from '../../../shared/utility/routeConstants';

class MeetPlayers extends Component {
    state = {
        showCards: false,
        tagTexts: ['Meet', 'The', 'Players']
    };

    render() {
        return (
            <Reveal
                fraction={0.7}
                onReveal={() => {
                    this.setState({showCards: true});
                }}
            >
                <div 
                    className="home_meetplayers"
                    style={{background: `#fff url(${stripeImage})`}}
                >
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                <Cards showCards={this.state.showCards} />
                            </div>
                            <div className="home_text_wrapper">
                                {this.state.tagTexts.map((tagText, index) => (
                                    <div key={index}>
                                        <Tag style={{
                                            background: '#0e1731',
                                            color: '#fff',
                                            fontSize: '100px',
                                            display: 'inline-block',
                                            marginBottom: '20px'
                                        }}                                   
                                        >
                                            {tagText}
                                        </Tag>
                                    </div>
                                ))}
                                <Tag style={{
                                    background: '#fff',
                                    color: '#0e1731',
                                    fontSize: '27px',
                                    display: 'inline-block',
                                    marginBottom: '20px',
                                    border: '1px solid #0e1731'
                                }}
                                    link
                                    linkTo={`${theTeamRoute}`}
                                >
                                    Meet them here...
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    }
}

export default MeetPlayers;