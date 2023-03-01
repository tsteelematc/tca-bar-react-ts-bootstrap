
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { LeaderboardPlayer } from './front-end-model';

export interface HomeProps {
    leaderboardData: LeaderboardPlayer[];
};

export const Home: React.FC<HomeProps> = ({leaderboardData}) => {

    const nav = useNavigate();

    return (
        <>
            <Button 
                variant="outline-primary"
                onClick={() => nav("/setup")}
            >
                Play Bar
            </Button>
            <Card
                className="mt-3"
            >
                <Card.Header>
                Leaderboard
                </Card.Header>
                <Card.Body>
                    {
                        leaderboardData.length == 0 &&
                        <p>Play a game to see your leaderboard...</p>
                    }
                    {
                        leaderboardData.length > 0 &&
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>AVG</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map(x =>(
                                    <tr
                                        key={x.name}
                                    >
                                        <td>{x.wins}</td>
                                        <td>{x.losses}</td>
                                        <td>{x.avg}</td>
                                        <td>{x.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>                                                
                    }
                </Card.Body>
            </Card>
        </>
    )
};