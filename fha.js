(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  for (var i = 0; i < this.errors.length; i++) {
    if (!this._compareError(this.errors[i], pass)) return false;
  }
  return true;
}

p.reset = function() {
  this.errors = [];
}

module.exports = FalloutHackerAssistant;

},{"./wrong-password":2}],2:[function(require,module,exports){
function WrongPassword(password, likeness) {
  this.password = password;
  this.likeness = likeness;
}

module.exports = WrongPassword;

},{}]},{},[1]);
