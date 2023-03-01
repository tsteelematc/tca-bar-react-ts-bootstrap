import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult } from './front-end-model';

export interface PlayProps {
    addGameResult: (r: GameResult) => void;
};

export const Play: React.FC<PlayProps> = ({addGameResult}) => {

    const nav = useNavigate();

    const endGame = () => {
        addGameResult({
            winner: "Larry"
            , players: ["Larry", "Curly", "Moe"]
        });
        nav(-2);
    };

    return (
        <>
            <h2>
                Play
            </h2>
            <p>
                Some data collection stuff goes here...
            </p>
            <Button 
                variant="outline-primary"
                onClick={endGame}
            >
                Done
            </Button>
        </>
    );
};