// console.log("Javascript is linked and working");

$(() => { //start of on ready function
  // console.log("jQuery is linked and working");

//create empty arrays for the player and pirates cards to be pushed to.
const playerCards = [];
const pirateCards = [];

//create a deck of cards and make a shuffle function
class deckOfCards{ //class deck of cards
  constructor(){ //constructor is made of the suits and faces and an array of all of the cards
    this.deck = [];
    const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    const faces = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    let value; //create variable value
    let suit; //create variable suit
    let face; //create variable face

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
        this.deck.push(faces[f] + " of " + suits[s] + " , " + "Value of " + value);
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
  dealCards(){//deal the initial starting cards
    //when these are created , make a div and an image to put the proper one there.
    playerCards.push(this.deck[0]);
    pirateCards.push(this.deck[1]);//should be placed face down
    playerCards.push(this.deck[2]);
    pirateCards.push(this.deck[3]);
  }
  //create a deal cards method? to start the deal and lay cards in order into the different player and pirate areas.
  compareCards(){ //create a method to compare the cards
    //this is from an old javascript file -- need to remove this but use similar way to compare the sum of the cards and compare the player vs the dealer
    if(this.deck[0] === this.deck[this.deck.length-1]){
      console.log("These are the same! They are both " + this.deck[0]);
    } else if(this.deck[0] > this.deck[this.deck.length -1]){
      console.log(this.deck[0] + " is the larger card");
    } else {
      console.log(this.deck[this.deck.length-1] + " is the larger card");
    }
  }
}

//create a check who won function
const winner = () => {
  //after dealing, check the two cards of the player to see if they are 21.
  //if they are not,  wait for button click
  //if they click HIT, then deal another card and check again,

  //if they click STAY, then flip over the pirates card. Check if over 21 (bust, ...
)
  //need to check if the sum of the two cards is 21
}; //end of winner function

//when a new game is started, create a new deckOfCards and shuffle before playing.
//order will be create deck, shuffle, then deal. Deal will only deal the beginning to start until a button is click.
const start = () => {
  const deck1 = new deckOfCards();
  deck1.shuffle();
  console.log(deck1.deck);
  deck1.dealCards();
  console.log(playerCards);
  console.log(pirateCards);
}; //end of start function


//all of the onclick functions:
$("#lets-play").on("click", start);




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
