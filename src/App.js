import React, { useState } from 'react'
import Menu from './components/menu-component/Menu';
import GamePage from './components/game-component/GamePage';
import RecordsPage from './components/records-component/RecordsPage';
import SettingsPage from './components/settings-component/SettingsPage';

export default function App() {

  const [activePage, setActivePage] = useState("game");

  return (
    <div className="app__container">
      <Menu setActivePage={setActivePage}/>
      <div className="content__container">
      {
        activePage === "game" ?
        <GamePage /> : activePage === "records" ?
        <RecordsPage /> : <SettingsPage />
      } 
      </div>
    </div>
  );
}