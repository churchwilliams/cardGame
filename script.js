$(document).ready(function() {

	//populates the deck array with all 52 cards sequentially
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}

	//SHUFFLES whatever array you pass as an argument (the 'deck' array in our case)
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		array.splice(i,1); 
		 		n--; 
		 	} 
		} 
		return copy; 
	}

	//converts individual 11 - 13 value cards into a STRING value. Used in ADVANCE function
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck ('shuffledDeck' in my case) variable

	var shuffledDeck = shuffle(deck);
	
	var cards_player_1 = [];
	var cards_player_2 = [];

	
	// step 2 write a function called deal that will evenly divide the deck up between the two players
	var deal = function() {
		cards_player_1 = shuffledDeck.slice(0, 26);
		cards_player_2 = shuffledDeck.slice(26-52);
	};
	deal();
	
	// step 3 create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(card1, card2){
		if (card1.number === card2.number) {
			cards_player_1.push(cards_player_1[0]);
			cards_player_2.push(cards_player_2[0]);
			cards_player_1.splice(0,1);
			cards_player_2.splice(0,1);
			console.log('it was a tie!');
		}
		else if (card1.number > card2.number){
			cards_player_1.push(card1, card2);
			cards_player_1.splice(0,1);
			cards_player_2.splice(0,1);
			console.log( "Card one with the value of " + convert_value_to_string(card1.number) + " " + card1.suit + " is the winner!");
		}
		else {
			cards_player_2.push(card1, card2);
			cards_player_1.splice(0,1);
			cards_player_2.splice(0,1);
			console.log("Card two with the value of " + convert_value_to_string(card2.number) + " " + card2.suit + " is the winner!");
		}
	}

	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length && cards_player_2.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function(){
		war(cards_player_1[0],cards_player_2[0]);
		//this function (defined below) will continue to the next turn
		advance();
	}
	

	advance();
	
	$(".btn").click(function() {
		play();
	});
});
