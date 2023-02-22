import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => (
  <>
    <h1>
      TCA Bar React TS Bootstrap
    </h1>
    <h2>
      Companion App
    </h2>
    <Button 
      variant="outline-primary"
      className="mt-3"
    >
      Play Bar
    </Button>
    <Card
      className='mt-3'
    >
      <Card.Header>
        Leaderboard
      </Card.Header>
      <Card.Body>
        Play a game to see your leaderboard...
      </Card.Body>
    </Card>
  </>
);

function App() {
  return (
    <div 
      className="App m-3"
    >
      <Home />
    </div>
  );
}

export default App;
