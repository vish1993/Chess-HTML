//Name: Visaahan Anandarajah
//Date: January 24, 2013
//Purpose: To implement the move functions for all the pieces

//Note: maybe take a look into classical inheritance vs prototypal inheritance

(function ($,chess)
{
    
    //This function acts as a wrapper function
    //Based on which cell was clicked, determines if object is there, what type of object and determines move based of that
    chess.move = (function(object)
    {
		//check if cell selected has a piece
        if ($("."+object.location).hasClass("occupied"))
        {
			//Note: all moves array declared in all functions keep track of all the moves in order to check if a checkmate has occured
			var moves = new Array();
			
            var type = object.type;
            var color = object.colour;
                
            var tmpcolor = checkcolour();
			
            //to ensure right colour's move
			if (tmpcolor == color)
            {
				//each piece has a specific move function. Coordinate each move function to the appropriate piece
                if (type == "Pawn")
                {
                    moves = Pawnmove (object);
                }
                if (type == "Rook")
                {
                    moves = Rookmove (object);
                }
			
                if (type == "Knight")
                {
                    moves = Knightmove (object);
                }
			
                if (type == "Bishop")
                {
                    moves = Bishopmove (object);
                }
				
				//not separate move function (just combine rook + bishop)
				if (type == "Queen")
				{
					moves = Rookmove (object);
					moves.concat (Bishopmove (object));
				}
                if (type == "King")
                {
                    moves = Kingmove (object);
                }
            }
		
            else
            {
                $(".update").html ("ERROR: " + tmpcolor + "'s turn");
            }
        }
		return moves;
    });

    //Used to determine which colour's move it is
    function checkcolour ()
    {
        if (count%2 == 0)
        {
            return "White";
        }
        else
        {
            return "Black";
        }
    }

	//if pawn moves
    function Pawnmove(object)
    {        
     
		//stores move for checkmate
		var moves = new Array();
		
		//gets the location of pawn
		var x = object.location[0];
        var y = parseInt(object.location[1]);

		//depending on colour (move up/down by 1 space)
        if (object.colour == "Black")
        {
            y = y + 1;
        }
        else
        {
            y = y - 1;
        }
        
        
        var possibleMove = x+y;

		//if valid move (empty cell)
        if (!($("."+possibleMove).hasClass("occupied")))
        {
			moves.push (possibleMove); 
			$("."+possibleMove).css ("background-color","yellow");
        
			//if hasn't moved beforehand (ie can move 2 spaces)
			if (object.moved == "no")
			{
				if (object.colour == "Black")
				{
					y = y + 1;
				}
				else
				{
					y = y - 1;
				}
				
				possibleMove = x + y;
				if (!($("."+possibleMove).hasClass("occupied")))
				{
					moves.push (possibleMove);
					$("."+possibleMove).css ("background-color","yellow");
				}
			}
		}
        
		//to get the coordinates for diagonal moving (in position to kill a piece)
        if (object.colour == "Black")
        {
            y = parseInt(object.location[1]) + 1;
        }
        else
        {
            y = parseInt(object.location[1]) - 1;
        }
        
		//diagonal killing to the right
        x = getLetter (getNumber (object.location[0]) + 1);
        possibleMove = x + y;

		//check if that diagonal space is occupied by a piece of another colour
        if ($("."+possibleMove).hasClass("occupied") )
        {
            var tmpobj = chess.search(possibleMove);
            if ($("."+possibleMove).hasClass("occupied") && tmpobj.colour != obj.colour)
            {
				moves.push (possibleMove);
                $("."+possibleMove).css ("background-color","yellow");
            }
        }
		
		//diagonal killing to the left
        x = getLetter (getNumber (object.location[0]) - 1);
        possibleMove = x + y;
		
        if ($("."+possibleMove).hasClass("occupied") )
        {
            var tmpobj = chess.search(possibleMove);
            if ($("."+possibleMove).hasClass("occupied") && tmpobj.colour != obj.colour)
            {
				moves.push (possibleMove);
                $("."+possibleMove).css ("background-color","yellow");
            }
        } 
		return moves;
    }

	//rook move - this function is used as a wrapper function to cover moving left, right, up and down
    function Rookmove (object)
    {
		var moves = new Array();
        var location = object.location;
        var x = getNumber (object.location[0]);
		
		//helper to move up
        Rookhelper (x,8, location, "up",moves);
		
		//helper to move down (thus usage of negative #'s
        x = x * -1;
        Rookhelper (x,1,location,"up",moves);
		
		//helper to move left
        var y = parseInt(object.location[1]);
        Rookhelper (y,8,location,"left",moves);
        
		//helper to move right using negative #'s
		y = y * -1;
        Rookhelper (y,1,location,"left",moves);
		return moves;
    }

	//helper function
    function Rookhelper (start,end,cell,move, moves_arr)
    {	
		//from where rook is to where it can possibly go
        for (var i = start; i < end; i++)
        {
            var tmp;
            var j = i;
			
			//to convert from positive to negative (move in opposite direction)
            if ( j < 0)
            {
                j = j * -1;
            }
		
			//if move up, change x while keeping y
            if (move == "up")
            {
                tmp = getLetter(j);
                tmp += cell[1];
            }
		
			//if move left, change y while keeping x
            else
            {
                tmp= cell[0];
                tmp += j;
            }
			
			//if not occupied
            if ((!$("."+tmp).hasClass ("occupied")) && tmp != obj.location)
            {
				moves_arr.push (tmp);
                $("."+tmp).css ("background-color", "yellow");
            }
		
			//if is occupied (ie. stop rook movement)
            else if ($("."+tmp).hasClass ("occupied") && tmp != obj.location)
            { 
                var tmpobj = chess.search(tmp);
				
				//if can kill piece
                if (tmpobj.colour != obj.colour)
                {
					moves_arr.push (tmp);
                    $("."+tmp).css ("background-color","yellow");
                }				
                break;
            }
        }
    }
	
	//function to get movement of knight
    function Knightmove (object)
    {
		var moves = new Array();
		
		//8 possible cases for knight to move
        for (var i = 0; i < 8 ; i++)
        {
			//get knight's location
            var x= getNumber(object.location[0]);
            var y= parseInt(object.location[1]);
            var tmp;

			//all possible cases listed
            switch (i)
            {
                case 0:
                    x = x + 1;
                    y = y - 2;
                    break;
                case 1:
                    x = x + 2;
                    y = y - 1;
                    break;
                case 2:
                    x = x + 2;
                    y = y + 1;
                    break;
                case 3:
                    x = x + 1;
                    y = y + 2;
                    break;
                case 4:
                    x = x - 1;
                    y = y + 2;
                    break;
                case 5:
                    x = x - 2;
                    y = y + 1;
                    break;
                case 6:
                    x = x - 2;
                    y = y - 1;
                    break;
                case 7:
                    x = x - 1;
                    y = y - 2;
                    break;
            }	
			//check if it is a valid move (ie within realms of the board)
            if (x >= 0 && y >= 0 && x < 8 && y < 8)
            {
                tmp = getLetter (x);
                tmp += y;
                var tmpobj = chess.search (tmp);
				
				//if not occupied (ie empty cell and can move)
                if (!$("." + tmp).hasClass ("occupied"))
                {
					moves.push (tmp);
                    $("."+ tmp).css ("background-color", "yellow");
                }		
				
				//in kill position
                if ($("." + tmp).hasClass ("occupied") && tmpobj.colour != obj.colour )
                {
					moves.push (tmp);
                    $("."+ tmp).css ("background-color", "yellow");
                }
            }				
        }
		return moves;
    }	

	//for bishop moving - similar to rook is a wrapper function to move in all 4 possible directions
    function Bishopmove (object)
    {
		//note start implies moving up or right depending if its on x or y parameter
		//end implies moving down or left depending on if its on x or y parameter
		var moves = new Array();
        var location = object.location; 
        Bishophelper (location, "start", "start", moves);
        Bishophelper (location, "start", "end", moves);
        Bishophelper (location, "end", "start",moves);
        Bishophelper (location, "end", "end",moves);
		return moves;
    }

	//helper function
    function Bishophelper (cell, x, y, moves_arr)
    {
		//get location
        var tmp;
        var tmp1 = getNumber(cell[0]);
        var tmp2 = parseInt (cell[1]);

		//valid move
        while (tmp1 >= 0 && tmp1 < 8 && tmp2 >= 0 && tmp2 < 8)
        {	
			//move up
            if (x == "start")
            {
                tmp1++;
            }
			
			//move down
            else if (x == "end")
            {
                tmp1--;
            }
	
			//move right
            if (y == "start")
            {
                tmp2++;
            }
	
			//move left
            else if (y == "end")
            {
                tmp2--;
            }
			
            tmp = getLetter (tmp1);
            tmp += tmp2;
            var tmpobj = chess.search (tmp);
            
			//if empty sell valid move
			if (!($("." + tmp).hasClass ("occupied")))
            {
				moves_arr.push (tmp);
                $("."+ tmp).css ("background-color", "yellow");
            }
			
			//if in kill position
            else if ($("." + tmp).hasClass ("occupied") && tmpobj.colour != obj.colour )
            {
				moves_arr.push (tmp);
                $("."+ tmp).css ("background-color", "yellow");
                break;
            }
			
			//not a valid move
            else if ($("." + tmp).hasClass ("occupied") && tmpobj.colour == obj.colour )
            {
                break;
            }				
        }
    }

	//function to check if king can move
    function Kingmove (object)
    {
		var moves = new Array(); 
		
		//8 possible moves (8 surrounding cells to move to)
        for (var i = 0; i < 8 ; i++)
        {
			//king location of king
            var x= getNumber(object.location[0]);
            var y= parseInt (object.location[1]);
            var tmp;

			//get all possible cases
            switch (i)
            {
                case 0:
                    x = x + 1;
                    y = y + 1;
                    break;
                case 1:
                    x = x + 1;
                    y = y ;
                    break;
                case 2:
                    x = x + 1;
                    y = y - 1;
                    break;
                case 3:
                    x = x ;
                    y = y - 1;
                    break;
                case 4:
                    x = x ;
                    y = y + 1;
                    break;
                case 5:
                    x = x - 1;
                    y = y + 1;
                    break;
                case 6:
                    x = x - 1;
                    y = y;
                    break;
                case 7:
                    x = x - 1;
                    y = y - 1;
                    break;
            }	
			
			//if within realms of board
            if (x >= 0 && y >= 0 && x < 8 && y < 8)
            {
                tmp = getLetter (x);
                tmp += y;
                var tmpobj = chess.search (tmp);
				
				//if valid move
                if (!$("." + tmp).hasClass ("occupied"))
                {
                    moves.push (tmp);
					$("."+ tmp).css ("background-color", "yellow");
                }
				
				//if can kill
                if ($("." + tmp).hasClass ("occupied") && tmpobj.colour != obj.colour)
                {
					moves.push (tmp);
                    $("."+ tmp).css ("background-color", "yellow");
                }
            }				
        }
		
		//castle move
		if (object.castled == "no"){
			if (object.colour == "White") {
			
				//check left castle for white
				var canCastle = !$(".D7").hasClass ("occupied") && !$(".C7").hasClass("occupied") && !$(".B7").hasClass ("occupied");
				
				if (canCastle && chess.search ("A7").type == "Rook" && chess.search("A7").castled == "no"){
					moves.push ("C7");
					$(".C7").css ("background-color", "yellow");
				}
				
				//check right castle for white
				canCastle = !$(".F7").hasClass("occupied") && !$(".G7").hasClass ("occupied");	
				if (canCastle && chess.search ("H7").type == "Rook" && chess.search("H7").castled == "no"){
					moves.push("G7");
					$(".G7").css ("background-color", "yellow");
				}
			}
			
			else {
				//check left castle for black
				var canCastle = !$(".D0").hasClass ("occupied") && !$(".C0").hasClass("occupied") && !$(".B0").hasClass ("occupied");
				if (canCastle && chess.search ("A0").type == "Rook" && chess.search("A0").castled == "no"){
					moves.push ("C0");
					$(".C0").css ("background-color", "yellow");
				}
				
				//check right castle for black
				canCastle = !$(".F0").hasClass("occupied") && !$(".G0").hasClass ("occupied");
				if (canCastle && chess.search ("H0").type == "Rook" && chess.search("H0").castled == "no"){
					moves.push ("G0");
					$(".G0").css ("background-color", "yellow");
				}
			}
		}
		return moves;
    }
})(jQuery,chess)