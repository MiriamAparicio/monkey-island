function Game(parentElement) {
  var self = this;
  self.turn = 0;
  self.numAnswers = 3;

  /*-dom elements-*/
  self.parentElement = parentElement;
  self.gameScreenElement = null;

  self.playerHealthElement = null;
  self.pirateHealthElement = null;
  self.playerDamageElement = null;
  self.pirateDamageElement = null;
  self.pirateInsultElement = null;
  self.comebacksListElement = null;
}

Game.prototype.onEnded = function(cb) {
  var self = this;
  self.callback = cb;
};

Game.prototype.build = function() {
  var self = this;
  self.utils = new Utils();
  self.gameScreenElement = self.utils.creatHtml(`<div class="div-display">
    <div class="fight">
      <div class = "score">
        <div class="guybrush">
          <h3 class="player">Guybrush</h3>
          <p class="player-health"></p>
          <p class="player-damage"></p>
        </div>
        <div class="pirate">
          <h3>Pirate</h3>
          <p class="pirate-health"></p>
          <p class="pirate-damage"></p>
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

  self.playerHealthElement = self.gameScreenElement.querySelector(".player-health");
  self.pirateHealthElement = self.gameScreenElement.querySelector(".pirate-health");
  self.playerDamageElement = self.gameScreenElement.querySelector(".player-damage");
  self.pirateDamageElement = self.gameScreenElement.querySelector(".pirate-damage");
  self.pirateInsultElement = self.gameScreenElement.querySelector(".insult-line");
  self.comebacksListElement = self.gameScreenElement.querySelector(".comeback-list");
  self.parentElement.appendChild(self.gameScreenElement);
};

Game.prototype.destroy = function() {
  var self = this;
  self.gameScreenElement.remove();
};

Game.prototype.start = function() {
  var self = this;
  self.player = new Character();
  self.pirate = new Character();
  self.insults = new Insults();
  self.utils.shuffle(self.insults.engInsults);
  self.battle();

  console.log(self.insults.engInsults[0].insult);
};


Game.prototype.battle = function() {
  var self = this;
  self.playerHealthElement.innerText = self.player.health;
  self.pirateHealthElement.innerText = self.pirate.health;
  self.pirateInsultElement.innerText = self.insults.engInsults[self.turn].insult;
  self.comebacksList = self.getComebackList();
  for (var i = 0; i < self.numAnswers; i++) {
    self.comebacksListElement.innerHTML +=
      "<li>" + self.comebacksList[i] + "</li>";
  }

  self.handleComebackClick = function(e) {
    self.checkAnswer(e);
  };

  self.comebacksListElement.addEventListener("click", self.handleComebackClick);
};

Game.prototype.getComebackList = function() {
  var self = this;
  self.tempArray = [];
  for (var i = self.turn; i < self.numAnswers + self.turn; i++) {
    self.tempArray.push(self.insults.engInsults[i].comeback);
  }
  self.utils.shuffle(self.tempArray);
  return self.tempArray;
};

Game.prototype.checkAnswer = function(e) {
  var self = this;

  self.comebacksListElement.removeEventListener(
    "click",
    self.handleComebackClick
  );
  if (e.target.innerText == self.insults.engInsults[self.turn].comeback) {
    self.pirate.updateHealth();
    self.pirateDamageElement.innerText = 'OUCH!';
    //self.pirateDamageElement.style.color = 'yellow';
  } else {
    self.player.updateHealth();
    self.playerDamageElement.innerText = "OUCH!";
    //self.playerDamageElement.style.color = 'yellow';

  }

  window.setTimeout(function () {
    self.turn++;
    if(self.player.health === 0 || self.pirate.health === 0){
      self.callback();
    }
    self.playerDamageElement.innerText = '';
    self.pirateDamageElement.innerText = '';
    self.comebacksListElement.innerText = '';
    self.battle();
  },1000);
};
