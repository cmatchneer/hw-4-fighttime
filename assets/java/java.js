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
    var fightTwo;
    //the charaters stats and pics
    var char = {
        "Legolas": {
            name: "Legolas",
            health: 100,
            damage: 40,
            fightPic: "assets/images/legolas.jpg",
            lossingPic: "assets/images/legolas_wins.jpeg",
            winningPic: "assets/images/legolas_losses.jpg"
        },
        "Gimli": {
            name: "Gimli",
            health: 300,
            damage: 20,
            fightPic: "assets/images/gimli.jpg",
            lossingPic: "assets/images/gimli_losses.jpg",
            winningPic: "assets/images/gimli_wins.jpg"
        },
        "Aragorn": {
            name: "Aragorn",
            health: 250,
            damage: 35,
            fightPic: "assets/images/aragorn.jpg",
            lossingPic: "assets/images/aragorn_losses.gif",
            winningPic: "assets/images/aragorn_wins.gif"
        },
        "Gandalf": {
            name: "Gandalf",
            health: 3000,
            damage: 1500,
            fightPic: "assets/images/gandalf.jpg",
            lossingPic: "assets/images/gandalf_losses.gif",
            winningPic: "assets/images/gandalf_wins.gif"
        },
    }
    $("#results").html("The once united Fellowship of The Ring have fallen to its evil corruption " + "<br>" + "Now only one remains untocuhed by its taint" + "<br>" + "Choose the hero and let the battle begin");
    var heroLoader = [char.Legolas, char.Gimli, char.Aragorn, char.Gandalf];
    //filling pick your fighter div
    for (var i = 0; i < heroLoader.length; i++) {
        charBox = $("<div>");
        myImg = $('<img>').attr("src", heroLoader[i].fightPic);
        health = $("<p>");
        damage = $("<p>");
        $(myImg).addClass("pics");
        damage.addClass("damage");
        health.addClass("health");
        $(health).text("Health: " + heroLoader[i].health);
        $(damage).text("Damage: " + heroLoader[i].damage);
        charBox.addClass("charaters");
        charBox.attr("id", heroLoader[i].name);
        charBox.append(myImg, damage, health);
        $("#pickYourFighter").append(charBox);

    }
    //sets up the hero and villain and puts them in their corner

    $(".charaters").on("click", function() {
        // fightOn = true;
        if (heroReady === false && badGuyReady === false) {
            hero = $(this)
            heroName = this.id;
            $("#heroRoom").append(hero);
            heroReady = true;
            $("#results").html("You have chosen " + heroName);



        } else if (heroReady === true && badGuyReady === false) {
            badGuyReady = true;
            villain = $(this);
            villainName = this.id
            $("#badGuyRoom").html(villain);
            $("#results").html("Your enemy is " + villainName);

        }

    })



    // function theFight() {
    $("#letThemFight").on("click", function() {
            // console.log(hero);
            char[heroName].damage += 10;
            char[heroName].health = char[heroName].health - char[villainName].damage;
            char[villainName].health = char[villainName].health - char[heroName].damage;
            $("#" + char[heroName].name + " .damage").text("Damage: " + char[heroName].damage);
            $("#" + char[heroName].name + " .health").text("Health: " + char[heroName].health);
            $("#" + char[villainName].name + " .health").text("Health: " + char[villainName].health);
            $("#results").html(heroName + " has " + char[heroName].health + " health " + "<br>" + villainName + " has " + char[villainName].health + " health " +
                "<br>" + "The battle Rages On");

            // console.log(char[heroName].health);
            // console.log(char[villainName].health);
            if (char[heroName].health <= 0 && char[villainName].health > 0 && badGuyCount > 0) {
                gameOver = true;
                console.log("#" + char[heroName].name + +"<img>");
                $("#results").html(heroName + " has fallen to " + villainName + "<br>" + "The Ring and thus all hope for the Third Age is lost")
                $("#" + char[heroName].name + (" .pics")).attr("src", char[heroName].lossingPic);
                $("#" + char[villainName].name + (" .pics")).attr("src", "assets/images/bad_Guy_Wins.webp")

            }
            if (char[heroName].health > 0 && char[villainName].health <= 0 && badGuyCount > 0) {
                badGuyCount -= 1;
                badGuyReady = false;
                fightOn = false;
                console.log(fightOn);
                $(villain).empty();
                $("#results").html(heroName + " has beaten " + villainName + "<br>" + " Now you must pick another villain to fight")

            }
            if (char[heroName].health > 0 && char[villainName].health <= 0 && badGuyCount === 0) {
                $("#results").html(heroName + " has won and can now destroy the Ring of Power" + "<br>" + " Hope had been restored to the Age");
                var badGuyLosePic = $("<img>").attr("src", "assets/images/good_guy_wins.gif");
                $(badGuyLosePic).addClass("pics");
                gameOver = true;
                console.log("win");
                $("#" + char[heroName].name + (" .pics")).attr("src", char[heroName].winningPic);
                $(villain).html(badGuyLosePic);
            }


        })
        //     console.log(fightOn);

    //     return fightOn, gameOver;

    // }

    // if (fightOn === false || gameOver === true) {

    //     return;
    // }
    if (fightOn === false && gameOver === true) {
        console.log("test");
    }

});