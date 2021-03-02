import React from 'react';
import { useState, useEffect } from 'react';

export default function Timer(props) {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);

    useEffect(() => {
        let Interval;

        if (props.runTimer) {
            Interval = setInterval(() => {
                if (second === 59) {
                    setSecond(0);
                    setMinute(minutes => minutes + 1);
                } else {
                   setSecond(seconds => seconds + 1); 
                }
            }, 1000);
        } else {
            clearInterval(Interval);
        }
        return () => clearInterval(Interval);
    })   

    return (
        <div className="timer__container">
            <span>{minute < 10 ? '0' + minute : minute} : </span>
            <span>{second < 10 ? '0' + second : second}</span>
        </div>
    )
}

