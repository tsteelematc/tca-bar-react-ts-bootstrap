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

import { saveGameToCloud, loadGamesFromCloud } from './tca-cloud-api';

const App = () => {

	//
	// State hooks...
	//
	const [results, setGameResults] = useState<GameResult[]>([]);

	const [setupInfo, setSetupInfo] = useState<SetupInfo>({
		start: ""
		, chosenPlayers: []
	});

	const [emailKeyInput, setEmailKeyInput] = useState("");
	const [emailKeySaved, setEmailKeySaved] = useState("");

	//
	// useEffect hook
	//
	useEffect(
		() => {

			const loadEmailKey = async () => {

				try {

					const ek = String(await localforage.getItem("emailKey")) ?? "";

					setEmailKeyInput(ek);
					setEmailKeySaved(ek);
				}
				catch (err) {
					console.error(err);
				}
			};

			loadEmailKey();
		}
		, []
	);

	//
	// Helper functions...
	//
	const addGameResult = (r: GameResult) => {

		// Save the game result to the cloud.
		saveGameToCloud(
			emailKeySaved
			, "tca-bar-react-ts-bootstrap"
			, r.end
			, r
		);

		// Optimistically update the lifted app state.
		setGameResults([
			...results
			, r
		]);
	};

	const saveEmailKey = async () => {
		try {
			await localforage.setItem(
				"emailKey"
				, emailKeyInput
			);

			setEmailKeySaved(emailKeyInput);
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
					value={emailKeyInput} 
					onChange={(e) => setEmailKeyInput(e.target.value)}
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
