import React, { useEffect, useState } from 'react';
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
	, calculateLeaderboard
	, SetupInfo
	, getPreviousPlayers
	, getShortestGameDuration
	, getLongestGameDuration
	, getAverageGameDurationByPlayerCount
	, getPercentGamesReallyCoolThingHappened
} from './front-end-model';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import localForage from 'localforage';

const hardcodedGameResults: GameResult[] = [
	{
			winner: "Tom"
			, players: ["Tom", "Taylor"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, reallyCoolThingHappened: false
	}
	, {
			winner: "Taylor"
			, players: ["Jack", "Taylor"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, reallyCoolThingHappened: false
	}
	, {
			winner: "Taylor"
			, players: ["Tom", "Taylor", "Jack"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:48:23.230Z"
			, reallyCoolThingHappened: false
	}
	, {
			winner: "X"
			, players: ["X", "Joe"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, reallyCoolThingHappened: false
	}
	, {
			winner: "X"
			, players: ["X", "Joe"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, reallyCoolThingHappened: false
	}
	, {
			winner: "Joe"
			, players: ["X", "Joe"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, reallyCoolThingHappened: false
	}
	, {
			winner: "Jack"
			, players: ["X", "Joe", "Jack"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, reallyCoolThingHappened: false
	}
];

const App = () => {

	const [results, setGameResults] = useState(hardcodedGameResults);

	const [setupInfo, setSetupInfo] = useState<SetupInfo>({
		start: ""
		, chosenPlayers: []
	});


	const [emailKey, setEmailKey] = useState("");
 

	useEffect(
		() => {
			const loadEmailFromLocalStorage = async () => {
				try {
					const email = await localForage.getItem<string>("emailKey");
					setEmailKey(email ?? "");
				}
				catch (err) {
					console.error(err);
				}
			};

			loadEmailFromLocalStorage();
		}
		, []
	);

	const addGameResult = (r: GameResult) => {
		setGameResults([
			...results
			, r
		]);
	};

	const saveEmailToLocalStorage = async () => {
		try {
			await localForage.setItem("emailKey", emailKey)
		}
		catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="App m-3">
			<h1>
				TCA Bar React TS Bootstrap
			</h1>
			<h2>
				Companion App
			</h2>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Email address</Form.Label>
				<Form.Control 
					type="text" 
					placeholder="Enter email address"
					value={emailKey} 
					onChange={(e) => setEmailKey(e.target.value)}
				/>
				<Button
					onClick={saveEmailToLocalStorage}
				>
					Save
				</Button>
			</Form.Group>
			<hr />
			<HashRouter>
				<Routes>
					<Route 
						path="/" 
						element={
							<Home
								leaderboardData={calculateLeaderboard(results)} 
								shortestGameDuration={getShortestGameDuration(results)}
								longestGameDuration={getLongestGameDuration(results)}
								averageGameDurationData={getAverageGameDurationByPlayerCount(results)}
								reallyCoolThingHappenedPercent={getPercentGamesReallyCoolThingHappened(results)}
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
