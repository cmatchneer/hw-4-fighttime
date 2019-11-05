$(document).ready(function() {
    //universal vars
    var wins = 0;
    var losses = 0;
    var gameOver = false;
    var fightOn = false;
    var heroReady = false;
    var badGuyReady = false;
    //the charaters stats and pics
    var char = {
        legolas: {
            name: "legolas",
            health: 160,
            damage: 20,
            fightPic: "assets/images/legolas.jpg"
        },
        gimli: {
            name: "gimli",
            health: 160,
            damage: 20,
            fightPic: "assets/images/gimli.jpg"
        },
        aragorn: {
            name: "aragorn",
            health: 160,
            damage: 20,
            fightPic: "assets/images/aragorn.jpg"
        },
        gandalf: {
            name: "gandalf",
            health: 160,
            damage: 20,
            fightPic: "assets/images/gandalf.jpg"
        },
    }
    var heroLoader = [char.legolas, char.gimli, char.aragorn, char.gandalf];
    //filling pick your fighter div
    for (var i = 0; i < heroLoader.length; i++) {
        var charBox = $("<div>");
        var myImg = $('<img>');
        var health = $("<p>");
        var damage = $("<p>");
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
    $(".charaters").on("click", function() {
        // console.log(playerReady);
        if (heroReady === false && badGuyReady === false) {

            var hero = $(this)
            $("#heroRoom").append(hero);
            heroReady = true;
            console.log(heroReady);

        } else if (heroReady === true && badGuyReady === false) {
            badGuyReady = true;
            var villian = $(this);
            $("#badGuyRoom").append(villian);

            console.log(heroReady);

        }


    })






});