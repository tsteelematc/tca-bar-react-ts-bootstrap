import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

interface GameResult {
  winner: string;
  players: string[];
};

const dummyGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
      // , won: false

  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
  }
];

const getPreviousPlayers = (grs: GameResult[]) => {
    
  // const allPreviousPlayers = grs.map(x => x.players);
  const allPreviousPlayers = grs.flatMap(x => x.players);
  
  return [
      ...new Set(allPreviousPlayers)
  ].sort();
};

function App() {

  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/setup",
      element: <Setup
                  previousPlayers={getPreviousPlayers(dummyGameResults)} 
                />
    },
    {
      path: "/play",
      element: <Play />,
    },
  ]);

  return (
    <div 
      className="App m-3"
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
