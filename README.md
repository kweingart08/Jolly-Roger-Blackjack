# Jolly-Roger-Blackjack
  Jolly-Roger-Blackjack is the game of blackjack with a twist. This game has one player versus the computer, and the goal of the game is to get your boat to the land before the pirate gets there in order to warn the townspeople that they are coming. The way to advance your boat is by winning a hand of blackjack.
## Getting Started
  These instructions within getting started will present any installation needed, and technologies used to create the game.
### Installation Instructions
  In Order to Play the game:

    Google Chrome - [https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwma3ZBRBwEiwA-CsblPyvpR22B4RBmScNdFsqzR9hq_NR4nT8yE9sKUWpPhPRTU6JPPvV-RoCpfMQAvD_BwE&gclsrc=aw.ds&dclid=CNiA3IWs5dsCFQ4EaQodm50Pyw]


  In Order to Re-produce or continue Coding:

    Atom - [https://atom.io/]
### Technologies Used
  Technologies Used While Building the Game:

    Atom:
      - HTML was used to build the framework of the page.
      - CSS was used to style the initial page.
      - Javascript & jQuery were used for the game functionality and DOM manipulation.

## Development
  These development notes will describe the approach that was taken when building the game as well as some of the unsolved problems.

### Approach Taken
  First, a wireframe for the game was sketched-up, and then from that the HTML page came alive to set a visual for what was happening. The initial CSS was created using mostly Flexbox to align the items in their divs.
  Javascript and jQuery were used for the actual game logic and functionality.
  The code follows this order:

  - Create the deck of cards and the methods that can happen using the deck of cards (shuffle, deal, etc.).
  - Declare / Initialize the variables that are needed at the start and will be needed within multiple functions.
  - Declare a function that will be used to determine what text will be presented on screen depending on the win/lose status.
  - Create an object that will hold all game functions/methods that will be needed multiple times throughout the code. This includes checking the value of the player or pirates cards, making sure the deck has enough cards to deal and if not creating a new deck, moving the player and pirate boats and adding points, and checking for blackjacks, busts, and winners.
  - Create an object that will hold all of the event handlers for the game. This will be anything we have a button for. This includes clicking the deal button, hit button, stand button, start over, etc.
  - Create variables and an event handler object for the modal that is presented with the instructions at the beginning of the page load.
  - Find all the buttons and put on click functions with the appropriate event handler to run.
### Unsolved Problems / Additional Items Not Added
  There were a few items that were unsolved or that I didn't get to adding yet:

  - There is no logic for splitting cards like the actual game of blackjack. There is room here to add that logic and possibly double the distance that the boat moves.
  - I wanted to add in some obstacles such as wind that would be randomly generated and then randomly see if the boats were able to move their sails in the right direction to either move forward or back. This is an additional item that may be added later.

## Link to Live Site
  Here is the link to the live site so you can play the game!
  [https://kweingart08.github.io/]
