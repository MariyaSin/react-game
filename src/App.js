import React, { useEffect, useState } from 'react'
import Menu from './components/menu-component/Menu';
import GamePage from './components/game-component/GamePage';
import RecordsPage from './components/records-component/RecordsPage';
import SettingsPage from './components/settings-component/SettingsPage';
import Sounds from './components/sounds-component/Sounds';

import { DEFAULT_HOT_KEYS } from './utils/constants';
import Storage from './utils/Storage';
import music from './assets/music.mp3';

let backgroundMusic = new Audio(music);
backgroundMusic.loop = true;

export default function App() {
  const [activePage, setActivePage] = useState("game");
  const [runGame, setRunGame] = useState(false);
  const [onSounds, setOnSounds] = useState(true);

  useEffect(() => {
    if (onSounds) {
      runGame ? backgroundMusic.play() : backgroundMusic.pause();
    } else {
      backgroundMusic.pause();
    }
  })

  const SetAppData = () => {
    if (!Storage.GetData('Settings-HotKeys')) {
      Storage.SetData('Settings-HotKeys', DEFAULT_HOT_KEYS);
    }
    if (!Storage.GetData('Game-OpenLevel')) {
      Storage.SetData('Game-OpenLevel', 1);
    }
  }
  SetAppData();

  return (
    <div className="app__container">
      <Menu setActivePage={setActivePage} setRunGame={setRunGame}/>
      <div className="content__container">
        {
          activePage === "game" ?
          <GamePage runGame={runGame} setRunGame={setRunGame} /> : activePage === "records" ?
          <RecordsPage /> : <SettingsPage />
        } 
        <div className="footer__container">
          <a href="https://github.com/MariyaSin">My GitHub</a>
          <a href="https://rs.school/js/"><h1>React course 2021</h1></a>
        </div>
      </div>
      <Sounds setOnSounds={setOnSounds} />
    </div>
  );
}