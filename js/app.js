$(() => { //start of on ready function
  let playerBoatPoints = 0;
  let pirateBoatPoints = 0;

  //status function to change the text in the paragraph depending on who won the hand
  const status = (status) => {
    switch(status){
      case "player":
        text = "YOU WON";
        break;
      case "player-blackjack":
        text="YOU GOT A BLACKJACK";
        break;
      case "pirate":
        text = "Pirate wins";
        break;
      case "push":
        text = "It's a push";
        break;
      case "bust":
        text = "You busted. Pirate wins";
        break;
    }
    $("#status").text(text);
  }

  const checkTotalPoints = () => { //check total points to see if they made it to the land yet
    if(playerBoatPoints >= 900){
      $("#status").text("PLAYER WINS IT ALL");
    }
    else if(pirateBoatPoints >= 900){
      $("#status").text("PIRATE WINS IT ALL");
    }
  }; //end of checking total points

  //create empty arrays for the player and pirates cards to be pushed to.
  let playerCards = [];
  let pirateCards = [];

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
      for(let i = this.deck.length - 1; i > 0; i--){ //let the starting value be the indices and go from the back to front
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
      //make sure there are enough cards to deal, if no more cards, make new deck and shuffle
      if(this.deck.length < 1) {
        newDeckofCards();
      };

      //when these are created , make a div and an image to put the proper one there.
      const $playerCardDiv = $("<div>").addClass("dealt-card");
      $("#player-cards").append($playerCardDiv);
      const currentPlayerCard = this.deck.shift();
      playerCards.push(currentPlayerCard);
      //need to figure out what image should be appended to the div
      //create image and then make this the src.
      const $image = $("<img>").attr("src", "images/cards/" + currentPlayerCard.face + currentPlayerCard.suit + ".png").addClass("card-images");
      $("#player-cards").children("div:last").append($image);
      // $(".dealt-card").append($image);

      if(playerCards[1] && (!playerCards[2])){ //if there is a second card out there
        //check if 21
        checkForBlackjack();
      } //else wait for the hit or stand buttons to be clicked
    }
    dealCardsPirate(){

      if(this.deck.length < 1) {
        newDeckofCards();
      }; //make sure there are enough cards to deal, if no more cards, make new deck and shuffle

      const $pirateCardsDiv = $("<div>").addClass("dealt-card");
      $("#pirate-cards").append($pirateCardsDiv);
      const currentPirateCard = this.deck.shift();
      pirateCards.push(currentPirateCard);//should be placed face down
      //make an if statment. if this is the first div then the image should be face down.

      //else face up.
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

  const newDeckofCards = () => { //create a new deck of cards
    deck1 = new deckOfCards();
    deck1.shuffle();
  };

  //function for hit
  const hit = () =>{
    deck1.dealCardsPlayer(); //give player another card
    checkForBust(); //check if above 21 (bust)
  }; //end of hit function

  //function for stay
  const stand = () => {
    checkForBust(); //make sure they don't have 2 Aces (this would be updated when Ace = 1 if functional)
    //need to show the first pirate element
    $("#back-of-card").remove(); //remove the back of the card
    $("#pirate-cards").children("div:first").children().show(); //shows the first element once the stand button is clicked

    //if they are standing, then need to go check the dealers hand and determine if they need more cards.
    pirateCardValue = 0;
    for(let card of pirateCards){ //go through each of the values from the pirate array and add it together to get the total pirate card value
      pirateCardValue += card.value;
    }
    //if under 17 need to give the pirate another card.
      if(pirateCardValue < 17){
        deck1.dealCardsPirate();
        pirateCardValue = 0;
        for(let card of pirateCards){ //go through each of teh values from the pirate array and add it together to get the total pirate card value
        pirateCardValue += card.value;
        }
          if(pirateCardValue < 17){
            deck1.dealCardsPirate();
            pirateCardValue = 0;
            for(let card of pirateCards){ //go through each of teh values from the pirate array and add it together to get the total pirate card value
            pirateCardValue += card.value;
            }

            if(pirateCardValue < 17){
              deck1.dealCardsPirate();
            }
            checkForWinner();
          }
          else {
            checkForWinner();
          }
        }
        else {
          checkForWinner();
        }
  }; //end of stand function

  //create a check who won function
  let playerCardValue = 0; //initial value of players cards starts at 0
  let pirateCardValue = 0; //initial value of pirate cards starts at 0

  const checkForBlackjack = () => {
    //blackjack is if the first 2 cards are an ACE and a face card
    if((playerCards[0].value === 11 && playerCards[1].value === 10) || (playerCards[1].value === 11 && playerCards[0].value === 10)){
      //need to check if pirate has blackjack
      $("#back-of-card").remove(); //remove the back of the card
      $("#pirate-cards").children("div:first").children().show(); //shows the first element once the stand button is clicked

      //if they are standing, then need to go check the dealers hand and determine if they need more cards...
      pirateCardValue = 0;
      for(let card of pirateCards){ //go through each of teh values from the pirate array and add it together to get the total pirate card value
        pirateCardValue += card.value;
      }
      //if under 17... make a function here to checkDealersHand?? and then give another card
      if(pirateCardValue === 21){
        status("push");
        // console.log("It's a PUSH. Nobody moves");
        // setTimeout(alertPush, 1000);
        $(".decision").hide();
      } else {
        status("player-blackjack");
        // console.log("You got a BlackJack!!");
        // console.log(pirateCardValue);
        // setTimeout(alertPlayerWinsHand, 2000);
        //NEED TO FREEZE HIT AND STAND BUTTONS - MUST PRESS DEAL ME IN TO DEAL AGAIN
        $(".decision").hide();
        playerBoatPoints += 150;
        $("#player-boat").css("transform", "translate(" + playerBoatPoints + "%)");
        $("#player-boat").css("transition-duration", "2s");
        $("#player-boat").css("transition-timing-function", "ease");
        checkTotalPoints();
        }
    }
  }; //end of check for blackjack

  const checkForBust = () => {
    playerCardValue = 0;
    for(let card of playerCards){ //go through each of the values from the player array and add it together to get the total player card value
      playerCardValue += card.value;
    }
    if(playerCardValue > 21){
      status("bust");
      // console.log("BUST");
      // setTimeout(alertPirateWinsHand, 2000);
      $(".decision").hide();
      pirateBoatPoints += 150;
      $("#pirate-boat").css("transform", "translate(" + pirateBoatPoints + "%)");
      $("#pirate-boat").css("transition-duration", "2s");
      $("#pirate-boat").css("transition-timing-function", "ease");
      checkTotalPoints();
    }
  }; //end of check for bust

  const checkForWinner = () => {
    playerCardValue = 0;
    pirateCardValue = 0;
    //add the players cards
    for(let card of playerCards){ //go through each of the values from the player array and add it together to get the total player card value
      playerCardValue += card.value;
    }
      // console.log(playerCardValue); //logs the total player card value

      //***I only want to add pirate cards once the player has hit stand
    for(let card of pirateCards){ //go through each of teh values from the pirate array and add it together to get the total pirate card value
      pirateCardValue += card.value;
    }
      // console.log(pirateCardValue);

      //after dealing, check the two cards of the player to see if they are 21.
    if(pirateCardValue > 21){
      status("player");
      // console.log("Player Wins");
      // setTimeout(alertPlayerWinsHand, 2000);
      $(".decision").hide();
      playerBoatPoints += 150;
      $("#player-boat").css("transform", "translate(" + playerBoatPoints + "%)");
      $("#player-boat").css("transition-duration", "2s");
      $("#player-boat").css("transition-timing-function", "ease");
      checkTotalPoints();

    } else if(playerCardValue > pirateCardValue){
      status("player");
      // console.log("Player Wins");
      // setTimeout(alertPlayerWinsHand, 2000);
      $(".decision").hide();
      playerBoatPoints += 150;
      $("#player-boat").css("transform", "translate(" + playerBoatPoints + "%)");
      $("#player-boat").css("transition-duration", "2s");
      $("#player-boat").css("transition-timing-function", "ease");
      checkTotalPoints();

    } else if(playerCardValue === pirateCardValue){
      status("push");
      // console.log("It's a PUSH. Nobody moves");
      // setTimeout(alertPush, 1000);
      $(".decision").hide();

    } else {
      status("pirate");
      // console.log("Dealer wins");
      // setTimeout(alertPirateWinsHand, 2000);
      $(".decision").hide();
      pirateBoatPoints += 150;
      $("#pirate-boat").css("transform", "translate(" + pirateBoatPoints + "%)");
      $("#pirate-boat").css("transition-duration", "2s");
      $("#pirate-boat").css("transition-timing-function", "ease");
      checkTotalPoints();

    }
      //if they are not,  wait for button click
      //if they click HIT, then deal another card and check again,

    //if they click STAY, then flip over the pirates card. Check if over 21 (bust, ...
    //need to check if the sum of the two cards is 21
  }; //end of winner function

  //when a new game is started, create a new deckOfCards and shuffle before playing.
  //order will be create deck, shuffle, then deal. Deal will only deal the beginning to start until a button is click.
  let deck1 = new deckOfCards();
  const start = () => {
    playerCards=[];
    pirateCards=[];
    $(".decision").show();
    $("#status").text("");


    $("#player-cards").children().remove();
    $("#pirate-cards").children().remove();

    deck1.shuffle();
    console.log(deck1.deck);
    deck1.dealCardsPlayer();
    deck1.dealCardsPirate();
    deck1.dealCardsPlayer();
    deck1.dealCardsPirate();
    //these are NOT working below:
    // setTimeout(deck1.dealCardsPirate, 500);
    // setTimeout(deck1.dealCardsPlayer, 1000);
    // setTimeout(deck1.dealCardsPirate, 2000);
    console.log(playerCards);
    console.log(pirateCards);
  }; //end of start function

  const restart = () => {
    const youSure = prompt("Are you sure you want to start over? This will clear everything", "yes/no");
    if(youSure === "yes"){
      playerCards=[];
      pirateCards=[];
      $("#player-cards").children().remove();
      $("#pirate-cards").children().remove();
      deck1 = new deckOfCards(); //restarting creates a fresh deck of cards

      //***NEED TO ADD A translate css function to move all boats back to the beginning. Possibly do a negative of whatever the player points is at. *****

      $("#player-boat").css("transform", "none");
      $("#pirate-boat").css("transform", "none");

      pirateBoatPoints = 0;
      playerBoatPoints = 0;

      $(".decision").hide();
    }
  }; //end of restart function

  $(".decision").hide();

  //Grabbing About the Game button
  const $openBtn = $("#openModal");
  //Grabbing the modal element
  const $modal = $("#modal");
  //Grabbing the close button
  const $closeBtn = $("#close");
  //Event Handlers
  const openModal = () => {
    $modal.css("display", "block");
    //could also use jquery .show()
  }
  const closeModal = () => {
    $modal.css("display", "none");
    //could also use jquery .hide()
  }


  //all of the onclick functions:
  $("#lets-play").on("click", start); //if start is clicked, run start function
  $("#hit").on("click", hit); //if the hit button is clicked, run the hit function
  $("#stand").on("click", stand); //if the stand button is clicked, run the stand function
  $("#restart").on("click", restart);
  $openBtn.on("click", openModal);
  $closeBtn.on("click", closeModal);








}); //end of on ready function
