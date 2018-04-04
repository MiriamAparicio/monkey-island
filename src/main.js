'use strict'


function main() {
  var mainContentElement = document.getElementById("main-content");

  // -- TITLE SCREEN

  var titleScreenElement;
  var startButtonElement;
  var spaButtonElement;
  var engButtonElement;
  var utils = new Utils();
  var language;

  // function handleStartClick() {
  //   destroyTitleScreen();
  //   buildGameScreen();
  // }
  function handleSpaClick() {
    language = 'spa';
    destroyTitleScreen();
    buildGameScreen(language);
  }
  function handleEngClick() {
    language = 'eng';
    destroyTitleScreen();
    buildGameScreen(language);
  }

  function buildTitleScreen() {
    titleScreenElement = utils.creatHtml(`<div class='bg'>
      <h1 class = "title">Monkey Island</h1>
      <div class="language-buttons">
        <button type="button" class="btn btn-danger btn-lg spanish">Español</button>
        <button type="button" class="btn btn-warning btn-lg english">English</button>
      </div>
    </div>`);

    mainContentElement.appendChild(titleScreenElement);
    spaButtonElement = titleScreenElement.querySelector('.spanish');
    spaButtonElement.addEventListener('click', handleSpaClick);
    engButtonElement = titleScreenElement.querySelector('.english');
    engButtonElement.addEventListener('click', handleEngClick);

    // startButtonElement = titleScreenElement.querySelector("button");
    // startButtonElement.addEventListener("click", handleStartClick);
  }

  function destroyTitleScreen() {
    titleScreenElement.remove();
    spaButtonElement.removeEventListener("click", handleSpaClick);
    engButtonElement.removeEventListener("click", handleEngClick);
    // startButtonElement.removeEventListener("click", handleStartClick);
  }

  // -- GAME SCREEN

  var game;

  function gameEnded() {
    destroyGameScreen();
    buildGameOverScreen();
  }

  function buildGameScreen(language) {
    game = new Game(mainContentElement);
    game.build();
    game.start(language);
    game.onEnded(function() {
       gameEnded();
    });
    
  }

  function destroyGameScreen() {
    game.destroy();
  }

  // -- GAME OVER SCREEN

  var gameOverScreenElement;
  var restartGameButtonElement;

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen(language);
  }

  function buildGameOverScreen() {
    var endMessage = '';
    if (language === 'spa') {
      if (game.player.health === 0) {
        endMessage = "¡Eres un pirata pésimo!";
      } else {
        endMessage = "¡Listo para conquistar el Caribe!";
      }
    } else {
        if (game.player.health === 0) {
          endMessage = "You suck as a pirate!";
        } else {
          endMessage = "Ready to conquer the Caribbean!";
        }
    }
    
      gameOverScreenElement = utils.creatHtml(`<div class='bg'>
      <h1>` + endMessage + `</h1>
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
