import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Play = () => {

    const nav = useNavigate();

    return(
        <div>
            <h2>
                Play
            </h2>
            <p>
                Some data collection goes here...
            </p>
            <Button
                variant="outline-primary"
                onClick={() => nav(-2)}
            >
                Done
            </Button>
        </div>
    );
};