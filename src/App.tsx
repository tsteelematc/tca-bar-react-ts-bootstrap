import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

import {
  HashRouter
  , Routes 
  , Route
} from 'react-router-dom';

import { 
  GameResult
  , calculateLeaderboard, 
  SetupInfo,
  getPreviousPlayers,
  calcShortestGame,
  calcLongestGame
} from './front-end-model';

const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:45:30.000Z"
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
      , start: "2023-03-22T20:50:00.000Z"
      , end: "2023-03-22T20:53:00.000Z"
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
      , start: "2023-03-22T21:00:00.000Z"
      , end: "2023-03-22T21:25:32.000Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-03-22T21:30:00.000Z"
      , end: "2023-03-22T21:31:00.000Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-03-22T21:30:00.000Z"
      , end: "2023-03-22T21:31:00.000Z"
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
      , start: "2023-03-22T21:30:00.000Z"
      , end: "2023-03-22T21:31:00.000Z"
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
      , start: "2023-03-22T21:30:00.000Z"
      , end: "2023-03-22T21:31:00.000Z"
  }
];

const App = () => {

  const [results, setGameResults] = useState(hardcodedGameResults);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
  });

  const addGameResult = (r: GameResult) => {
    setGameResults([
      ...results
      , r
    ]);
  };

  return (
    <div className="App m-3">
      <h1>
        TCA Bar React TS Bootstrap
      </h1>
      <h2>
        Companion App
      </h2>
      <hr />
      <HashRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home
                leaderboardData={calculateLeaderboard(results)} 
                shortestGame={calcShortestGame(results)}
                longestGame={calcLongestGame(results)}
              />
            } 
          />
          <Route 
            path="/setup" 
            element={
              <Setup 
                previousPlayers={getPreviousPlayers(results)}
                setSetupInfo={setSetupInfo}
              />
            } 
          />
          <Route 
            path="/play" 
            element={
              <Play
                addGameResultFunc={addGameResult} 
                setupInfo={setupInfo}
              />
            } 
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
