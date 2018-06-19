// console.log("Javascript is linked and working");

$(() => { //start of on ready function
  // console.log("jQuery is linked and working");

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

    }
    dealCardsPirate(){
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


  //function for hit
  const hit = () =>{
    console.log("i work");

    deck1.dealCardsPlayer();


    //use deck1.shift() to get the next card...
    //need to go back and deal one card. // create a method for dealing after initial deal?
    checkForWinner(); //check if 21 or above 21 (bust), but if it isn's 21 or above and they haven't chosen stand yet, then get out of check winner...
  }; //end of hit function

  //function for stay
  const stand = () => {
    console.log("i work too");
    //need to show the first pirate element
    $("#back-of-card").remove(); //remove the back of the card
    $("#pirate-cards").children("div:first").children().show(); //shows the first element once the stand button is clicked




    //if they are standing, then need to go check the dealers hand and determine if they need more cards...

    //if under 17... make a function here to checkDealersHand??

    checkForWinner();
  }; //end of stand function

  //create a check who won function
  const checkForWinner = () => {
    let playerCardValue = 0; //initial value of players cards starts at 0
    let pirateCardValue = 0; //initial value of pirate cards starts at 0
    //add the players cards
    for(let card of playerCards){ //go through each of the values from the player array and add it together to get the total player card value
      playerCardValue += card.value;
    }
      // console.log(playerCardValue); //logs the total player card value

    for(let card of pirateCards){ //go through each of teh values from the pirate array and add it together to get the total pirate card value
      pirateCardValue += card.value;
    }
      // console.log(pirateCardValue);

      //after dealing, check the two cards of the player to see if they are 21.
    if(playerCardValue > 21){
      console.log("BUST");

    } else if(pirateCardValue > 21){
      console.log("Player Wins");

    } else if(playerCardValue > pirateCardValue){
      console.log("Player Wins");

    } else {
      console.log("Dealer wins");

    }
      //if they are not,  wait for button click
      //if they click HIT, then deal another card and check again,

    //if they click STAY, then flip over the pirates card. Check if over 21 (bust, ...
    //need to check if the sum of the two cards is 21
  }; //end of winner function

  //when a new game is started, create a new deckOfCards and shuffle before playing.
  //order will be create deck, shuffle, then deal. Deal will only deal the beginning to start until a button is click.
  const deck1 = new deckOfCards();
  const start = () => {
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
    playerCards=[];
    pirateCards=[];
    $("#player-cards").children().remove();
    $("#pirate-cards").children().remove();
  }; //end of restart function

  //all of the onclick functions:
  $("#lets-play").on("click", start); //if start is clicked, run start function
  $("#hit").on("click", hit); //if the hit button is clicked, run the hit function
  $("#stand").on("click", stand); //if the stand button is clicked, run the stand function
  $("#restart").on("click", restart);




  //when you click Let's play button, deal in this order: 1 card facing up in player, 1 card face down in dealer, 1 card facing up in player, and 1 card face up in dealer


  //after first hand is dealt
  //first check if the player has 21 --->
  //if they don't have 21 -->
  //options for player:
  //HIT (if they click the hit button):
  //deal another card face up , then check if 21 again

  //STAND
  //flip over the dealers card , if less than 17, deal another one, check if over or above 17 .
  //check who is closer to 21.





}); //end of on ready function
