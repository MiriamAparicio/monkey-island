'use strict'
/**
 * @author Miriam-Aparicio
 */

 /**
  * creates an instance of Character
  * @constructor Character
  */
function Character() {
  this.health = 3;
}

/**
 * updates property health
 */
Character.prototype.updateHealth = function () {
  this.health--;
}
