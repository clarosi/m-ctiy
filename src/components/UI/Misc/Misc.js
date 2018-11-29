import React from 'react';

import { Link } from 'react-router-dom';

export const Tag = (props) => {
    const template = (
        <div style={{
            display: 'inline-block',
            fontFamily: 'Righteous',
            padding: '5px 10px',
            ...props.style
        }}
        >
            {props.children}
        </div>
    );

    if (props.link) {
        return (
            <Link to={props.linkTo}>
                {template}
            </Link> 
        );
    }
    else {
        return template;
    }
}