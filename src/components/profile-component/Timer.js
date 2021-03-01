import React from 'react';
import { useState, useEffect } from 'react';

export default function Timer() {
    let [second, setSecond] = useState(0);

    useEffect(() => {
        let interval = null;
        if (true) {
          interval = setInterval(() => {
            setSecond(seconds => seconds + 1);
          }, 1000);
        } else if (false && second !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [second]);

    return <p>{second}</p>

}