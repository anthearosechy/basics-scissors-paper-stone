function rollDice() {
  var randomDecimal = Math.random() * 3;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

function getChoiceString(diceValue) {
  if (diceValue == 1) {
    return "Scissors";
  }
  if (diceValue == 2) {
    return "Paper";
  }
  if (diceValue == 3) {
    return "Stone";
  }
}

function getChoiceInt(string) {
  if (string == "Scissors") {
    return 1;
  }
  if (string == "Paper") {
    return 2;
  }
  if (string == "Stone") {
    return 3;
  }
}

function checkWin(progChoice, inputChoice) {
  var diff = inputChoice - progChoice;

  if (diff == 0) {
    return 0; // 0 for draw
  }

  if (diff == -1 || diff == 2) {
    // -1 if scissors - paper, paper - stone, 2 if stone - scissors
    return 1; // 1 for win
  }

  if (diff == 1 || diff == -2) {
    // 1 if paper - scissors, stone - paper, -2 if scissors - stone
    return -1; // -1 for loss
  }
}

function getMessage(result, gameMode) {
  if (result == 0) {
    return "it's a draw!";
  }

  if (result == 1) {
    return "you won! Yay!";
  }

  if (result == -1) {
    if (gameMode == "Normal") {
      return "you lost! Sobbles.";
    }

    if (gameMode == "Reverse") {
      return "you would've won if this was the normal game.";
    }
  };
}

var userName = "";
var gameMode = "";
var userWin = 0;
var progWin = 0;

function main(input) {
  if (userName == "") {
    userName = input;
    gameMode = "selectMode";
    return `Welcome ${userName}! Type 'Normal' to play a normal game of scissors, paper, stone, and type 'Reverse' to play the reverse game.`;
  }

  if (gameMode == "selectMode") {
    gameMode = input;
    return `Select 'Scissors', 'Paper' or 'Stone' to play.`;
  }

  var result;
  var progsChoice = rollDice();

  if (gameMode == 'Normal') {
    result = checkWin(progsChoice, getChoiceInt(input));
  } else if (gameMode == "Reverse") {
    result = -1 * checkWin(progsChoice, getChoiceInt(input));
  }

  if (result == 1) {
    userWin++;
  }

  if (result == -1) {
    progWin++;
  }

  var message = getMessage(result, gameMode);
  return `${userName}, ${message} <br> The game mode was ${gameMode}.🙃 <br> The computer chose ${getChoiceString(progsChoice)} and you chose ${input}. You have won ${userWin} game(s) while the computer has won ${progWin} game(s). Feel free to play again!`;
};
