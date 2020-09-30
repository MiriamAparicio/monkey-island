'use strict'
/**
 * @author Miriam-Aparicio
 */

/**
 * creates a instance of Game
 * 
 * @constructor Game
 * @param {*} main element
 * 
 */
function Game(parentElement) {
  var self = this;
  self.turn = 0;
  self.numAnswers = 3;

  /** dom elements */
  self.parentElement = parentElement;
  self.gameScreenElement = null;

  self.playerHealthElement = null;
  self.pirateHealthElement = null;
  self.playerDamageElement = null;
  self.pirateDamageElement = null;
  self.pirateInsultElement = null;
  self.comebacksListElement = null;
}

/**
 * ends game
 * @param {*} cb callback
 */
Game.prototype.onEnded = function(cb) {
  var self = this;
  self.callback = cb;
};

/**
 * builds html game screen
 * initiates music
 */
Game.prototype.build = function() {
  var self = this;
  self.music = new Audio ('music/stabbinglargoandlechuckreturns.mp3');
  self.utils = new Utils();
  self.gameScreenElement = self.utils.creatHtml(`<div class="div-display">
    <div class="fight">
      <div class = "score">
        <div class="guybrush">
          <h3 class="player">Guybrush</h3>
          <p class="player-health"></p>
          <p class="player-damage">OUCH!</p>
        </div>
        <div class="pirate">
          <h3>Pirate</h3>
          <p class="pirate-health"></p>
          <p class="pirate-damage">OUCH!</p>
        </div>
      </div>
    </div>
    <div class="insult-panel">
      <div class="pirate-insult">
       <p class="insult-line"></p>
      </div>
      <div class="comeback">
        <ul class="comeback-list">
        </ul>
      </div>
    </div>
  </div>`);

  /** dom elements */
  self.playerHealthElement = self.gameScreenElement.querySelector('.player-health');
  self.pirateHealthElement = self.gameScreenElement.querySelector('.pirate-health');
  self.playerDamageElement = self.gameScreenElement.querySelector('.player-damage');
  self.pirateDamageElement = self.gameScreenElement.querySelector('.pirate-damage');
  self.pirateInsultElement = self.gameScreenElement.querySelector('.insult-line');
  self.comebacksListElement = self.gameScreenElement.querySelector('.comeback-list');
  self.parentElement.appendChild(self.gameScreenElement);

  self.music.loop = true;
  self.music.play();
};


/**
 * starts game
 * @param {string} language
 * creates Character instances
 * manage language
 */
Game.prototype.start = function(language) {
  var self = this;
  self.player = new Character();
  self.pirate = new Character();
  self.insults = new Insults();

  if (language === "spa"){
    self.arrayInsults = self.insults.spaInsultos;
  } else {
    self.arrayInsults = self.insults.engInsults;
  }
  self.utils.shuffle(self.arrayInsults);
  self.buildGameElements();
};

/**
 * build game html elements
 */
Game.prototype.buildGameElements = function() {
  var self = this;
  self.playerHealthElement.innerText = self.player.health;
  self.pirateHealthElement.innerText = self.pirate.health;
  self.pirateInsultElement.innerText = self.arrayInsults[self.turn].insult;
  self.comebacksList = self.getComebackList();

  for (var i = 0; i < self.numAnswers; i++) {
    self.comebacksListElement.innerHTML += '<li>' + self.comebacksList[i] + '</li>';
  }
  /**this function should be outside as a prototype property but doesn't work */
  self.handleComebackClick = function(e) {
    self.painSound = new Audio("music/Pain-SoundBible.com-1883168362.mp3");
    self.painSound.play();
    self.checkAnswer(e);
  };

  self.comebacksListElement.addEventListener('click', self.handleComebackClick);
};

Game.prototype.handleComebackClick = 

/**
 * @returns and array with only comebacks
 * and shuffles it
 */
Game.prototype.getComebackList = function() {
  var self = this;
  self.tempArray = [];
  for (var i = self.turn; i < self.numAnswers + self.turn; i++) {
    self.tempArray.push(self.arrayInsults[i].comeback);
  }
  self.utils.shuffle(self.tempArray);
  return self.tempArray;
};

/**
 * checks if the answer is correct
 * update health
 * if health 0 en game
 * @param {event} e 
 */
Game.prototype.checkAnswer = function(e) {
  var self = this;
  self.comebacksListElement.removeEventListener('click', self.handleComebackClick);

  if (e.target.innerText == self.arrayInsults[self.turn].comeback) {
    self.pirate.updateHealth();
    self.pirateDamageElement.style.color = 'white';
  } else {
    self.player.updateHealth();
    self.playerDamageElement.style.color = 'white';
  }

  window.setTimeout(function () {
    self.turn++;
    if(self.player.health === 0 || self.pirate.health === 0){
      self.callback();
    }
    self.playerDamageElement.style.color = 'transparent';
    self.pirateDamageElement.style.color = 'transparent';
    self.comebacksListElement.innerText = '';
    self.buildGameElements();
  },1000);
  window.clearTimeout();
};

/** 
 * destroys game screen
 * stops music
 */
Game.prototype.destroy = function() {
  var self = this;
  self.music.pause();
  self.gameScreenElement.remove();
  // If do not reset 'turn' variable, this variable exceeds arrayInsults.
  self.turn = 0;
};
