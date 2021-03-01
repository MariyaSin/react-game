import React from 'react';
import Timer from './Timer';

export default function GameProfile({props}) {
    console.log(props)

    return <div className="profile__container"><Timer>{props}</Timer></div>;
}