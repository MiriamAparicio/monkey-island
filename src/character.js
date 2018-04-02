function Character() {
  this.health = 3;
  this.type = null;
}

/*TODO
-update health 
-set type
*/

Character.prototype.updateHealth = function () {
  this.health--;
}
