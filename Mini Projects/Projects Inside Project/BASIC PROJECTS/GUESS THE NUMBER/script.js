let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector("#subt");
const userInput = document.querySelector(".guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");
const p = document.createElement("p");
let prevGuess = [];
let numGuess = 1;
let playGame = true;
let attempt = 0;

if (playGame) {
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        const guess = userInput.value;
        console.log(guess);
        console.log(randomNumber);

        validateGuess(guess);
    })
}

const validateGuess = (guess) => {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    }
    else if (guess < 1) {
        alert("Please enter a number more than 1");
    }
    else if (guess > 100) {
        alert("Please enter a number less than 100");
    }
    else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over.Random number was ${randomNumber}`);
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}
const checkGuess = (guess) => {
    if (guess == randomNumber) {
        displayMessage(`You guessed it right`);
        endGame();
    }
    else if (guess < randomNumber) {
        displayMessage(`Number is Tooo low`);
    }
    else if (guess > randomNumber) {
        displayMessage(`Number is Tooo high`);
    }
}
const displayGuess = (guess) => {
    userInput.value = "";
    guessSlot.innerHTML += `${guess} `;
    guessSlot.setAttribute("style", "display: inline;")
    numGuess++;
    attempt++;
    remaining.innerHTML = `${12 - numGuess}`;
}
const displayMessage = (message) => {
    lowOrHi.innerHTML = `${message}`;
}
const endGame = () => {
    if(numGuess <= 11) {
        const att = document.createElement("p");
        att.textContent = `You guessed it right on ${attempt} attempt`;
        lowOrHi.appendChild(att);
    }
    userInput.value = "";
    userInput.setAttribute("disabled", "");
    p.classList.add("button");
    p.innerHTML = `<h2 id = "newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    remaining.innerHTML = `0`;
    newGame();
}
const newGame = () => {
    const newGameButton = document.querySelector("#newGame");
    newGameButton.addEventListener("click", () => {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = "";
        remaining.innerHTML = `${10}`;
        userInput.removeAttribute("disabled");
        lowOrHi.innerHTML = "";
        startOver.removeChild(p);
        attempt = 0;
        guessSlot.setAttribute("style", "display: none;")
        playGame = true;
    })
}
const buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        switch(e.target.id) {
            case "black": 
            body.style.backgroundColor = e.target.id;
            body.style.color = "white";
            break;
            case "white": 
            body.style.backgroundColor = e.target.id;
            body.style.color = "black";
            break;
        }
    })
})