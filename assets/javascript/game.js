"use strict";
const words =["aerosmith", "big bang", "bon jovi", "coldplay", "epica", "maroon 5", "nightwish", "2pac"];
const youtubeMusicMap = {
	"aerosmith": "IP3wQc2gh8A",
	"bon jovi": "TLCQT2F4PT4",
	"big bang": "kBWrEZp1RCA",
	"coldplay": "rgrIHwIeFD8",
	"epica": "Jrp0ajcPCCE",
	"maroon 5": "7piVTfuCkUg",
	"nightwish": "-yFXrhsA3oI",
	"2pac": "0bHn7tKj0Yo",
};

let initializeGame = words => {
	let index = Math.floor(Math.random() * (words.length));
	let wordLength = words[index].length;
	let word = words[index];
	let response = [], answer = [], guessed= [], turnsRemain = wordLength;
	_.forEach(word, char => {
		if (char===" ") {
			response.push(" ");
		} else {
			response.push("_");
		}
		answer.push(char);
	})
	document.getElementById("continue-button").setAttribute("class", "hidden");
	document.getElementById("game-ending-content").innerHTML = '';
	return {
		response,
		answer,
		guessed, 
		turnsRemain,
	};
}	

let updateGameStatus = (gameStatus, guessedLetter)=> {
	if (gameStatus.answer.indexOf(guessedLetter) !== -1){ // guessed correct
		gameStatus.response = updateResponse(gameStatus.response, gameStatus.answer, guessedLetter);
	} else { // guess wrong
		gameStatus.turnsRemain--;

	}
	gameStatus.guessed.push(guessedLetter);
	return gameStatus;
}

let updateResponse = (response, answer, letter) =>{
	_.forEach(answer, (char, i) =>{
		if (char ===letter){
			response[i] = letter;
		}
	})
	return response;
}

let determineGameResult = (gameStatus)=>{
	if (gameStatus.response.join("") === gameStatus.answer.join("")) {
		return "win";
	} else if (gameStatus.turnsRemain <1){
		return "lose";
	} else {
		return "continue";
	}
}

let updateDashboard = (gameStatus, status)=>{
	document.getElementById("answer").innerHTML = gameStatus.response.join(" ");
	document.getElementById("turns-remain").innerHTML = gameStatus.turnsRemain;
	document.getElementById("used-letters").innerHTML = gameStatus.guessed.join (" ");
	if (status === "win"){
		document.getElementById("game-status").innerHTML = "You win!";
		window.speechSynthesis.speak(new SpeechSynthesisUtterance("Oh yes, You Win!"));
		document.getElementById("continue-button").setAttribute("class", "btn visible");
		let youtubeFrame = document.createElement("iframe");
		youtubeFrame.setAttribute("width", 0);
		youtubeFrame.setAttribute("height", 0);
		youtubeFrame.setAttribute("src", `https://www.youtube.com/embed/${youtubeMusicMap[gameStatus.answer.join("")]}?autoplay=1&start=30`);
		youtubeFrame.setAttribute("frameborder", 0);
		document.getElementById("game-ending-content").appendChild(youtubeFrame);
	} else if (status === "lose") {
		document.getElementById("game-status").innerHTML = "You lost!";
		window.speechSynthesis.speak(new SpeechSynthesisUtterance("Sorry You Lost!"));
		document.getElementById("continue-button").setAttribute("class", "btn visible");
		let hangmanPic = document.createElement("img");
		hangmanPic.setAttribute("src", `./assets/images/hangman.png`);
		document.getElementById("game-ending-content").appendChild(hangmanPic);
	} else {
		document.getElementById("game-status").innerHTML = "";
		window.speechSynthesis.speak(new SpeechSynthesisUtterance("Yo"));
	}
}

let gameStatus = initializeGame(words);
let guessedWord, status;
updateDashboard(gameStatus, "continue");
document.onkeyup = event => {
	if (gameStatus.turnsRemain >=1 && status!=="win") {
		guessedWord= event.key.toLowerCase();
		gameStatus = updateGameStatus(gameStatus, guessedWord);
		status = determineGameResult(gameStatus);
		updateDashboard(gameStatus, status);
	}
}

document.getElementById("continue-button").onclick = event => {
	gameStatus =initializeGame(words);
	status = determineGameResult(gameStatus);
	updateDashboard(gameStatus, status);
}
