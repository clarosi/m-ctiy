import React from 'react';

import PromotionAnimation from './Promotion';
import Enroll from './Enroll';

const Promotion = () => {
    return (
        <div
            className="promotion_wrapper"
            style={{background: '#fff'}}
        >
            <div className="container">
                <PromotionAnimation />
                <Enroll />
            </div>
        </div>
    );
};

export default Promotion;