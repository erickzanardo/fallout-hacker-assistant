var chai = require("chai");
var expect = chai.expect;

var FHA = require("../fha");

describe("FalloutHackerAssistant", function() {
  describe("#addWrongPassword", function() {
    var fha = new FHA();
    fha.addWrongPassword("infiltration", 3);

    it("adds the wrong password on the instances errors", function() {
      expect(fha.errors.length).to.equal(1);
      expect(fha.errors[0].password).to.equal("infiltration");
      expect(fha.errors[0].likeness).to.equal(3);
    });

    context("when the user uses different cases for the password", function() {
      var fha = new FHA();
      fha.addWrongPassword("HEAT", 0);
      fha.addWrongPassword("even", 0);

      it("ignores the password case", function() {
        expect(fha.errors[0].password).to.equals("heat");
        expect(fha.errors[1].password).to.equals("even");
      });
    });

    context("when a password with differents length", function() {
      var fha = new FHA();
      fha.addWrongPassword("even", 0);

      it("throws an exception", function() {
        expect(function() { fha.addWrongPassword("fight", 0) }).to.throw(/Invalid password length/);
      });
    });
  });

  describe("#isAPropablyMatch", function() {
    var fha = new FHA();
    fha.addWrongPassword("gear", 1);

    it("returns true if the password may be right", function() {
      expect(fha.isAProbablyMatch("ever")).to.is.true;
    });

    it("returns false if the password is wrong", function() {
      expect(fha.isAProbablyMatch("even")).to.is.false;
    });

    context("when the fha already has more than one error", function() {
      var fha = new FHA();
      fha.addWrongPassword("fire", 0);
      fha.addWrongPassword("gear", 1);

      it("returns true if the password may be right", function() {
        expect(fha.isAProbablyMatch("ever")).to.is.true;
      });

      it("returns false if the password is wrong", function() {
        expect(fha.isAProbablyMatch("gate")).to.is.false;
      });
    });

    context("when the password have different lengths", function() {
      var fha = new FHA();
      fha.addWrongPassword("fire", 1);
      
      it("returns false", function() {
        expect(fha.isAProbablyMatch("fat")).to.is.false;
      });
    });

    context("when the probably match has different case", function() {
      var fha = new FHA();
      fha.addWrongPassword("fire", 1);
      
      it.only("ignores the case", function() {
        expect(fha.isAProbablyMatch("Fatt")).to.is.true;
      });
    });
  });

  describe("#reset", function() {
    var fha = new FHA();
    fha.addWrongPassword("fire", 0);

    it("clears the FHA", function() {
      fha.reset();
      expect(fha.errors.length).to.equals(0);
    });
  });
});
