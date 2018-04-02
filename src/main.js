'use strict'

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
}

function main() {
  var mainContentElement = document.getElementById("main-content");

  // -- TITLE SCREEN

  var titleScreenElement;
  var startButtonElement;

  function handleStartClick() {
    destroyTitleScreen();
    buildGameScreen();
  }

  function buildTitleScreen() {
    titleScreenElement = createHtml(`<div class='bg'>
      <h1>Monkey Island</h1>
      <div class="start-button">
        <button type="button" class="btn btn-danger btn-lg btn-block">Start Game</button>
      </div>
    </div>`);
    mainContentElement.appendChild(titleScreenElement);
    startButtonElement = titleScreenElement.querySelector("button");
    startButtonElement.addEventListener("click", handleStartClick);
  }

  function destroyTitleScreen() {
    titleScreenElement.remove();
    startButtonElement.removeEventListener("click", handleStartClick);
  }

  // -- GAME SCREEN

  var game;

  function gameEnded() {
    destroyGameScreen();
    buildGameOverScreen();
  }

  function buildGameScreen() {
    game = new Game(mainContentElement);
    game.build();
    game.start();
    game.onEnded(function() {
       gameEnded();
    });
    //window.setTimeout(gameEnded, 3000);
  }

  function destroyGameScreen() {
    game.destroy();
  }

  // -- GAME OVER SCREEN

  var gameOverScreenElement;
  var restartGameButtonElement;

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  }

  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`<div class='bg'>
      <h1>You suck as a pirate!</h1>
      <div class="restart-button">
        <button type="button" class="btn btn-danger btn-lg btn-block">Restart Game</button>
      </div>
    </div>`);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.querySelector("button");
    restartGameButtonElement.addEventListener("click", handleRestartClick);
  }

  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener("click", handleRestartClick);
  }

  // -- start the app

  buildTitleScreen();
}

window.addEventListener("load", main);
