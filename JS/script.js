//creates a new Angular module named "minesweeperModule"
const minesweeperModule = angular.module('minesweeperApp', []);

//creates the controller for the module
const minesweeperController = function($scope)
{
	/*
	//creates a string variable named "test" that holds the text "this is fine"
	$scope.test = "This is fine."
	*/

	//adds the "createMinefield" function to our controller, and ties it to the variable "minefield"
	$scope.minefield = createMinefield();
	//adds the "uncoverSpot" function to our controller's scope, which checks if the user has uncovered a mine
	$scope.uncoverSpot = function(spot)
	{
		//changes the spot to not be covered
		spot.isCovered = false;

		//if the spot contains a mine, determines that the player has lost
		if (spot.content == "mine")
		{
			$scope.hasLostMessageVisible = true;
		}
		else
		{
			//calls the "hasWon" function, passing in the minefield game board, and if "hasWon"
			//returns true, determines that the player has won
			if (hasWon($scope.minefield))
			{
				$scope.isWinMessageVisible = true;
			}
		}
	}
}

//links the "minesweeperModule" module to the "minesweeperController" controller
minesweeperModule.controller("minesweeperController", minesweeperController);

//function for creating minefield board of the game. Starts by creating all the rows, then iterates through
//the collection of rows, then iterating through each row, creating each square in each row
function createMinefield()
{
	//defines the minefield and it's collection of rows of squares, starting empty
	let minefield = {};
	minefield.rows = [];

	//initializes each row one at a time
	for (let y = 0; y < 9; y++)
	{
		//defines the current row
		let row = {};
		//defines the collection of squares, or "spots", in the current row
		row.spots = [];

		//initializes each square, or "spot", in the current row, one square at a time
		for (let x = 0; x < 9; x++)
		{
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
	//calls the function to randomly place 10 mines in the minefield
	placeRandomMines(minefield);
	//calls the function to calculate the number of nearby mines for all spots in the minefield
	calculateAllNumbers(minefield);
	//returns the entire minefield once it's finished being created
	return minefield;
}


//function to gather information about a specific square/spot
function getSpot(minefield, row, column)
{
	//returns the specific row and spot number of the chosen spot in the minefield
	return minefield.rows[row].spots[column];
}

//adds mines to random spots in the minefield
function placeRandomMines(minefield)
{
	//uses a "for" loop to choose 10 random spots to place mines in
	for (let i = 0; i < 10; i++)
	{
		//chooses a random row number
		let row = Math.round(Math.random() * 8);
		//chooses a random spot number
		let column = Math.round(Math.random() * 8);
		//grabs the specific spot at that row and spot number
		let spot = getSpot(minefield, row, column);
		//puts a mine in that spot
		spot.content = "mine";
	}
}

//function for calculating the number of mines near the chosen square/spot
function calculateNumber(minefield, row, column) {
	//gets the current spot in the minefield
	let thisSpot = getSpot(minefield, row, column);

	//if this spot contains a mine, we can't place a number here
	if (thisSpot.content == "mine")
	{
		return;
	}

	//starts the variable for holding the number of nearby mines at 0
	let mineCount = 0;

	//checks if this is not the first row of the minefield
	if (row > 0)
	{
		//checks if this is not the first column of the minefield
		if (column > 0)
		{
			//gets the spot 1 above and to the left of the current spot
			let spot = getSpot(minefield, row - 1, column - 1);
			//if that nearby spot has a mine in it, increment "mineCount" by 1
			if (spot.content == "mine")
			{
				mineCount++;
			}
		}

		//gets the spot 1 above the current spot
		let spot = getSpot(minefield, row - 1, column);
		//if that nearby spot has a mine in it, increment "mineCount" by 1
		if (spot.content == "mine")
		{
			mineCount++;
		}

		//checks if this is not the last column of the minefield
		if (column < 8)
		{
			//gets the spot 1 above and to the right of the current spot
			let spot = getSpot(minefield, row - 1, column + 1);
			//if that nearby spot has a mine in it, increment "mineCount" by 1
			if (spot.content == "mine")
			{
				mineCount++;
			}
		}
	}

	//checks if this is not the first column of the minefied
	if (column > 0)
	{
		//gets the spot 1 to the left of the current spot
		let spot = getSpot(minefield, row, column - 1);
		//if that nearby spot has a mine in it, increment "mineCount" by 1
		if (spot.content == "mine")
		{
			mineCount++;
		}
	}

	//checks if this is not the last column of the minefield
	if (column < 8)
	{
		//gets the spot 1 to the right of the current spot
		let spot = getSpot(minefield, row, column + 1);
		//if that nearby spot has a mine in it, increment "mineCount" by 1
		if (spot.content == "mine")
		{
			mineCount++;
		}
	}

	//checks if this is not the last row of the minefield
	if (row < 8)
	{
		//checks if this is not the first column of the minefield
		if (column > 0)
		{
			//gets the spot 1 below and to the left of the current spot
			let spot = getSpot(minefield, row + 1, column - 1);
			//if that nearby spot has a mine in it, increment "mineCount" by 1
			if (spot.content == "mine")
			{
				mineCount++;
			}
		}

		//gets the spot 1 below the current spot
		let spot = getSpot(minefield, row + 1, column);
		//if that nearby spot has a mine in it, increment "mineCount" by 1
		if (spot.content == "mine")
		{
			mineCount++;
		}

		if (column < 8)
		{
			//gets the spot 1 below and to the right of the current spot
			let spot = getSpot(minefield, row + 1, column + 1);
			//if that nearby spot has a mine in it, increment "mineCount" by 1
			if (spot.content == "mine")
			{
				mineCount++;
			}
		}
	}

	//if the number of nearby mines is greater than 0, display that number of nearby mines to the chosen spot
	if (mineCount > 0)
	{
		thisSpot.content = mineCount;
	}
}

//function to calculate the number of nearby mines for all spots in the minefield
function calculateAllNumbers(minefield)
{
	//iterates through the columns of the minefield
	for (let y = 0; y < 9; y++)
	{
		//iterates through the minefield
		for (let x = 0; x < 9; x++)
		{
			//calculate the number of mines that are near the current spot in this row and column
			calculateNumber(minefield, x, y);
		}
	}
}

//function to determine if the play has won or lost. Does this by checking each remaining covered spot to see if they
//only contain mines. If the remaining covered spots only contain mines, then that means the player has successfully
//chosen all non-mine spots, meaning they won. Returns false if they lose, true if they won.
function hasWon(minefield) {
	//iterates through the columns of the minefield
	for (let y = 0; y < 9; y++)
	{
		//iterates through the rows of the minefield
		for (let x = 0; x < 9; x++)
		{
			//gets the spot in the minefield at the current row (x) and column (y)
			let spot = getSpot(minefield, x, y);
			//if there are remaining covered spots that are not mines, that means the player has lost,
			//so it returns false
			if (spot.isCovered && spot.content != "mine")
			{
				return false;
			}
		}
	}

	//otherwise, the player wins, so it returns true
	return true;
}