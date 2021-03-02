import React from 'react';
import './styles/profile.css';

import Timer from './Timer';

export default function GameProfile(props) {
    
    return (
        <div className="profile__container">
            <Timer runTimer={props.isGaming}/>
            <div className="failures">
                <span>fail: {props.failures}</span>
            </div>
            
        </div>
    );

}