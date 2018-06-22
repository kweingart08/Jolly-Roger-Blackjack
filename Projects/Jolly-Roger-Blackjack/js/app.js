$(() => { //start of on ready function
  //create a deck of cards and make a shuffle function
  class deckOfCards{ //class deck of cards
    constructor(){ //constructor is made of the suits and faces and an array of all of the cards
      this.deck = [];
      const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
      const faces = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

      let value; //create variable value
      let suit; //create variable suit
      let face; //create variable face
      let card = {};

      //for every suit, give it each face and determine the value of the card
      for(let s in suits){
        for(let f in faces){
          suit = suits[s];
          face = faces[f];
          if(face === "Jack" || face === "Queen" || face === "King"){
            value = 10;
          } else if(face === "Ace"){
            value = 11;
          } else {
            value = face;
          }
          //push the face, suit, and value of each card into the deck array
          // this.deck.push(faces[f] + " of " + suits[s] + " , " + "Value of " + value);
          card = {
            face: faces[f],
            suit: suits[s],
            value: value
          };
          this.deck.push(card);
        }
      }
    }
    shuffle(){ //create a method to shuffle the cards
      for(let i = this.deck.length - 1; i > 0; i--){ //let the starting value be the
        // indices and go from the back to front
        //create a randomIndex shuffle to the next index
        const randomIndex = Math.floor(Math.random()*(i+1));
        //determine what the item at that random index is
        const itemAtIndex = this.deck[randomIndex];

        //change the deck order to this new order
        this.deck[randomIndex] = this.deck[i];
        this.deck[i] = itemAtIndex;
      }
      //return the new deck array
      return this.deck;
    }
    dealCardsPlayer(){//deal the initial starting cards
      //when these are created , make a div and an image to put the proper one there.
      const $playerCardDiv = $("<div>").addClass("dealt-card");
      $("#player-cards").append($playerCardDiv);
      const currentPlayerCard = this.deck.shift();
      playerCards.push(currentPlayerCard);
      //need to figure out what image should be appended to the div
      //create image and then make this the src.
      const $image = $("<img>").attr("src", "images/cards/" + currentPlayerCard.face + currentPlayerCard.suit + ".png").addClass("card-images");
      $("#player-cards").children("div:last").append($image);
    }
    dealCardsPirate(){
      const $pirateCardsDiv = $("<div>").addClass("dealt-card");
      $("#pirate-cards").append($pirateCardsDiv);
      const currentPirateCard = this.deck.shift();
      pirateCards.push(currentPirateCard);//should be placed face down

      //image for pirate cards created tags and appending to the last chilrdren of pirate cards
      const $pirateImage = $("<img>").attr("src", "images/cards/" + currentPirateCard.face + currentPirateCard.suit + ".png").addClass("card-images"); //need to update this source
      $("#pirate-cards").children("div:last").append($pirateImage);

      if(!pirateCards[1]){ //if there isn't anything in the second element of the array, hide the first one. //show after the stand
        $pirateImage.hide();
        //show the back of the card
        const $backImage = $("<img>").attr("src", "images/cards/back-of-card.png").addClass("card-images").attr("id", "back-of-card");
        $pirateCardsDiv.append($backImage);
      }
    }
  }

  //initial variables
  let playerBoatPoints = 0;
  let pirateBoatPoints = 0;
  let playerCards = []; //empty array for player cards
  let pirateCards = []; //empty array for pirate cards
  let playerCardValue = 0; //initial value of players cards starts at 0
  let pirateCardValue = 0; //initial value of pirate cards starts at 0
  let deck1 = new deckOfCards(); //when starting a game, create deck of cards and shuffle
  deck1.shuffle();
  $(".decision").hide(); //don't show the decision button at the beginning.
  let playerAce;
  let pirateAce;

  //status function to change the text in the paragraph depending on who won the hand
  const status = (status) => {
    switch(status){
      case "player":
        text = "You won that hand, and your boat moves forward!";
        break;
      case "player-blackjack":
        text="WOOOHOO! YOU GOT A BLACKJACK, and your boat moves forward!";
        break;
      case "pirate":
        text = "Bummer. Pirate gets to move closer to land this time.";
        break;
      case "push":
        text = "The hands are the same. This is a push and no one advances.";
        break;
      case "bust":
        text = "Oh, shoot! You went over 21 and busted. Pirate wins this hand.";
        break;
    }
    $("#status").text(text);
  }

  const gameFunctions = {
    checkPlayerCards: () => {
      playerCardValue = 0;
      for(let card of playerCards){ //go through each of the values from the player array and add it together to get the total player card value
        playerCardValue += card.value;
      }
      return playerCardValue;
    }, //end of check player cards value

    checkPirateCards: () => {
      pirateCardValue = 0;
      for(let card of pirateCards){ //go through each of the values from the pirate array and add it together to get the total pirate card value
        pirateCardValue += card.value;
      }
      return pirateCardValue;
    }, //end of check pirate cards value

    checkIfPirateUnder17: () => {
      //if under 17 need to give the pirate another card.
      gameFunctions.checkPirateCards();
        while(pirateCardValue < 17){
          gameFunctions.checkDeckOfCardsLength();
          deck1.dealCardsPirate();
          gameFunctions.checkPirateCards();
        }
      return pirateCardValue;
    },

    showPirateCards: () => {
      $("#back-of-card").remove(); //remove the back of the card
      $("#pirate-cards").children("div:first").children().show(); //shows the first element once the stand button is clicked
    }, //end of show pirate cards function

    checkDeckOfCardsLength: () => {
      if(deck1.deck.length < 1) {
        gameFunctions.newDeckofCards();
      }
    },

    newDeckofCards: () => { //create a new deck of cards
        deck1 = new deckOfCards();
        deck1.shuffle();
    }, //end of check deck of cards length

    endOfHand: () => {
      $(".decision").hide();
      $("#lets-play").show();
    }, //end of endof hand function

    addPlayerPoints: () => {
      playerBoatPoints += 80;
      $("#player-boat").css("transform", "translate(" + playerBoatPoints + "%)");
      $("#player-boat").css("transition-duration", "2s");
      $("#player-boat").css("transition-timing-function", "ease");
    }, //end of add player points function for each hand

    addPiratePoints: () => {
      pirateBoatPoints += 80;
      $("#pirate-boat").css("transform", "translate(" + pirateBoatPoints + "%)");
      $("#pirate-boat").css("transition-duration", "2s");
      $("#pirate-boat").css("transition-timing-function", "ease");
    }, //end of add pirate points for each hand

    checkTotalPoints: () => {
      if(playerBoatPoints >= 640){
        $("#status").text("Yay! You made it to land before the Pirates. YOU WIN! Go warn the townspeople!");
        eventHandlers.playAgain();
      }
      else if(pirateBoatPoints >= 640){
        $("#status").text("Oh No! The pirate made it to land first. YOU LOSE!");
        eventHandlers.playAgain();
      }
    }, //end of checking total points for final winner

    checkForBlackjack: () => {
      if((playerCards[0].value === 11 && playerCards[1].value === 10) || (playerCards[1].value === 11 && playerCards[0].value === 10)){

        //need to check if pirate has blackjack
        gameFunctions.showPirateCards();
        gameFunctions.checkPirateCards();

          if(pirateCardValue === 21){
          status("push");
          gameFunctions.endOfHand();
          }
          else {
          status("player-blackjack");
          gameFunctions.endOfHand();
          gameFunctions.addPlayerPoints();
          gameFunctions.checkTotalPoints();
          }
      }
    }, //end of check for black jack function

    checkForBust: () => {
      gameFunctions.checkPlayerCards();
      if(playerCardValue > 21){
        //if above 21, check for ace.
        // playerAce = playerCards.some(gameFunctions.checkForAce);
        playerAce = playerCards.some(x => x.value > 10); //find if some of the values are greater than 10

        if(playerAce === false){
          //if no ace, then bust
          status("bust");
          gameFunctions.endOfHand();
          gameFunctions.addPiratePoints();
          gameFunctions.checkTotalPoints();
        }
        else if(playerAce === true){
          // find the first card that has a value greater than 10
          const findCard = playerCards.find(x => x.value > 10);
          console.log(findCard);
          findCard.value = 1;
          console.log(playerCards);
        }
      }
    }, //end of check for bust function

    checkForWinner: () => {
      gameFunctions.checkPlayerCards();
      gameFunctions.checkPirateCards();

      if(pirateCardValue > 21){
        //need to check if any cards are aces
        pirateAce = pirateCards.some(x => x.value >10);
        if(pirateAce === false){
          status("player");
          gameFunctions.endOfHand();
          gameFunctions.addPlayerPoints();
          gameFunctions.checkTotalPoints();
        }
        //if they have an ace, change it to a 1 and check if they are under 17 then recheck for winner
        else if(pirateAce === true){
          const cardAce = pirateCards.find(x => x.value >10);
          cardAce.value = 1;
          gameFunctions.checkIfPirateUnder17();
          gameFunctions.checkForWinner();
        }
      }
      else if(playerCardValue > pirateCardValue){
        status("player");
        gameFunctions.endOfHand();
        gameFunctions.addPlayerPoints();
        gameFunctions.checkTotalPoints();
      }
      else if(playerCardValue === pirateCardValue){
        status("push");
        gameFunctions.endOfHand();

      }
      else {
        status("pirate");
        gameFunctions.endOfHand();
        gameFunctions.addPiratePoints();
        gameFunctions.checkTotalPoints();
      }
    } //end of check for winner function
  }; //end of gameFunctions


  const eventHandlers = {
    start: () => {
    if(deck1.deck.length < 4) {//make sure there are enough cards to deal
    gameFunctions.newDeckofCards();
    deck1.shuffle();
    };
    playerCards=[];
    pirateCards=[];
    $(".decision").show();
    $("#status").text("");

    $("#player-cards").children().remove();
    $("#pirate-cards").children().remove();

    deck1.dealCardsPlayer();
    deck1.dealCardsPirate();
    deck1.dealCardsPlayer();
    deck1.dealCardsPirate();

    $("#lets-play").hide();
    gameFunctions.checkForBlackjack();
    }, //end of start method

    hit: () => {
      gameFunctions.checkDeckOfCardsLength();
      deck1.dealCardsPlayer(); //give player another card
      gameFunctions.checkForBust(); //check if above 21 (bust)
    }, //end of hit method

    stand: () => {
      //need to show the first pirate element
      gameFunctions.showPirateCards();
      //if they are standing, then need to go check the dealers hand and determine if they need more cards.
      gameFunctions.checkIfPirateUnder17();
      gameFunctions.checkForWinner();
    }, //end of stand method

    restart: () => {
      if($("#restart").text() === "Start Over"){
        const youSure = prompt("Are you sure you want to start over? This will clear everything", "yes/no");
        if(youSure === "no"){
          return;
        }
        else if(youSure === "yes"){
          eventHandlers.startOver();
        }
      }

      else if($("#restart").text() === "Play Again") {
        eventHandlers.startOver();
      }
    }, //end of restart method

    startOver: () => {

      playerCards=[];
      pirateCards=[];
      deck1 = new deckOfCards(); //restarting creates a fresh deck of cards
      deck1.shuffle();
      console.log(deckOfCards);

      $("#player-boat").css("transform", "none");
      $("#pirate-boat").css("transform", "none");

      $("#player-cards").children().remove();
      $("#pirate-cards").children().remove();

      pirateBoatPoints = 0;
      playerBoatPoints = 0;

      $(".decision").hide();
      $("#lets-play").show();
      $("#status").text("");
      $("#restart").text("Start Over");
    }, //end of start over method

    playAgain: () => {
      $("#restart").text("Play Again");
      $("#lets-play").hide();
    }
  }; //end of event Handlers

  //MODAL BUTTONS
  //Grabbing About the Game button
  const $openBtn = $("#openModal");
  //Grabbing the modal element
  const $modal = $("#modal");
  //Grabbing the close button
  const $closeBtn = $("#close");

  const modalEventHandlers = {
    openModal: () => {
      $modal.css("display", "block");
    },
    closeModal: () => {
      $modal.css("display", "none");
    }
  }; //end of modal event Handlers


  //all of the onclick functions:
  $("#lets-play").on("click", eventHandlers.start); //if start is clicked, run start function
  $("#hit").on("click", eventHandlers.hit); //if the hit button is clicked, run the hit function
  $("#stand").on("click", eventHandlers.stand); //if the stand button is clicked, run the stand function
  $("#restart").on("click", eventHandlers.restart);
  $openBtn.on("click", modalEventHandlers.openModal);
  $closeBtn.on("click", modalEventHandlers.closeModal);

}); //end of on ready function
