//creates a new Angular module named "minesweeperModule"
const minesweeperModule = angular.module('minesweeperApp', []);

//creates the controller for the module
const minesweeperController = function($scope) {
	/*
	//creates a string variable named "test" that holds the text "this is fine"
	$scope.test = "This is fine."
	*/

	//adds the "createMinefield" function to our controller, and ties it to the variable "minefield"
	$scope.minefield = createMinefield();
}

//links the "minesweeperModule" module to the "minesweeperController" controller
minesweeperModule.controller("minesweeperController", minesweeperController);

//function for creating minefield board of the game. Starts by creating all the rows, then iterates through
//the collection of rows, then iterating through each row, creating each square in each row
function createMinefield() {
	//defines the minefield and it's collection of rows of squares, starting empty
	let minefield = {};
	minefield.rows = [];

	//initializes each row one at a time
	for (let y = 0; y < 9; y++) {
		//defines the current row
		let row = {};
		//defines the collection of squares, or "spots", in the current row
		row.spots = [];

		//initializes each square, or "spot", in the current row, one square at a time
		for (let x = 0; x < 9; x++) {
			let spot = {};
			//starts the current square off as covered, so the player can't see what's underneath
			spot.isCovered = true;
			//starts the current square off at empty
			spot.content = "empty";
			//pushes the current square square to the current row
			row.spots.push(spot);
		}
		//pushes the current row to the collection of rows in the minefield
		minefield.rows.push(row);
	}

	//returns the entire minefield once it's finished being created
	return minefield;
}