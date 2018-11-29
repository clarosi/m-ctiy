import React, { Component } from 'react';

import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import { animateDuration200 } from '../../../shared/utility/numberConstants';

class Stripes extends Component {
    state = {
        stripes: [
            {background: '#98c5e9', top: -260, left: 120, rotate: 25, delay: 0},
            {background: '#ffffff', top: -397, left: 360, rotate: 25, delay: 200},
            {background: '#98c5e9', top: -498, left: 600, rotate: 25, delay: 400}
        ]
    };

    showStripesHandler = () => {
        return (this.state.stripes.map((stripe, index) => (
           <Animate
                key={index}
                show={true}
                start={{
                    background: '#fffff',
                    opacity: 0,
                    top: 0,
                    left: 0,
                    rotate: 0,
                    delay: 0
                }}
                enter={{
                    background: [stripe.background],
                    opacity: [1],
                    top: [stripe.top],
                    left: [stripe.left],
                    rotate: [stripe.rotate],
                    delay: [stripe.delay],
                    timing: {delay: [stripe.delay], duration: animateDuration200, ease: easePolyOut}
                    // events: {
                    //     end() {
                    //         console.log(`Animate ${index} finished.`);
                    //     }
                    // }
                }}
            >
                {({background, opacity, top, left, rotate, delay}) => {
                    return (
                        <div 
                            className="stripe"
                            style={{
                                background,
                                opacity,
                                transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                            }}
                        >
                        </div>
                    );
                }}
            </Animate>    
        )));
    }

    render() {
        return (
            <div className="featured_stripes">
                {this.showStripesHandler()}
            </div>
        );
    }
}

export default Stripes;