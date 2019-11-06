$(document).ready(function() {
    //universal vars
    var wins = 0;
    var losses = 0;
    var gameOver = false;
    // var fightOn = false;
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
    //the charaters stats and pics
    var char = {
        "legolas": {
            name: "legolas",
            health: 100,
            damage: 40,
            fightPic: "assets/images/legolas.jpg"
        },
        "gimli": {
            name: "gimli",
            health: 300,
            damage: 20,
            fightPic: "assets/images/gimli.jpg"
        },
        "aragorn": {
            name: "aragorn",
            health: 250,
            damage: 35,
            fightPic: "assets/images/aragorn.jpg"
        },
        "gandalf": {
            name: "gandalf",
            health: 200,
            damage: 50,
            fightPic: "assets/images/gandalf.jpg"
        },
    }
    var heroLoader = [char.legolas, char.gimli, char.aragorn, char.gandalf];
    //filling pick your fighter div
    for (var i = 0; i < heroLoader.length; i++) {
        charBox = $("<div>");
        myImg = $('<img>');
        health = $("<p>");
        damage = $("<p>");
        damage.addClass("damage");
        health.addClass("health");
        $(health).text("Health: " + heroLoader[i].health);
        $(damage).text("Damage: " + heroLoader[i].damage);
        myImg.attr("src", heroLoader[i].fightPic);
        charBox.addClass("charaters");
        charBox.attr("id", heroLoader[i].name);
        charBox.append(myImg, damage, health);
        $("#pickYourFighter").append(charBox);

    }
    //sets up the hero and villain and puts them in their corner

    $(".charaters").on("click", function() {
        if (heroReady === false && badGuyReady === false) {
            hero = $(this)
            heroName = this.id;
            $("#heroRoom").append(hero);
            heroReady = true;



        } else if (heroReady === true && badGuyReady === false) {
            badGuyReady = true;
            villain = $(this);
            villainName = this.id
            $("#badGuyRoom").append(villain);

        }



    })


    function theFight() {
        $("#letThemFight").on("click", function() {
            char[heroName].health = char[heroName].health - char[villainName].damage;
            $(".health").text("Health: " + char[heroName].health);
            console.log(char[heroName].health);
            char[heroName].damage += 10;

        })


    }
    theFight();
});