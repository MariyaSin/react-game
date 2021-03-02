import React from 'react';
import './styles/menu.css';

export default function Menu(props) {
    return (
        <div className="menu__wrapper">
            <input className="menu-toggle" type="checkbox"></input>
            <div className="menu-toggle-ico"></div>
            <div className="menu-options__container">
                <button onClick={() => props.setActivePage('game')}>Game</button>
                <button onClick={() => props.setActivePage('records')}>My records</button>
                <button onClick={() => props.setActivePage('settings')}>Settings</button>  
            </div>
        </div>
    );
}
