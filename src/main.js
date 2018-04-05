'use strict'
/**
 * @author Miriam-Aparicio
 */

/**
 * main() starts the game
 */
function main() {

  var mainContentElement = document.getElementById("main-content");
  var language;
  var utils = new Utils();
  var music = new Audio("music/chapterscreen.mp3");
  var languageIntroText = new Insults();

  /** 
   * 
   * TITLE SCREEN
   * 
   */

  /** dom elements */
  var titleScreenElement;
  var spaButtonElement;
  var engButtonElement;

  /**
   * both functions handle button listeners
   * and call buildIntroScreen
  */
  function handleSpaClick() {
    language = 'spa';
    destroyTitleScreen();
    buildIntroScreen();
  }
  function handleEngClick() {
    language = 'eng';
    destroyTitleScreen();
    buildIntroScreen();
  }

  /**
   * build splash screen
   * add event listeners to the buttons
   * initiates music
   */
  function buildTitleScreen() {
    titleScreenElement = utils.creatHtml(`<div class='bg'>
      <h1 class = "title">Monkey Island</h1>
      <div class ="language-buttons">
        <button type = "button" class= "btn btn-danger btn-lg spanish">Español</button>
        <button type = "button" class= "btn btn-warning btn-lg english">English</button>
      </div>
    </div>`);

    mainContentElement.appendChild(titleScreenElement);
    spaButtonElement = titleScreenElement.querySelector('.spanish');
    spaButtonElement.addEventListener('click', handleSpaClick);
    engButtonElement = titleScreenElement.querySelector('.english');
    engButtonElement.addEventListener('click', handleEngClick);

    music.loop = true;
    music.play();

  }

  /**
   * destroy splash screen
   */
  function destroyTitleScreen() {
    titleScreenElement.remove();
    spaButtonElement.removeEventListener("click", handleSpaClick);
    engButtonElement.removeEventListener("click", handleEngClick);
  }


  /**
   *  INTRO SCREEN
   */
  
   /** dom elements */
  var introScreenElement;
  var introTextElement;
  var startButtonElement;

  function handleStartClick() {
    destroyIntroScreen();
    buildGameScreen(language);
  }

  function buildIntroScreen(params) {
    var introText = '';
    var buttonText = '';
    if (language === 'spa') {
      introText = languageIntroText.spaIntro;
      buttonText = 'Empezar';
    } else {
      introText = languageIntroText.engIntro;
      buttonText = 'Start Game';
    }

    introScreenElement = utils.creatHtml(`<div class="bg">
      <p class = "intro-text">` + introText + `</p>
      <img src="img/guybrush-2.png" alt="guybrush" class="guybrush-img">
      <div class="start-button">
        <button type="button" class="btn btn-danger btn-lg btn-block">` + buttonText + `</button>
      </div>
    </div>`);

    mainContentElement.appendChild(introScreenElement);
    startButtonElement = introScreenElement.querySelector("button");
    startButtonElement.addEventListener("click", handleStartClick);
    
  }

  function destroyIntroScreen() {
    introScreenElement.remove();
    startButtonElement.removeEventListener('click',handleStartClick);
    music.pause();
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
    var buttonText = '';
    if (language === 'spa') {
      if (game.player.health === 0) {
        endMessage = "¡Eres un pirata pésimo!";
      } else {
        endMessage = "¡Listo para conquistar el Caribe!";
      }

      buttonText = 'Volver a jugar';
    } else {
        if (game.player.health === 0) {
          endMessage = "You suck as a pirate!";
        } else {
          endMessage = "Ready to conquer the Caribbean!";
        }
        buttonText = 'Restart';
    }

    music.loop = true;
    music.play();

    gameOverScreenElement = utils.creatHtml(`<div class='bg'>
      <h1>` + endMessage + `</h1>
      <div class="restart-button">
        <button type="button" class="btn btn-danger btn-lg btn-block">` + buttonText +`</button>
      </div>
    </div>`);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.querySelector("button");
    restartGameButtonElement.addEventListener("click", handleRestartClick);
  }

  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener("click", handleRestartClick);
    music.pause();
  }

  // -- start the app

  buildTitleScreen();
}

window.addEventListener("load", main);
