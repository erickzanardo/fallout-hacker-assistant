"use strict"

var WrongPassword = require("./wrong-password");

function FalloutHackerAssistant() {
  this.reset();
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

  if (wrongpass.length != pass.length) return false;

  while (counter < pass.length) {
    var wLetter = wrongpass.substring(counter, counter + 1);
    var pLetter = pass.substring(counter, counter + 1);

    if (wLetter == pLetter) currentLikeness++;

    counter++;
  }

  return currentLikeness == likeness;
};

p.isAProbablyMatch = function(pass) {
  pass = pass.toLowerCase();
  for (var i = 0; i < this.errors.length; i++) {
    if (!this._compareError(this.errors[i], pass)) return false;
  }
  return true;
}

p.reset = function() {
  this.errors = [];
}

module.exports = FalloutHackerAssistant;
