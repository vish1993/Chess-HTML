/*
Name: Visaahan Anandarajah
Date: January 25, 2013
Purpose: To create a board class and functions that help create/update the board
*/
 var board = {};
(function ($) {
   
 
    /*board.createBoard is used to create an 8x8 table, set the grid ID of each cell (ie A1) 
          and set whether the cells are occupied by the pieces or not*/
    board.createBoard = (function () {
    
        var cellID = "";
        var gameboard = document.getElementById ("gameBoard");
		
        for (var i=0; i < 8; i++)
        {
            var row = gameboard.insertRow(i);
		
            //adds appropriate classes (grid coordinates & occupation status) to each cell
            //first 2 rows (row 0 and 1) are white and last 2 rows (row 7 and 8) are black therefore initialized to be occupied
            for (var j =0; j< 8;j++)
            {
                cellID += getLetter(j) + i;
                var cell = row.insertCell(j);
                            
                if (i == 0 || i == 1 || i == 7 || i == 6)
                {
                    cell.className= ""+cellID+" occupied";
                }
                            
                else
                {
                    cell.className= ""+cellID;
                }
                            
                cellID="";
            }
		
            cellID = "";
        }
        board.paint();
        board.updateBoard();
        
    });

    /*board.paint is used to set the background color of the cell*/
    board.paint = (function () {
        var cell;
        for (var i =0; i < 8; i++)
        {
            for (var j=0; j <8; j++)
            {
                cell = getLetter(i);
                cell+=j;

                //if statements used for the criss-cross colouring effect
                if (i%2 == 0)
                {
                    if (j%2 == 0)
                    {
                        $("."+cell).css ("background-color", "#d2b48c");
                    }
				
                    else
                    {
                        $("."+cell).css ("background-color", "#695a46");
                    }				
                }	
                            
                else
                {
                    if (j%2 == 1)
                    {
                        $("."+cell).css ("background-color", "#d2b48c");
                    }
				
                    else
                    {
                        $("."+cell).css ("background-color", "#695a46");
                    }
                }
                            
                cell="";				
            }
        }
    });

    
    //board.updateBoard is used to paint the pieces accordingly after each move
    //might move update function in ChessAttempt.html to here to make the ultimate board Updater
    board.updateBoard = (function () {
        //reset the squares (board cell)
        for (var i =0; i < 8; i++)
        {
            for (var j=0; j <8; j++)
            {
                var cell = getLetter(i);
                cell+=j;
                $("." + cell).html ("&nbsp");
            }
        }
		
        //put the appropriate pic of the piece on the appropriate square
        /**IDEA: Try and change this to repaint only one pic since call this often and improve efficiency **/
        for (var i=0; i <chess.pieces.length; i++)
        {	
            var state = chess.pieces[i].state;
            var type = chess.pieces[i].type;
            var colour = chess.pieces[i].colour;
            var location = chess.pieces[i].location;
            var cellclass ="";
			
            if (state == "alive")
            {
                if (colour == "White")
                {
                    cellclass += "w_";
                }
			
                else
                {
                    cellclass += "b_";
                }
			
                cellclass += type;
                $("." + location).html ("<img class= \"piece\" src=\"Pieces\\" + cellclass + ".png\" />");	
				$("."+location).attr ("class", "" + location + " occupied");				
            }
        }
    });
})(jQuery)