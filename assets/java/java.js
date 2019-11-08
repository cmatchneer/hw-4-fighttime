$(document).ready(function() {
    //universal vars
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
    var sound = document.createElement('audio');
    //the charaters stats, pics and audio
    var char = {
            "Legolas": {
                name: "Legolas",
                health: 150,
                damage: 40,
                fightPic: "assets/images/legolas.jpg",
                lossingPic: "assets/images/legolas_losses.gif",
                winningPic: "assets/images/legolas_wins.gif",
                readyUp: ("assets/audio/legolas_ready.m4a"),
                winRound: ("assets/audio/legolas_win_round.wav"),
                loseGame: ("assets/audio/legolas_lose.m4a"),
                winGame: ("assets/audio/legolas_wins.m4a")
            },
            "Gimli": {
                name: "Gimli",
                health: 280,
                damage: 30,
                fightPic: "assets/images/gimli.jpg",
                lossingPic: "assets/images/gimli_losses.gif",
                winningPic: "assets/images/gimli_wins.gif",
                readyUp: ("assets/audio/gimli_ready.m4a"),
                winRound: ("assets/audio/gimli_win_round.m4a"),
                loseGame: ("assets/audio/gimli_lose.m4a"),
                winGame: ("assets/audio/gimli_wins.m4a")
            },
            "Aragorn": {
                name: "Aragorn",
                health: 250,
                damage: 35,
                fightPic: "assets/images/aragorn.jpg",
                lossingPic: "assets/images/aragorn_losses.gif",
                winningPic: "assets/images/aragorn_wins.gif",
                readyUp: ("assets/audio/aragorn_ready.mp3"),
                winRound: ("assets/audio/aragorn_win_round.m4a"),
                loseGame: ("assets/audio/aragorn_loses.m4a"),
                winGame: ("assets/audio/aragorn_wins.m4a")
            },
            "Gandalf": {
                name: "Gandalf",
                health: 200,
                damage: 45,
                fightPic: "assets/images/gandalf.jpg",
                lossingPic: "assets/images/gandalf_losses.gif",
                winningPic: "assets/images/gandalf_wins.gif",
                readyUp: ("assets/audio/gandalf_ready.m4a"),
                winRound: ("assets/audio/gandalf_win_round.mp3"),
                loseGame: ("assets/audio/gandalf_lose.m4a"),
                winGame: ("assets/audio/gandalf_win.mp3")
            },
        }
        //starts up the game
    function gameStart() {
        $("#results").html("The once united Fellowship of The Ring have fallen to its evil corruption " + "<br>" + "Now only one remains untouched by its taint" + "<br>" + "Choose the hero and let the battle begin");
        var heroLoader = [char.Legolas, char.Gimli, char.Aragorn, char.Gandalf];
        //filling pick your fighter div
        for (var i = 0; i < heroLoader.length; i++) {
            charBox = $("<div>");
            myImg = $('<img>').attr("src", heroLoader[i].fightPic);
            health = $("<p>");
            damage = $("<p>");
            myImg.addClass("pics");
            damage.addClass("damage");
            health.addClass("health");
            health.text("Health: " + heroLoader[i].health);
            damage.text("Damage: " + heroLoader[i].damage);
            charBox.addClass("characters");
            charBox.attr("id", heroLoader[i].name);
            charBox.append(myImg, damage, health);
            $("#pickYourFighter").append(charBox);

        }
        //sets up the hero and villain and puts them in their corner
        $(".characters").on("click", function() {
            fightOn = true;
            if (heroReady === false && badGuyReady === false) {
                hero = $(this)
                heroName = this.id;
                $("#heroRoom").append(hero);
                heroReady = true;
                $("#results").html("You have chosen " + heroName);
                sound.setAttribute("src", char[heroName].readyUp);
                sound.play();




            } else if (heroReady === true && badGuyReady === false) {
                badGuyReady = true;
                villain = $(this);
                villainName = this.id
                $("#badGuyRoom").html(villain);
                $("#results").html("Your enemy is " + villainName);
                sound.setAttribute("src", "assets/audio/fight_time.m4a");
                sound.play();

            }

        })
    }
    //resets game
    function reset() {
        $("#results").html("The once united Fellowship of The Ring have fallen to its evil corruption " + "<br>" + "Now only one remains untouched by its taint" + "<br>" + "Choose the hero and let the battle begin");
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

    gameStart();

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
            char[villainName].health = char[villainName].health - char[heroName].damage;
            $("#" + char[heroName].name + " .damage").text("Damage: " + char[heroName].damage);
            $("#" + char[heroName].name + " .health").text("Health: " + char[heroName].health);
            $("#" + char[villainName].name + " .health").text("Health: " + char[villainName].health);
            $("#results").html(heroName + " has " + char[heroName].health + " health " + "<br>" + villainName + " has " + char[villainName].health + " health " +
                "<br>" + "The battle Rages On");

            //losing game
            if (char[heroName].health <= 0) {
                losses++;
                gameOver = true;
                $("#results").html(heroName + " has fallen to " + villainName + "<br>" + "The Ring and thus all hope for the Third Age is lost" +
                    "<br>" + " You have lost " + losses + " times try another path");
                $("#" + char[heroName].name + (" .pics")).attr("src", char[heroName].lossingPic);
                $("#" + char[villainName].name + (" .pics")).attr("src", "assets/images/bad_Guy_Wins.gif")
                $(" .health").remove();
                $(" .damage").remove();
                sound.setAttribute("src", char[heroName].loseGame);
                sound.play();
                //lose button creation
                var loseBtn = $("<button>");
                loseBtn.addClass("loseButton btn btn-secondary");
                loseBtn.text("Battle Lost");
                $("#buttons").append(loseBtn);
                //using lose button
                $(".loseButton").on("click", function() {
                    $(this).remove();
                    reset();
                });

            }
            // winning a round
            if (char[heroName].health > 0 && char[villainName].health <= 0 && badGuyCount > 0) {
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
                $("#" + char[heroName].name + " .health").text("Health: " + char[heroName].health);

                $(villain).empty();
                $("#results").html(heroName + " has beaten " + villainName + "<br>" + " Now you must pick another villain to fight")

            }
            //winning the game
            if (char[heroName].health > 0 && char[villainName].health <= 0 && badGuyCount === 0) {
                wins++
                $("#results").html(heroName + " has won and can now destroy the Ring of Power" + "<br>" + " Hope had been restored to the Age" +
                    "<br>" + "You have won " + wins + " times try another hero");
                var badGuyLosePic = $("<img>").attr("src", "assets/images/good_guy_wins.gif");
                $(badGuyLosePic).addClass("pics");
                gameOver = true;
                $("#" + char[heroName].name + (" .pics")).attr("src", char[heroName].winningPic);
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
                })
            }
        }


    })
})