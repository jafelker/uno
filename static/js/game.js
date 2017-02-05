var container = $("#container");
var footer = $("#footer");
var p1 = $("#p1");
var p2 = $("#p2");
var p3 = $("#p3");
var p4 = $("#p4");
var gb = $("#game-board");
var sb = $("#score-board");
var p1score = $("#p1score");
var p2score = $("#p2score");
var p3score = $("#p3score");
var p4score = $("#p4score");
var p1scoreName = $("#p1scoreName");
var p2scoreName = $("#p2scoreName");
var p3scoreName = $("#p3scoreName");
var p4scoreName = $("#p4scoreName");
var p1cards = $("#p1cards");
var p2cards = $("#p2cards");
var p3cards = $("#p3cards");
var p4cards = $("#p4cards");
var p4cardcount = $("#p4cards img").length;
var p2cardcount = $("#p2cards img").length;
//var p3cardcount = $("#p3cards img").length;

var players = [];
var id = 1;
players.push(new player(p1.text(), "#p1cards", "#p1", [], 0, true, id++, p1score));
players.push(new player(p2.text(), "#p2cards", "#p2", [], 0, true, id++, p2score));
players.push(new player(p3.text(), "#p3cards", "#p3", [], 0, false, id++, p3score));
players.push(new player(p4.text(), "#p4cards", "#p4", [], 0, true, id++, p4score));

var currentGame = new game(players);

$(document).ready(function(){
    resizeBoard();
    resizePlayerNames();
    resizeCircle();
    updateScoreBoardNames();
    $("#plus").css("display", "none");

    $("#submitButton").click(function() {
        tallySystemCustom = $("#tallySystemCustomInput").val();
        pointSystemCustom = $("#pointSystemCustomInput").val();
        if($("#tallySystemCustom").is(":checked") && (isNaN(tallySystemCustom) || tallySystemCustom == "" || Number(tallySystemCustom) <= 0)) {
            $("#tallySystemCustomInput").css("border", "2px solid red");
            $(".errorText").show();
            return;
        }
        if($("#pointSystemCustom").is(":checked") && (isNaN(pointSystemCustom) || pointSystemCustom == "" || Number(pointSystemCustom) <= 0)) {
            $("#pointSystemCustomInput").css("border", "2px solid red");
            $(".errorText").show();
            return;
        }
        playerName = $("#playerName").val();
        if(playerName == "") {
            playerName = "No Name";
        }
        if(playerName.length > 15) {
            playerName = playerName.substring(0, 16);
        }
        p3.text(playerName);
        currentGame.players[2].playerName = playerName;
        updateScoreBoardNames();
        $("#settingsModal").modal('toggle');

        currentGame.newRound();
        $( initDrag );
        $( initDrop );
        currentGame.setMaxScore();
        currentGame.playRound();
        resizePlayerNames();
    });

    $("#redSelect").click(function() {
        currentGame.humanColor("Red");
        $("#colorSelectionModal").modal("toggle");
    });

    $("#greenSelect").click(function() {
        currentGame.humanColor("Green");
        $("#colorSelectionModal").modal("toggle");
    });

    $("#yellowSelect").click(function() {
        currentGame.humanColor("Yellow");
        $("#colorSelectionModal").modal("toggle");
    });

    $("#blueSelect").click(function() {
        currentGame.humanColor("Blue");
        $("#colorSelectionModal").modal("toggle");
    });

    $("#settingsModal").modal({
        backdrop: 'static',
        keyboard: false
    });

    $("#newGameModalButton").click(function() {
        location.href = location.protocol + "//" + location.host + "/game.html";
    });

    $("#mainMenuModalButton").click(function() {
        location.href = location.protocol + "//" + location.host;
    });

    $("#drawPileCard").click(function() {
        currentGame.humanDraw();
    });

    $('#roundEndModal').on('hidden.bs.modal', function () {
        currentGame.newRound();
    });

    $("#drawPileCard").hover(function() {
        if(currentGame.currentPlayerIndex == 2) {
            $(this).css("box-shadow", "0px 0px 40px gold");
        }
    }, function() {
        $(this).css("box-shadow", "0px 0px 0px");
    });

    $("#roundEndButton").click(function() {
        $("#roundEndModal").modal("hide");
    });
});

$(window).resize(function() {
    resizeBoard();
    resizePlayerNames();
    resizeCards();
    resizeCircle();
    $("#log-list").scrollTop($("#log-list")[0].scrollHeight);
});

function resizeCircle(){
    $("#colorIndicator").css("r", .3 * $("#clrCircle").height());
}

function resizeBoard(){
    $("#game-board").css("height", 0);
    // $("#game-board").css("width", 0);
    $("#game-board").css("height", container.height()-footer.height());
    // $("#game-board").css("width", container.height()-footer.height());
    $("#score-board").css("height", (container.height()-footer.height())*.5);
    $("#gameplay-log").css("height", (container.height()-footer.height())*.5);
    $("#gameplay-log").css("bottom", footer.height());

}

function resizeP2Hand(){
    var newWidth = $("#game-board").height();
    $("#p2cards").css("width",newWidth * .6);
    $("#p2cards").css("right",newWidth * -.125);
}

function resizeP4Hand(){
    var newWidth = $("#game-board").height();
    $("#p4cards").css("width",newWidth * .6);
    $("#p4cards").css("left",newWidth * -.125);
}

function resizeCards(){
    // $(".hand img").css({"height": ((container.height()-footer.height())/6), "width": ((container.height()-footer.height())/9.2)});
    redrawHand("#p1cards");
    redrawHand("#p2cards");
    redrawHand("#p3cards");
    redrawHand("#p4cards");
    console.log("cards were resized");

}

function resizePlayerNames(){
    var p = p1.parent();
    var h = p.height();
    var w = p.width();
    var p1h = p1.height();
    var p2h = p2.height();
    var p3h = p3.height();
    var p4h = p4.height();
    var p1w = p1.width();
    var p2w = p2.width();
    var p3w = p3.width();
    var p4w = p4.width();
    var p1cardsh = p1cards.height();
    var p1cardsw = p1cards.width();
    var p2cardsh = p2cards.height();
    var p2cardsw = p2cards.width();
    var p3cardsh = p3cards.height();
    var p3cardsw = p3cards.width();
    var p4cardsh = p4cards.height();
    var p4cardsw = p4cards.width();

    // p1.css("top",0);
    p1.css("left",((w-p1w)/2));

    // p2.css("right",0);
    p2.css("top",((h-p2h)/2));

    // p3.css("bottom",0);
    p3.css("left",((w-p3w)/2));

    // p4.css("left",0);
    p4.css("top",((h-p4h)/2));

    // p1cards.css("top", 40);
    // p1cards.css("left", ((w-400)/2));

    // p2cards.css("right", -(400/2)+p2w+(93/2)+20);
    // p2cards.css("top", ((h-p2cardsh)/2));


    // p3cards.css("bottom", 40);
    // p3cards.css("left", ((w-400)/2));

    // p4cards.css("left", -(400/2)+p4w+(93/2)+20);
    // p4cards.css("top", ((h-p4cardsh)/2));


};

function updateScoreBoardNames(){
    p1scoreName.text(p1.text());
    p2scoreName.text(p2.text());
    p3scoreName.text(p3.text());
    p4scoreName.text(p4.text());
}

function redrawHand(classSelector) {
    if(classSelector == "#p2cards"){
        resizeP2Hand();
    }
    else if(classSelector == "#p4cards"){
        resizeP4Hand();
    }
    var width = $(".hand" + classSelector).width();
    classSelector = classSelector + " > img";
    var cardWidth = $(classSelector).height()*194/300;//width was 0 sometimes so height * the ratio of the card pixels = width
    var increment = (width - cardWidth) / ($(classSelector).length - 1);
    $(classSelector).each(function(index, element) {
        if($(classSelector).length < 3){
            increment = (width - cardWidth) / ($(classSelector).length+1);
            var left = (index *increment) +increment;
            $(this).css("left", left);
        }
        else{
            var left = index * increment;
            $(this).css("left", left);
        }
    });
}

$("#minus").click(function(){toggleLog();});
$("#plus").click(function(){toggleLog();});

function toggleLog(){
    console.log("toggle log");
    if($("#minus").css("display") == "none"){
       $("#minus").css("display", "block");
       $("#plus").css("display", "none");
       $("#log-list").css("display", "block");
    }
    else{
       $("#plus").css("display", "block");
       $("#minus").css("display", "none");
       $("#log-list").css("display", "none");
    }
}

function winRoundModal(name, points) {
    if(points > 1) score = points + " points.";
    else score = points + " point.";
    var modaltext = name + " won the round and was awarded " + score;
    document.getElementById("winroundtext").innerHTML = modaltext;
    $("#roundEndModal").modal();
}

function winGameModal(name, score) {
    if(score > 1) score = score + " points!";
    else score = score + " point!";
    var modaltext = name + " won the game with a total of " + score;
    document.getElementById("wingametext").innerHTML = modaltext;
    $("#gameEndModal").modal({
        backdrop: "static",
        keyboard: false
    });
}

function changeColorIndicator(color) {
    var hex = "#FF5158";
    if(color == "Red") {
        hex = "#FF5158"
    }
    else if(color == "Blue") {
        hex = "#5A58F5"
    }
    else if(color == "Green") {
        hex = "#45AA60";
    }
    else {
        hex = "#FFA83A";
    }
    $("#colorIndicator").css("fill", hex);
}

function changeArrowIndicator(direction) {
    if(direction == 1) {
        $("#arrowIndicator").attr("src", "/static/images/arrowleft.png");
    }
    else {
        $("#arrowIndicator").attr("src", "/static/images/arrowright.png");
    }
}

function continueExecution() {
    currentGame.playRound();
}

function waitTime() {
    var waitTime = Math.random() * 1500 + 1000;
    console.log(waitTime);
    return waitTime;
}

function card(number, color, specialType, cardId) {
    this.number = number;
    this.color = color;
    this.specialType = specialType;
    this.cardId = cardId;

    this.imageName = function() {
        var imageName = this.color + this.number + this.specialType + ".png";
        return imageName.toLowerCase();
    }

    this.printCard = function() {
        console.log("Number: " + this.number + " Color: " + this.color + " Type: " + this.specialType + " Id: " + this.cardId);
        var special = this.specialType;
        if(special == "Drawtwo") {
            special = "Draw Two";
        }
        else if(special == "Wilddrawfour") {
            special = "Wild Draw Four";
        }
        addLogString(this.color + " " + this.number + " " + special);
    }

    this.matches = function(color, number, specialType) {
        return (this.number !== "" && this.number === number) || 
            (this.color != "" && this.color == color) ||
            (this.specialType != "" && this.specialType == specialType) ||
            this.specialType == "Wild" || 
            this.specialType == "Wilddrawfour";
    }
}

function player(name, divId, textDivId, hand, score, isAI, id, scoreboard) {
    this.playerName = name;
    this.divId = divId;
    this.textDivId = textDivId;
    this.hand = hand;
    this.score = score;
    this.isAI = isAI;
    this.id = id;
    this.scoreboard = scoreboard;

    this.addCardToHand = function(card) {
        if(!this.isAI) {
            $(this.divId).append("<img class='card' id='" + card.cardId + "' src='/static/images/cards/" + card.imageName() + "' />");
            $(initDrag);
            // $("#" + card.cardId).click(function() {
                // currentGame.humanPlay(Number(this.id));
            // });
            $("#" + card.cardId).hover(function() {
                if(card.matches(currentGame.currentColor, currentGame.currentNumber, currentGame.currentSpecialType) && currentGame.currentPlayerIndex == 2) {
                    $(this).css("box-shadow", "0px 0px 40px gold");
                }
            }, function() {
                $(this).css("box-shadow", "0px 0px 0px");
            });
        }
        else {
            $(this.divId).append("<img class='card' id='" + card.cardId + "' src='/static/images/cards/cardback.png' />");
        }
        redrawHand(this.divId);
    }

    this.removeCardFromHand = function(card) {
        $(this.divId + " > #" + card.cardId).remove();
        $("#discardPile > img").attr("src", "/static/images/cards/" + card.imageName());
        redrawHand(this.divId);
    }

    this.clearHand = function() {
        for(var i = 0; i < this.hand.length; i++) {
            var card = this.hand[i];
            $(this.divId + " > #" + card.cardId).remove();
        }
        this.hand = [];
    }

    this.printHand = function() {
        for(var i = 0; i < this.hand.length; i++) {
            this.hand[i].printCard();
        }
    }

    this.playCard = function(color, number, specialType) {
        var wildIndex = null;
        var cardIndex = null;
        for(var i = 0; i < this.hand.length; i++) {
            if(this.hand[i].matches(color, number, specialType)) {
                if(this.hand[i].specialType != "") {
                    wildIndex = i;
                }
                else {
                    cardIndex = i;
                }
            }
        }
        if(cardIndex != null) {
            var card = this.hand.splice(cardIndex, 1)[0];
            this.removeCardFromHand(card);
            return card;
        }
        else if(wildIndex != null) {
            var card = this.hand.splice(wildIndex, 1)[0];
            this.removeCardFromHand(card);
            return card;
        }
        else {
            return null;
        }
    }

    this.drawCard = function(card) {
        this.hand.push(card);
        this.addCardToHand(card);
    }

    this.chooseColor = function() {
        var returnColor;
        if(this.isAI) {
            var redCount = 0, blueCount = 0, yellowCount = 0, greenCount = 0;
            for(var i = 0; i < this.hand.length; i++) {
                var card = this.hand[i];
                if(card.color == "Red") redCount++;
                else if(card.color == "Blue") blueCount++;
                else if(card.color == "Yellow") yellowCount++;
                else if(card.color == "Green") greenCount++;
            }
            maxCount = Math.max(redCount, blueCount, yellowCount, greenCount);
            if(maxCount == redCount) returnColor = "Red";
            else if(maxCount == blueCount) returnColor = "Blue";
            else if(maxCount == yellowCount) returnColor = "Yellow";
            else returnColor = "Green";
            console.log(this.playerName + " chose " + returnColor + " as the next color.");
            addLogString(this.playerName + " chose " + returnColor + " as the next color.");
        }
        else {
            if(this.hand.length == 0) return null;
            $("#colorSelectionModal").modal({
                backdrop: 'static',
                keyboard: false
            });
            returnColor = null;
        }
        return returnColor;
    }

    this.playCardWithId = function(cardId, color, number, specialType) {
        for(var i = 0; i < this.hand.length; i++) {
            var card = this.hand[i];
            if(card.cardId == cardId && card.matches(color, number, specialType)) {
                return this.hand.splice(i, 1);
            }
        }
        return null;
    }

    this.addScore = function(score) {
        this.score += score;
        $(this.scoreboard).text(this.score);
    }
}

function game(players) {
    this.players = players;
    this.currentPlayerIndex = 2;
    this.discardPile = [];
    this.drawPile = [];
    this.direction = 1;
    this.currentColor = "";
    this.currentNumber = "";
    this.currentSpecialType = "";
    this.maxScore = 0;
    this.scoreToCheck = 0;

    var cardId = 0;

    for(var i = 0; i < 10; i++) {
        this.drawPile.push(new card(i, "Red", "", cardId++));
        this.drawPile.push(new card(i, "Green", "", cardId++));
        this.drawPile.push(new card(i, "Blue", "", cardId++));
        this.drawPile.push(new card(i, "Yellow", "", cardId++));
    }
    for(var i = 1; i < 10; i++) {
        this.drawPile.push(new card(i, "Red", "", cardId++));
        this.drawPile.push(new card(i, "Green", "", cardId++));
        this.drawPile.push(new card(i, "Blue", "", cardId++));
        this.drawPile.push(new card(i, "Yellow", "", cardId++));
    }
    for(var i = 0; i < 4; i++) {
        this.drawPile.push(new card("", "", "Wild", cardId++));
        this.drawPile.push(new card("", "", "Wilddrawfour", cardId++))
    }
    for(var i = 0; i < 2; i++) {
        this.drawPile.push(new card("", "Red", "Skip", cardId++));
        this.drawPile.push(new card("", "Yellow", "Skip", cardId++));
        this.drawPile.push(new card("", "Green", "Skip", cardId++));
        this.drawPile.push(new card("", "Blue", "Skip", cardId++));
        this.drawPile.push(new card("", "Red", "Reverse", cardId++));
        this.drawPile.push(new card("", "Yellow", "Reverse", cardId++));
        this.drawPile.push(new card("", "Green", "Reverse", cardId++));
        this.drawPile.push(new card("", "Blue", "Reverse", cardId++));
        this.drawPile.push(new card("", "Red", "Drawtwo", cardId++));
        this.drawPile.push(new card("", "Yellow", "Drawtwo", cardId++));
        this.drawPile.push(new card("", "Green", "Drawtwo", cardId++));
        this.drawPile.push(new card("", "Blue", "Drawtwo", cardId++));
    }

    this.setMaxScore = function() {
        if(pointSystem) {
            if(pointSystemCustom != "") {
                this.maxScore = Number(pointSystemCustom);
            }
            else {
                this.maxScore = pointSystemValue;
            }
        }
        else {
            if(tallySystemCustom != "") {
                this.maxScore = Number(tallySystemCustom);
            }
            else {
                this.maxScore = tallySystemValue;
            }
        }
    }

    this.printDiscard = function() {
        console.log("Printing Discard Pile");
        //addLogString("Printing Discard Pile");
        this.discardPile.forEach(function(element) {
            element.printCard();
        });
    }

    this.printDraw = function() {
        console.log("Printing Draw Pile");
        //addLogString("Printing Draw Pile");
        this.drawPile.forEach(function(element) {
            element.printCard();
        });
    }

    this.newRound = function() {
        this.roundOver = false;
        this.currentPlayerIndex = 2;
        this.changeFontNames();
        this.direction = 1;
        changeArrowIndicator(this.direction);
        this.drawPile = this.drawPile.concat(this.discardPile);
        this.discardPile = [];
        for(var i = 0; i < this.players.length; i++) {
            this.drawPile = this.drawPile.concat(this.players[i].hand);
            this.players[i].clearHand();
        }
        this.shuffleCards();
        this.dealCards();
        while(this.drawPile[0].specialType != "") {
            this.drawPile.push(this.drawPile.shift());
        }
        var card = this.drawPile.shift();
        this.discardPile.unshift(card);
        $("#discardPile").append("<img id='discardPileCard' src='/static/images/cards/" + card.imageName() + "' />");
        console.log("A new round has started.");
        addLogString("A new round has started.");
        console.log("The first card added to the discard pile is: ");
        addLogString("The first card added to the discard pile is: ");
        this.discardPile[0].printCard();
        this.currentColor = this.discardPile[0].color;
        changeColorIndicator(this.currentColor);
        this.currentNumber = this.discardPile[0].number;
        this.currentSpecialType = this.discardPile[0].specialType;
    }

    this.shuffleCards = function() {
        var num = Math.floor((Math.random() * 10) + 1);
        for(var i = 0; i < num; i++) {
            this.riffleShuffle();
            this.overhandShuffle();
        }
    }

    this.riffleShuffle = function() {
        var i = 0;
        var j = Math.floor(this.drawPile.length / 2);
        var newDrawPile = [];
        while(j < this.drawPile.length && i < Math.floor(this.drawPile.length / 2)) {
            newDrawPile.push(this.drawPile[j++]);
            newDrawPile.push(this.drawPile[i++]);
        }
        while(j < this.drawPile.length) {
            newDrawPile.push(this.drawPile[j++]);
        }
        this.drawPile = newDrawPile;
    }

    this.overhandShuffle = function() {
        var removed = [];
        var newDrawPile = [];
        while(this.drawPile.length > 0) {
            var num = Math.floor((Math.random() * 5) + 1);
            removed = this.drawPile.splice(0, num);
            newDrawPile = removed.concat(newDrawPile);
        }
        this.drawPile = newDrawPile;
    }

    this.dealCards = function() {
        for(var i = 0; i < 7; i++) {
            for(var j = 0; j < this.players.length; j++) {
                var card = this.drawPile.shift();
                this.players[j].hand.push(card);
                this.players[j].addCardToHand(card);
            }
        }
    }

    this.printHands = function() {
        for(var i = 0; i < this.players.length; i++) {
            console.log("Player " + i + "'s Hand:");
            //addLogString("Player " + i + "'s Hand:");
            this.players[i].printHand();
        }
    }

    this.executeTurn = function(cardIn) {
        var player = this.players[this.currentPlayerIndex];
        var card;
        if(player.isAI) {
            card = player.playCard(this.currentColor, this.currentNumber, this.currentSpecialType);
        }
        else {
            card = cardIn;
        }
        if(card == null) {
            if(player.isAI){
                addLogString(player.playerName + " was not able to play a card and was forced to draw.");
            }
            else {
                addLogString(player.playerName + " drew a card.");
            }
            console.log(player.playerName + " was not able to play a card and was forced to draw.");
            player.drawCard(this.drawPile.shift());
            this.checkIfDiscardPileIsEmpty();
        }
        else {
            console.log(player.playerName + " played: ");
            addLogString(player.playerName + " played: ");
            card.printCard();
            this.discardPile.unshift(card);

            this.currentColor = card.color;
            this.currentNumber = card.number;
            this.currentSpecialType = card.specialType;

            if(card.specialType == "Wild") {
                this.currentColor = player.chooseColor();
                this.currentNumber = "";
            }
            else if(card.specialType == "Wilddrawfour") {
                this.currentColor = player.chooseColor();
                this.currentNumber = "";
                var nextPlayer = this.currentPlayerIndex + this.direction;
                nextPlayer = this.makeIndex(nextPlayer);
                for(var i = 0; i < 4; i++) {
                    this.players[nextPlayer].drawCard(this.drawPile.shift());
                    this.checkIfDiscardPileIsEmpty();        
                }
                console.log(this.players[nextPlayer].playerName + " was forced to draw 4 cards.");
                addLogString(this.players[nextPlayer].playerName + " was forced to draw 4 cards.");
            }
            else if(card.specialType == "Reverse") {
                this.direction *= -1;
                changeArrowIndicator(this.direction);
            }
            else if(card.specialType == "Skip") {
                this.currentPlayerIndex += this.direction;
            }
            else if(card.specialType == "Drawtwo") {
                this.currentNumber = "";
                var nextPlayer = this.currentPlayerIndex + this.direction;
                nextPlayer = this.makeIndex(nextPlayer);
                for(var i = 0; i < 2; i++) {
                    this.players[nextPlayer].drawCard(this.drawPile.shift()); 
                    this.checkIfDiscardPileIsEmpty();       
                }
                console.log(this.players[nextPlayer].playerName + " was forced to draw 2 cards and lose their turn.");
                addLogString(this.players[nextPlayer].playerName + " was forced to draw 2 cards and lose their turn.");
                this.currentPlayerIndex += this.direction;
            }
        }

        if(this.currentColor != null) {
            changeColorIndicator(this.currentColor);
        }

        this.currentPlayerIndex += this.direction;
        this.currentPlayerIndex = this.makeIndex(this.currentPlayerIndex);

        this.changeFontNames();
    }

    this.changeFontNames = function() {
        for(var i = 0; i < this.players.length; i++) {
            if(i == this.currentPlayerIndex) {
                $(this.players[i].textDivId).css({"font-weight":"bold", "color":"gold", "font-size":"3vh"});
            }
            else {
                $(this.players[i].textDivId).css({"font-weight":"normal", "color":"white", "font-size":"2.5vh"});
            }
        }
        resizePlayerNames();
    }

    this.checkIfDiscardPileIsEmpty = function() {
        var card = this.discardPile[0];
        if(this.drawPile.length == 0) {
            this.drawPile = this.drawPile.concat(this.discardPile.slice(1, this.discardPile.length));
            this.shuffleCards();
            this.discardPile = [];
            this.discardPile.unshift(card);
        }
    }

    this.playRound = function() {
        if(this.scoreToCheck < this.maxScore && !this.roundOver) {
            if(this.currentColor == null) {
                return;
            }
            var player = this.players[this.currentPlayerIndex];
            if(!player.isAI) {
                //console.log("It is your turn to play, here is your hand:");
                //addLogString("It is your turn to play, here is your hand:");
                //player.printHand();
                return;
            }
            this.executeTurn();
            this.checkPlayerCardsLeft(player);
            if(!this.players[this.currentPlayerIndex].isAI) {
                return;
            }
            setTimeout(continueExecution, waitTime());
        }
    }

    this.humanPlay = function(cardId) {
        if(this.currentPlayerIndex != 2) {
            console.log("Wait your turn!");
            addLogString("Wait your turn!");
            return;
        }
        var player = this.players[this.currentPlayerIndex];
        var card = player.playCardWithId(cardId, this.currentColor, this.currentNumber, this.currentSpecialType);
        if(card == null) {
            console.log("That was not a valid card, try again.");
            addLogString("That was not a valid card, try again.");
            return;
        }
        card = card[0];
        player.removeCardFromHand(card);
        this.executeTurn(card);
        this.checkPlayerCardsLeft(player);
        if(card.specialType == "Wild" || card.specialType == "Wilddrawfour") return;
        setTimeout(continueExecution, waitTime());
    }

    this.humanColor = function(color) {
        addLogString(color + " was chosen to be the new color");
        this.currentColor = color;
        changeColorIndicator(color);
        setTimeout(continueExecution, waitTime());
    }

    this.checkPlayerCardsLeft = function(player) {
        if(player.hand.length == 1) {
            console.log(player.playerName + " has only one card left, UNO!");
            addLogString(player.playerName + " has only one card left, UNO!");
        }
        else if(player.hand.length == 0) {
            console.log(player.playerName + " played their last card and the round is over!");
            addLogString(player.playerName + " played their last card and the round is over!");
            points = this.scoreRound(player);
            this.roundOver = true;
            if(this.scoreToCheck < this.maxScore) {
                winRoundModal(player.playerName, points);
            }
            else {
                winGameModal(player.playerName, player.score);
            }
        }
    }

    this.humanDraw = function() {
        if(this.currentPlayerIndex != 2) {
            console.log("Wait your turn!");
            addLogString("Wait your turn!");
            return;
        }
        $("#drawPileCard").css("box-shadow", "0px 0px 0px");
        this.executeTurn();
        setTimeout(continueExecution, waitTime());
    }

    this.scoreRound = function(winningPlayer) {
        var points = 0;
        if(pointSystem) {
            console.log("Scoring...");
            for(var i = 0; i < this.players.length; i++) {
                var player = this.players[i];
                if(player.id == winningPlayer.id) continue;
                for(var j = 0; j < player.hand.length; j++) {
                    var card = player.hand[j];
                    if(card.specialType == "Wild" || card.specialType == "Wilddrawfour") {
                        points += 50;
                    }
                    else if(card.specialType != "") {
                        points += 20;
                    }
                    else {
                        points += card.number;
                    }
                }
            }
        }
        else {
            points = 1;
        }
        console.log("Points awarded: " + points);
        winningPlayer.addScore(points);
        currentGame.scoreToCheck = winningPlayer.score;
        return points;
    }

    this.makeIndex = function(index) {
        while(index > 3) index -= 4;
        while(index < 0) index += 4;
        return index;
    }

}

function addLogString(str){
    var logEntry = $("<li></li>").append("> "+str);
    $("#log-list").append(logEntry);
    $("#log-list").scrollTop($("#log-list")[0].scrollHeight);
}

function initDrag() {
  $('#p3cards > img').draggable( {
    containment: '#game-board',
    cursor: 'move',
    revert: true
  } );
}
function initDrop() {
    $("#discardPile").droppable( {
      accept: '#p3cards img',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
}

function handleCardDrop(event, ui) {
    console.log("card " + ui.draggable.attr("id") + " was dropped");
    // ui.draggable.draggable( 'disable' );
    // $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    // ui.draggable.draggable( 'option', 'revert', false );
    currentGame.humanPlay(Number(ui.draggable.attr("id")));

}
