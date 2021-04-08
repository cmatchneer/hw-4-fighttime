import * as list from "./LineUp.js";

$(document).ready(function() {
  var wins = 0;
  var losses = 0;
  var gameOver = false;
  var fightOn = true;
  var heroReady = false;
  var badGuyReady = false;
  var badGuyCount = 3;
  var hero;
  var villain;
  var heroName;
  var villainName;
  var charBox;
  var myImg;
  var health;
  var damage;
  var sound = document.createElement("audio");
  let char = list.list;
  gameStart();
  //starts up the game
  function gameStart() {
    $("#results").html(
      "The once united Fellowship of The Ring have fallen to its evil corruption " +
        "<br>" +
        "Now only one remains untouched by its taint" +
        "<br>" +
        "Choose the hero and let the battle begin"
    );
    for (let name in char) {
      console.log(char[name].fightPic);
      charBox = $("<div>");
      myImg = $("<img>").attr("src", char[name].fightPic);
      health = $("<p>");
      damage = $("<p>");
      myImg.addClass("pics");
      damage.addClass("damage");
      health.addClass("health");
      health.text("Health: " + char[name].health);
      damage.text("Damage: " + char[name].damage);
      charBox.addClass("characters");
      charBox.attr("id", char[name].name);
      charBox.append(myImg, damage, health);
      $("#pickYourFighter").append(charBox);
    }
    $(".characters").on("click", function() {
      fightOn = true;
      if (heroReady === false && badGuyReady === false) {
        hero = $(this);
        heroName = this.id;
        console.log(Legolas);
        $("#heroRoom").append(hero);
        heroReady = true;
        $("#results").html("You have chosen " + heroName);
        sound.setAttribute("src", char[heroName].readyUp);
        sound.play();
      } else if (heroReady === true && badGuyReady === false) {
        badGuyReady = true;
        villain = $(this);
        villainName = this.id;
        $("#badGuyRoom").html(villain);
        $("#results").html("Your enemy is " + villainName);
        sound.setAttribute("src", "assets/audio/fight_time.m4a");
        sound.play();
      }
    });
  }
  //resets game
  function reset() {
    $("#results").html(
      "The once united Fellowship of The Ring have fallen to its evil corruption " +
        "<br>" +
        "Now only one remains untouched by its taint" +
        "<br>" +
        "Choose the hero and let the battle begin"
    );
    $("#heroRoom").empty();
    $("#badGuyRoom").empty();
    $("#pickYourFighter").empty();

    char.Legolas.health = 150;
    char.Legolas.damage = 40;
    char.Gimli.health = 280;
    char.Gimli.damage = 30;
    char.Aragorn.health = 250;
    char.Aragorn.damage = 35;
    char.Gandalf.health = 200;
    char.Gandalf.damage = 45;
    badGuyCount = 3;
    heroReady = false;
    badGuyReady = false;
    gameOver = false;
    fightOn = true;
    gameStart();
  }

  $("#letThemFight").on("click", function() {
    // locks the game if you win, lose or win a round
    if (fightOn === true && gameOver === false) {
      sound.setAttribute("src", "assets/audio/battle_time.m4a");
      sound.play();

      if (char[heroName].name === "Legolas") {
        char[heroName].damage += 18;
      }
      if (char[heroName].name === "Gimli") {
        char[heroName].damage += 7;
      }
      if (char[heroName].name === "Gandalf") {
        char[heroName].damage += 16;
      }
      if (char[heroName].name === "Aragorn") {
        char[heroName].damage += 14;
      }
      char[heroName].health = char[heroName].health - char[villainName].damage;
      char[villainName].health =
        char[villainName].health - char[heroName].damage;
      $("#" + char[heroName].name + " .damage").text(
        "Damage: " + char[heroName].damage
      );
      $("#" + char[heroName].name + " .health").text(
        "Health: " + char[heroName].health
      );
      $("#" + char[villainName].name + " .health").text(
        "Health: " + char[villainName].health
      );
      $("#results").html(
        heroName +
          " has " +
          char[heroName].health +
          " health " +
          "<br>" +
          villainName +
          " has " +
          char[villainName].health +
          " health " +
          "<br>" +
          "The battle Rages On"
      );

      //losing game
      if (char[heroName].health <= 0) {
        losses++;
        gameOver = true;
        $("#results").html(
          heroName +
            " has fallen to " +
            villainName +
            "<br>" +
            "The Ring and thus all hope for the Third Age is lost" +
            "<br>" +
            " You have lost " +
            losses +
            " times try another path"
        );
        $("#" + char[heroName].name + " .pics").attr(
          "src",
          char[heroName].lossingPic
        );
        $("#" + char[villainName].name + " .pics").attr(
          "src",
          "assets/images/bad_Guy_Wins.gif"
        );
        $(" .health").remove();
        $(" .damage").remove();
        sound.setAttribute("src", char[heroName].loseGame);
        sound.play();
        //lose button creation
        var loseBtn = $("<button>");
        loseBtn.addClass("loseButton btn btn-secondary");
        loseBtn.text("You lost The Ring");
        $("#buttons").append(loseBtn);
        //using lose button
        $(".loseButton").on("click", function() {
          $(this).remove();
          reset();
        });
      }
      // winning a round
      if (
        char[heroName].health > 0 &&
        char[villainName].health <= 0 &&
        badGuyCount > 0
      ) {
        badGuyCount -= 1;
        badGuyReady = false;
        fightOn = false;
        if (char[heroName].name === "Legolas") {
          char[heroName].health += 40;
        }
        if (char[heroName].name === "Gimli") {
          char[heroName].health += 26;
        }
        if (char[heroName].name === "Gandalf") {
          char[heroName].health += 30;
        } else {
          char[heroName].health += 30;
        }
        sound.setAttribute("src", char[heroName].winRound);
        sound.play();
        $("#" + char[heroName].name + " .health").text(
          "Health: " + char[heroName].health
        );

        $(villain).empty();
        $("#results").html(
          heroName +
            " has beaten " +
            villainName +
            "<br>" +
            " Now you must pick another villain to fight"
        );
      }
      //winning the game
      if (
        char[heroName].health > 0 &&
        char[villainName].health <= 0 &&
        badGuyCount === 0
      ) {
        wins++;
        $("#results").html(
          heroName +
            " has won and can now destroy the Ring of Power" +
            "<br>" +
            " Hope had been restored to the Age" +
            "<br>" +
            "You have won " +
            wins +
            " times try another hero"
        );
        var badGuyLosePic = $("<img>").attr(
          "src",
          "assets/images/good_guy_wins.gif"
        );
        $(badGuyLosePic).addClass("pics");
        gameOver = true;
        $("#" + char[heroName].name + " .pics").attr(
          "src",
          char[heroName].winningPic
        );
        $(villain).html(badGuyLosePic);
        $(" .health").remove();
        $(" .damage").remove();
        sound.setAttribute("src", char[heroName].winGame);
        sound.play();
        //win button creation and exuction
        var winBtn = $("<button>");
        winBtn.addClass("winButton btn btn-secondary");
        winBtn.text("The Ring is Yours");
        $("#buttons").prepend(winBtn);
        $(".winButton").on("click", function() {
          $(this).remove();
          reset();
        });
      }
    }
  });
});
