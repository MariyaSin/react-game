import React from 'react';
import './styles/sounds.css';

export default function Sounds(args) {
    
    return (
        <button 
            className="sounds-toggle" 
            onClick={() => args.setOnSounds(onSounds => !onSounds)}
        ></button>
    )
}