//Name: Visaahan Anandarajah
//Date: Januray 23, 2013
//Purpose: This file is to define a pieces object and get all the functions necessary any generic piece

var chess = {};


//Array that defines all 32 pieces - use piece object below to determine what each piece contains
chess.pieces = new Array();
chess.pieces[0] = new piece ("Black", "Rook", "A0", "alive"); 
chess.pieces[1] = new piece ("Black", "Rook", "H0", "alive"); 
chess.pieces[2] = new piece ("Black", "Knight", "B0", "alive"); 
chess.pieces[3] = new piece ("Black", "Knight", "G0", "alive"); 
chess.pieces[4] = new piece ("Black", "Bishop", "C0", "alive"); 
chess.pieces[5] = new piece ("Black", "Bishop", "F0", "alive"); 
chess.pieces[6] = new piece ("Black", "King", "E0", "alive"); 
chess.pieces[7] = new piece ("Black", "Queen", "D0", "alive"); 
chess.pieces[8] = new piece ("Black", "Pawn", "A1", "alive");
chess.pieces[9] = new piece ("Black", "Pawn", "B1", "alive");
chess.pieces[10] = new piece ("Black", "Pawn", "C1", "alive");
chess.pieces[11] = new piece ("Black", "Pawn", "D1", "alive");
chess.pieces[12] = new piece ("Black", "Pawn", "E1", "alive");
chess.pieces[13] = new piece ("Black", "Pawn", "F1", "alive");
chess.pieces[14] = new piece ("Black", "Pawn", "G1", "alive");
chess.pieces[15] = new piece ("Black", "Pawn", "H1", "alive");
chess.pieces[16] = new piece ("White", "Rook", "A7", "alive"); 
chess.pieces[17] = new piece ("White", "Rook", "H7", "alive"); 
chess.pieces[18] = new piece ("White", "Knight", "B7", "alive"); 
chess.pieces[19] = new piece ("White", "Knight", "G7", "alive"); 
chess.pieces[20] = new piece ("White", "Bishop", "C7", "alive"); 
chess.pieces[21] = new piece ("White", "Bishop", "F7", "alive"); 
chess.pieces[22] = new piece ("White", "King", "E7", "alive"); 
chess.pieces[23] = new piece ("White", "Queen", "D7", "alive"); 
chess.pieces[24] = new piece ("White", "Pawn", "A6", "alive");
chess.pieces[25] = new piece ("White", "Pawn", "B6", "alive");
chess.pieces[26] = new piece ("White", "Pawn", "C6", "alive");
chess.pieces[27] = new piece ("White", "Pawn", "D6", "alive");
chess.pieces[28] = new piece ("White", "Pawn", "E6", "alive");
chess.pieces[29] = new piece ("White", "Pawn", "F6", "alive");
chess.pieces[30] = new piece ("White", "Pawn", "G6", "alive");
chess.pieces[31] = new piece ("White", "Pawn", "H6", "alive");

/*Piece object constructor
        params are colour, type of piece, what cell piece is in, is it still in play (state), piece specific states
        for example: if king is in check, if piece has moved already*/

//Note: should see if inheritence possible in javascript and just inherit and add separate states
function piece (colour, type, location, state)
{
    this.colour = colour;
    this.type = type;
    this.location = location;
    this.state = state;

	//if pawn made its initial move
    if (type == "Pawn")
    {
        this.moved = "no";
    }
        
	//if the king is in check or can it castle
    if (type =="King")
    {
        this.inCheck = "no";
		this.castled = "no";
    }
	
	////if rook can castle
	if (type == "Rook"){
		this.castled = "no";
	}
}
        
//This function is useful for searching for any live piece based on any parameter
chess.search =(function (search_param)
{	
    for (var i = 0; i < chess.pieces.length; i++)
    {
        if ((chess.pieces[i].location == search_param || chess.pieces[i].colour == search_param || chess.pieces[i].type == search_param) && chess.pieces[i].state == "alive")
        {
            return chess.pieces[i];
        }
    }
});