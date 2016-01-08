"use strict"

var WrongPassword = require("./wrong-password");

function FalloutHackerAssistant() {
  this.errors = [];
}

var p = FalloutHackerAssistant.prototype;

p.addWrongPassword = function(pass, likeness) {
  for (var i = 0; i < this.errors.length; i++) {
    if (this.errors[i].password.length != pass.length) throw "Invalid password length";
  }

  this.errors.push(new WrongPassword(pass.toLowerCase(), likeness));
}

p._compareError = function(error, pass) {
  var wrongpass = error.password,
      likeness = error.likeness,
      currentLikeness = 0,
      counter = 0;

  while (counter < pass.length) {
    var wLetter = wrongpass.substring(counter, counter + 1);
    var pLetter = pass.substring(counter, counter + 1);

    if (wLetter == pLetter) currentLikeness++;

    counter++;
  }

  return currentLikeness == likeness;
};

p.isAProbablyMatch = function(pass) {
  for (var i = 0; i < this.errors.length; i++) {
    if (!this._compareError(this.errors[i], pass)) return false;
  }
  return true;
}

module.exports = FalloutHackerAssistant;
