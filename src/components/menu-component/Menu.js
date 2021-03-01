import React from 'react';
import './styles/menu.css';

export default function Menu(props) {
    return (
        <div className="menu-options__container">
            <button onClick={() => props.setActivePage('game')}>Game</button>
            <button onClick={() => props.setActivePage('records')}>My records</button>
            <button onClick={() => props.setActivePage('settings')}>Settings</button>
        </div>
    );
}
