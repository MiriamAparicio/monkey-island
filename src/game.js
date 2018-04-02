function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement;
  self.gameScreenElement = null;
}

Game.prototype.build = function () {
  var self = this;
  self.gameScreenElement = createHtml(`<div class="fight">
      <div class = "score">
      <div class="guybrush">
        <h3>Guybrush</h3>
        <p>3</p>
      </div>
      <div class="pirate">
        <h3>Pirate</h3>
        <p>3</p>
      </div>
  </div>
  </div>
  </div>
  <div class="insult-panel">
    <div class="pirate-insult">
      <p>You fight like a cow!</p>
    </div>
    <div class="comeback">
      <ul>
        <li>You live like a farmer</li>
        <li>You live like a farmer</li>
        <li>You live like a farmer</li>
      </ul>
    </div>
  </div>`);

  self.parentElement.appendChild(self.gameScreenElement);
}

Game.prototype.destroy = function() {
  var self = this;
  self.gameScreenElement.remove();
};