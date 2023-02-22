interface SetupProps {
    previousPlayers: string[];
};


export const Setup: React.FC<SetupProps> = ({previousPlayers}) => (
    <div>
        <h2>
            Setup
        </h2>
        <ul>
            {previousPlayers.map(x => <li>{x}</li>)}
        </ul>
    </div>
);