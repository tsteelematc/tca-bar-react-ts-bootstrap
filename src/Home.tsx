
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const Home = () => (
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
  