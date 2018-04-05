'use strict'
/**
 * @author Miriam-Aparicio
 */

/**
 * main starts building the game
 */
function main() {

  var mainContentElement = document.getElementById('main-content');
  var language;
  var utils = new Utils();
  var music = new Audio('music/chapterscreen.mp3');
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
   * build html splash screen
   * add event listeners to the buttons
   * initiates music
   */
  function buildTitleScreen() {
    music.loop = true;
    music.play();

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

  }

  /**
   * destroy splash screen
   * stops music
   */
  function destroyTitleScreen() {
    titleScreenElement.remove();
    spaButtonElement.removeEventListener('click', handleSpaClick);
    engButtonElement.removeEventListener('click', handleEngClick);
    music.pause();
  }




  /**
   * 
   *  INTRO SCREEN
   * 
   */
  
   /** dom elements */
  var introScreenElement;
  var introTextElement;
  var startButtonElement;

  /**
   * handle start button listeners
   * and call buildIntroScreen
   * stops music
  */
  function handleStartClick() {
    destroyIntroScreen();
    buildGameScreen(language);
    music.pause();
  }

  /**
   * build html intro screen
   * add event listener to the start button
   * initiates music
   */
  function buildIntroScreen() {
    music.loop = true;
    music.play();

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
    startButtonElement = introScreenElement.querySelector('button');
    startButtonElement.addEventListener('click', handleStartClick);
    
  }

  /**
   * destroy intro screen
   * stops music
   */
  function destroyIntroScreen() {
    introScreenElement.remove();
    startButtonElement.removeEventListener('click',handleStartClick);
    music.pause();
  }


  /**
   * 
   * GAME SCREEN
   * 
   */

  /**
   * instance of game
   */
  var game = new Game(mainContentElement);

  
  /**
   * builds html game screen
   * @param {string} language choosen language
   * calling properties from Game
   */
  function buildGameScreen(language) {
    game.build();
    game.start(language);
    game.onEnded(function() {
       gameEnded();
    });    
  }

  /**
   * calls destroy property from Game
   */
  function destroyGameScreen() {
    game.destroy();
  }

  /**
   * ends game
   * destroy game screen and buil game over screen
   */
  function gameEnded() {
    destroyGameScreen();
    buildGameOverScreen();
  }


  /**
   * 
   * GAME OVER SCREEN
   * 
   */

  /**dom elements */
  var gameOverScreenElement;
  var restartGameButtonElement;

  /**end message language variables */
  var endMessage = '';
  var buttonText = '';

  /**
   * handle restart button listener
   * and call buildGamecreen
  */
  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen(language);
  }
  
  /**
   * manage end message language 
   */
  function endMessageLanguage(){
    if (language === 'spa') {
      if (game.player.health === 0) {
        endMessage = '¡Eres un pirata pésimo!';
      } else {
        endMessage = '¡Listo para conquistar el Caribe!';
      }

      buttonText = 'Volver a jugar';

    } else {
      if (game.player.health === 0) {
        endMessage = 'You suck as a pirate!';
      } else {
        endMessage = 'Ready to conquer the Caribbean!';
      }

      buttonText = 'Restart';

    }
  }

  /**
   * build html game over screen
   * add event listener to the restart button
   * initiates music 
   */
  function buildGameOverScreen() {
    music.loop = true;
    music.play();

    endMessageLanguage();

    gameOverScreenElement = utils.creatHtml(`<div class='bg'>
      <h1>` + endMessage + `</h1>
      <div class="restart-button">
        <button type="button" class="btn btn-danger btn-lg btn-block">` + buttonText +`</button>
      </div>
    </div>`);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.querySelector('button');
    restartGameButtonElement.addEventListener('click', handleRestartClick);
  }

  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener('click', handleRestartClick);
    music.pause();
  }

  /** start the app */
  buildTitleScreen();
}

window.addEventListener('load', main);
