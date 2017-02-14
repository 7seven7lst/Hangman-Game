"use strict;"
const words =["apple", "banana", "carrot"];


function initializeGame(words) {
	let index = Math.floor(Math.random() * (words.length));
	let wordLength = words[index].length;
	let response = [], answer = [], guessed= [], turnsRemain = wordLength+3;
	for (var i=0; i<wordLength; i++){
		response.push("_");
		answer.push(words[index][i]);
	}
	return {
		response,
		answer,
		guessed, 
		turnsRemain,
	};
}	

function updateGameStatus(gameStatus, guessedLetter){
	console.log(gameStatus.answer);
	if (gameStatus.answer.indexOf(guessedLetter) !== -1){ // guessed correct
		gameStatus.response = updateResponse(gameStatus.response, gameStatus.answer, guessedLetter);
	} else { // guess wrong
		gameStatus.turnsRemain--;

	}
	gameStatus.guessed.push(guessedLetter);
	return gameStatus;
}

function updateResponse(response, answer, letter){
	console.log("answer is >>>",answer);
	console.log("letter is >>>", letter);
	for (var i=0;i<answer.length; i++){
		if (answer[i] === letter){
			response[i] = letter;
		}
	}
	console.log("response here is >>>", response);

	return response;
}

function determineGameResult(gameStatus){
	console.log("gameStatus here is >>>", gameStatus);
	if (gameStatus.response.join("") === gameStatus.answer.join("")) {
		return "won";
	} else if (gameStatus.turnsRemain <1){
		return "lost";
	} else {
		return "continue";
	}
}

function updateDashboard(gameStatus){
	document.getElementById("answer").innerHTML = gameStatus.response.join(" ");
	document.getElementById("turns-remain").innerHTML = gameStatus.turnsRemain;
	document.getElementById("used-letters").innerHTML = gameStatus.guessed.join (" ");
}

let gameStatus = initializeGame(words);
let guessedWord;
document.onkeyup = event => {
	console.log("this is>>>", this);
	console.log("event is >>>", event);
	console.log("gameStatus is>>>", gameStatus);
	guessedWord= event.key.toLowerCase();
	gameStatus = updateGameStatus(gameStatus, guessedWord);
	let status = determineGameResult(gameStatus);
	updateDashboard(gameStatus);
	console.log("game status is >>>", status);
}