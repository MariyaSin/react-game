import React, { useState, useEffect} from 'react';
import './styles/profile.css';

import Storage from '../../utils/Storage';

export default function GameProfile(args) {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);

    useEffect(() => {
        let Timer;
        if (!args.timeOut) {
            Timer = setInterval(() => {
                if (second === 59) {
                    setSecond(0);
                    setMinute(minute + 1);
                } else {
                    setSecond(second + 1); 
                }
                Storage.SetData(
                    'CuurentGameProfile', 
                    {
                        level: args.level, 
                        minutes: minute, 
                        seconds: second, 
                        failures: args.failures
                    }
                )
            }, 1000);
        }

        return () => clearInterval(Timer);
    });
    
    return (
        <div className="profile__container">
            <div>Level: {args.level}</div>
            <div className="timer__container">
                <span>
                    Time {minute < 10 ? '0' + minute : minute} : {second < 10 ? '0' + second : second}
                </span>
            </div>
            <div className="failures">
                <span>Failures: {args.failures}</span>
            </div>
        </div>
    );
}