import React, { Component } from 'react';

import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import { animateDuration500 } from '../../../shared/utility/numberConstants';

import featurePlayer from '../../../resources/images/featured_player.png';

class Text extends Component {
    state = {
        settings: [
            {x1: 503, x2: 273, y1: 450, y2: 450, delay: 0, text: 'League', class: 'featured_first'},
            {x1: 503, x2: 273, y1: 586, y2: 586, delay: 400, text: 'Championships', class: 'featured_second'}
        ]
    };

    animateNumberHandler = () => (
        <Animate
            show
            start={{
                opacity: 0,
                rotate: 0
            }}
            enter={{
                opacity: [1],
                rotate: [360],
                timing: {duration: animateDuration500, ease: easePolyOut}
            }}
        >
            {({opacity, rotate}) => {
                return (
                    <div 
                        className="featured_number"
                        style={{
                            opacity,
                            transform: `translate(260px, 170px) rotateY(${rotate}deg)`
                        }}
                    >
                        3
                    </div>
                );
            }}
        </Animate>
    )

    animateTextHandler = () => (
        this.state.settings.map((setting, index) => (
            <Animate
                key={index}
                show
                start={{
                    opacity: 0,
                    x: setting.x1,
                    y: setting.y1
                }}
                enter={{
                    opacity: [1],
                    x: [setting.x2],
                    y: [setting.y2],
                    timing: {delay: setting.delay, duration: 1000, ease: easePolyOut}
                }}
            >
                {({opacity, x, y}) => {
                    return (
                        <div 
                            className={setting.class}
                            style={{
                                opacity,
                                transform: `translate(${x}px, ${y}px)`
                            }}
                        >
                            {setting.text}
                        </div>
                    );
                }}
            </Animate>
        ))
    );

    animatePlayerHandler = () => (
        <Animate
            show
            start={{opacity: 0}}
            enter={{
                opacity: [1],
                timing: {delay: 800, duration: animateDuration500, ease: easePolyOut}
            }}
        >
            {({opacity}) => {
                return (
                    <div 
                        className="featured_player"
                        style={{
                            opacity,
                            background: `url(${featurePlayer})`,
                            transform: `translate(550px, 201px)`
                        }}
                    >
                    </div>
                );
            }}
        </Animate>
    )

    render() {
        return (
            <div className="featured_text">
                {this.animatePlayerHandler()}
                {this.animateNumberHandler()}
                {this.animateTextHandler()}
            </div>
        );
    }
}

export default Text;