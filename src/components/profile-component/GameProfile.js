import React from 'react';
import './styles/profile.css';

import Timer from './Timer';

export default function GameProfile(args) {
    
    return (
        <div className="profile__container">
            <div>Level: {args.level}</div>
            <Timer runTimer={args.runTimer}/>
            <div className="failures">
                <span>failures: {args.failures}</span>
            </div>
        </div>
    );
}