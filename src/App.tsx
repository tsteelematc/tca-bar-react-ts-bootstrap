import React, { useState, useEffect } from 'react';
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
import localforage from 'localforage';

import { loadGamesFromCloud, saveGameToCloud } from './tca-cloud-api';

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

	//
	// State hooks...
	//
	// const [results, setGameResults] = useState(hardcodedGameResults);
	const [results, setGameResults] = useState<GameResult[]>([]);

	const [setupInfo, setSetupInfo] = useState<SetupInfo>({
		start: ""
		, chosenPlayers: []
	});

	const [emailKeyForInput, setEmailKeyForInput] = useState("");
	const [emailKeyForLoading, setEmailKeyForLoading] = useState("");

	//
	// useEffect hook
	//
	useEffect(
		() => {

			const loadEmailKeyAndGameResults = async () => {

				try {
					const ek = await localforage.getItem<string>("emailKey") ?? "";

					if (ek.length > 0) {
						const resultsFromCloud = await loadGamesFromCloud(
							ek
							, "tca-bar-react-ts-bootstrap"
						);

						if (!ignore) {
							setGameResults(resultsFromCloud);
						}
					}

					if (!ignore) {
						setEmailKeyForLoading(ek);
						setEmailKeyForInput(ek);
					}
				}
				catch (err) {
					console.error(err);
				}
			};

			let ignore = false;
			loadEmailKeyAndGameResults();
			return () => {
				ignore = true;
			};
		}
		, [emailKeyForLoading]
	);

	//
	// Helper functions...
	//
	const addGameResult = async (r: GameResult) => {

		// Save the game to the cloud.
		await saveGameToCloud(
			emailKeyForInput 
			, "tca-bar-react-ts-bootstrap"
			, r.end
			, r				
		);

		// Optimistically update state as if it worked, happy path ! ! !
		setGameResults([
			...results
			, r
		]);
	};

	const saveEmailKey = async () => {
		try {
			const locallySavedEmailKey = await localforage.setItem(
				"emailKey"
				, emailKeyForInput
			);

			setEmailKeyForLoading(locallySavedEmailKey);
		}
		catch (err) {
			console.error(err);
		}
	};

	//
	// JSX
	//
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
					placeholder="Enter new player name"
					value={emailKeyForInput} 
					onChange={(e) => setEmailKeyForInput(e.target.value)}
				/>
				<Button
					onClick={saveEmailKey}
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
