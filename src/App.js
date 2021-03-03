import React, { useState } from 'react'
import Menu from './components/menu-component/Menu';
import GamePage from './components/game-component/GamePage';
import RecordsPage from './components/records-component/RecordsPage';
import SettingsPage from './components/settings-component/SettingsPage';
import { DEFAULT_HOT_KEYS } from './utils/constants';
import Storage from './utils/Storage';

export default function App() {
  const [activePage, setActivePage] = useState("game");
  const [runGame, setRunGame] = useState(false);
  const SetAppData = () => {
    if (!Storage.GetData('HotKeys')) {
      Storage.SetData('HotKeys', DEFAULT_HOT_KEYS);
    }
  }
  SetAppData();

  return (
    <div className="app__container">
      <Menu setActivePage={setActivePage} setRunGame={setRunGame}/>
      <div className="content__container">
      {
        activePage === "game" ?
        <GamePage runGame={runGame} setRunGame={setRunGame}/> : activePage === "records" ?
        <RecordsPage /> : <SettingsPage />
      } 
      </div>
    </div>
  );
}