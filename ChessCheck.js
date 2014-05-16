//Name: Visaahan Anandarajah
//Date: January 27, 2013
//Purpose: To implement check/checkmate to possibly end the game

(function ($,chess)
    {
		//this function checks whether the overall piece is in check or not
        chess.incheck = (function (colour,location)
        {
            var incheck=false;
	
			//gets location of the king
            if (location === undefined){
                for (var k = 0; k < chess.pieces.length; k++)
                {
                    if (chess.pieces[k].colour == colour && chess.pieces[k].type == "King")
                    {
                        location =  chess.pieces[k].location;
                    }
                }
            }
			
			//check if any piece is causing a check
			//King check is not considered since a king cannot check a king (else it'll be killed..)
            for (var i = 0; i < chess.pieces.length; i++)
            {
                if (chess.pieces[i].colour != colour && chess.pieces[i].state == "alive")
                {
		
                    if (chess.pieces[i].type == "Rook")
                    {
                        incheck = rookcheck (chess.pieces[i], location);	
                    }
			
                    if (chess.pieces[i].type == "Knight")
                    {
                        incheck = knightcheck (chess.pieces[i],location);
                    }
			
                    if (chess.pieces[i].type == "Bishop")
                    {
                        incheck = bishopcheck (chess.pieces[i],location);
                    }
			
					//queen check is a combination of rook check and bishop check
                    if (chess.pieces[i].type == "Queen")
                    {
                        incheck = rookcheck (chess.pieces[i],location);
                        if (!incheck)
                        {
                            incheck = bishopcheck (chess.pieces[i],location);
                        }
                    }
                    if (chess.pieces[i].type == "Pawn")
                    {
                        incheck = pawncheck (chess.pieces[i],location);
                    }
			
                }
				
				//king is in check (no need to check for other pieces)
                if (incheck)
                {
                    break;
                }
            }
            return incheck;
        });

		//check if colour's king in checkmate
        chess.checkmate = (function (colour) 
        {
            for (var i = 0; i < chess.pieces.length; i++)
			{
				if (chess.pieces[i].colour == colour)
				{			
					//gets the set of all possible moves for that piece
					var moves = chess.move (chess.pieces[i]);
	
					
					if (moves !== undefined)
					{
						//for all moves, update the board and check if king is still in check
						//revert back to ensure board doesnt change
						for (var j = 0; j < moves.length; j++)
						{
							var tmp = chess.pieces[i].location;
							$("."+tmp).attr ("class", ""+tmp);
							var possibleMove = moves[j];
							$("."+possibleMove).attr ("class", "" + possibleMove + " occupied");
							chess.pieces[i].location = possibleMove;
							var incheck = chess.incheck(colour);
							$("."+tmp).attr ("class", "" + tmp + " occupied");
							$("."+possibleMove).attr ("class", "" + possibleMove);
							chess.pieces[i].location = tmp;
							
							//if not in check, there is a move the opposing player can make to get out of check therefore not checkmate
							if (!incheck)
							{
								return false;
							}
							
						}
					}
				}
			}
			return true;
        });

        function rookcheck (piece,location)
        {
            var incheck=false;	
			
			//if opposing king and your rook on same row of column
            if ((piece.location[0] == location[0]) || (piece.location[1] == location[1]))
            {		
				//if on same row, want to get column (to check if there is pieces between king and rook)
                if (piece.location[0] == location[0])
                {
                    var tmp = piece.location[1];
                    var tmp1 = location[1];
                }
				
				//if on same column, want to get row (to check if pieces between king and rook)
                else if (piece.location[1] == location[1])
                {
                    var tmp = getNumber (piece.location[0]);
                    var tmp1 = getNumber(location[0]);
                }
				
                var start = Math.min (tmp, tmp1);
                var end = Math.max (tmp, tmp1);

				//check if pieces in between king and rook
                for (var j = start; j < end; j++)
                {
                    if (piece.location[0] == location[0])
                    {
                        var string = location[0];
                        string+=j;
                    }
					
                    else
                    {
                        var string = getLetter(j);
                        string += location[1];
                    }
					
					//if there is a piece between king and rook
                    if ($("."+string).hasClass ("occupied") && j != start)
                    {
                        incheck = false;
                        break;
                    }
					
					//no piece between king and rook (ie. check)
                    else if ((j == end - 1) && (!$("."+string).hasClass ("occupied")))
                    {
                        incheck = true;
                    }
                }
            }	
            return incheck;
        }

		//check if knight causes check
        function knightcheck (piece, location)
        {
            var incheck;
			
			//8 possible cases
            for (var k = 0; k < 8 ; k++)
            {
                var x= getNumber(piece.location[0]);
                var y= parseInt (piece.location[1]);
                
				//listing of all possible cases
				switch (k)
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

                var tmp = getLetter (x);
                tmp += y;
				
				//check if king's location is in any possible knight's move
				//if so, king in check
                if (location == tmp)
                {
                    incheck = true;
                    break;
                }
                else
                {
                    incheck = false;
                }
            }
	
            return incheck;
        }

		//This function checks if bishop causes check
        function bishopcheck (piece, location)
        {
			
			//get x of piece and king
            var incheck = false;
            var x1 = getNumber (piece.location[0]);
            var x2 = getNumber (location[0]);
            var xdiff = Math.abs (x1-x2);
			
			//get y of piece and king
            var y1 = parseInt (piece.location[1]);
            var y2 = parseInt (location[1]);
            var ydiff = Math.abs (y1-y2);
			
			//check difference for if both x and y difference are equal, they are diagonal (ie a slope of 1)
			//if diff of 1, no space between king and bishop therefore check
            if (xdiff == ydiff && ydiff == 1)
            {
                incheck = true;
            }
			
			//if king is in bishops path
            else if (xdiff == ydiff)
            {
                for (var i = 1; i < xdiff; i++)
                {
					//based on king's position with respect to bishop, you need to know which direction to move
					
					//king is to the right of bishop
                    if (y2 > y1)
                    {
                        y2--;
                    }
			
					//king to the left of bishop
                    if (y1 > y2)
                    {
                        y2++;
                    }
			
					//king above bishop
                    if (x2 > x1)
                    {
                        x2--;
                    }
			
					//king below bishop
                    if (x1 > x2)
                    {
                        x2++;
                    }
		
                    var tmp = getLetter (x2);
                    tmp += y2;
					
					//check if piece between bishop and king
                    if ($("."+tmp).hasClass ("occupied"))
                    {
                        incheck = false;
                        break;
                    }
					
					//if covered all steps and king's location is the next one
                    else if ((i == xdiff - 1) && (!$("."+tmp).hasClass ("occupied")))
                    {
                        incheck = true;
                    }
                }
            }
            return incheck;
        }

		//This function checks if pawn causes check
		//same idea as bishop except only check if difference is 1
        function pawncheck (piece, location)
        {
            var incheck;
            var x1 = getNumber (piece.location[0]);
            var x2 = getNumber(location[0]);
            var xdiff = Math.abs (x1-x2);
            var y1 = parseInt (piece.location[1]);
            var y2 = parseInt (location[1]);
            var ydiff = Math.abs (y1-y2);
	
            if (xdiff == 1 && ydiff == 1)
            {
                incheck = true;
            }
	
            else
            {
                incheck = false;
            }
            return incheck;
        }
    })(jQuery, chess);