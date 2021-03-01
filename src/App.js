import React, { useState } from 'react'
import Menu from './components/menu-component/Menu';
import GamePage from './components/game-component/GamePage';
import Records from './components/records-component/Records';


export default function App() {

  const [gamePage, setGamePage] = useState(true);

  return (
    <div className="app__container">
      <Menu />
      <div className="content__container">
      {
        gamePage ?
        <GamePage /> : 
        <Records></Records>
      } 
      </div>
    </div>
  );
}