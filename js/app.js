$( () => {
  //modal 1 - HealthTrax
  const $openModal_1 = $('#project1');
  const $modal_1 = $('#modal_1');
  const $closeModal_1 = $('#close_1')
  //modal 2 - Whats that trailer
  const $openModal_2 = $('#project2');
  const $modal_2 = $('#modal_2');
  const $closeModal_2 = $('#close_2')
  //modal 3 - myMarket
  const $openModal_3 = $('#project3');
  const $modal_3 = $('#modal_3');
  const $closeModal_3 = $('#close_3')
  //modal 4 - blackjack
  const $openModal_4 = $('#project4');
  const $modal_4 = $('#modal_4');
  const $closeModal_4 = $('#close_4')

  //Event Handlers
  //modal 1 HealthTrax
  const $openModal_1Fnc = () => {
    $modal_1.css("display", "block");
  }
  const closeModal_1Fnc = () => {
    $modal_1.css("display", "none");
  }
  //modal 2 Whats that trailer
  const $openModal_2Fnc = () => {
    $modal_2.css("display", "block");
  }
  const closeModal_2Fnc = () => {
    $modal_2.css("display", "none");
  }
  //modal 3 myMarket
  const $openModal_3Fnc = () => {
    $modal_3.css("display", "block");
  }
  const closeModal_3Fnc = () => {
    $modal_3.css("display", "none");
  }
  //modal 4 BlackJack
  const $openModal_4Fnc = () => {
    $modal_4.css("display", "block");
  }
  const closeModal_4Fnc = () => {
    $modal_4.css("display", "none");
  }

  //event listeners
  //modal 1 HealthTrax
  $openModal_1.on("click", $openModal_1Fnc);
  $closeModal_1.on("click", closeModal_1Fnc);
  //modal 2 Whats that trailer
  $openModal_2.on("click", $openModal_2Fnc);
  $closeModal_2.on("click", closeModal_2Fnc);
  //modal 3 myMarket
  $openModal_3.on("click", $openModal_3Fnc);
  $closeModal_3.on("click", closeModal_3Fnc);
  //modal 4 blackjack
  $openModal_4.on("click", $openModal_4Fnc);
  $closeModal_4.on("click", closeModal_4Fnc);



}); // end of jquery
