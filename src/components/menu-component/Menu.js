import React from 'react';
import './styles/menu.css';

export default function Menu(args) {
    function CliskHandler(page) {
        args.setActivePage(page);
        args.setRunGame(false);
    }

    return (
        <div className="menu__wrapper">
            <input className="menu-toggle" type="checkbox"></input>
            <div className="menu-toggle-ico"></div>
            <div className="menu-options__container">
                <button onClick={() => CliskHandler('game')}>Game</button>
                <button onClick={() => CliskHandler('records')}>My records</button>
                <button onClick={() => CliskHandler('settings')}>Settings</button>  
            </div>
        </div>
    );
}
