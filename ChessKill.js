(function ($,chess)
{
chess.checkkill = (function(location, colour)
{
	var death_count=0;
	for (var i = 0; i < chess.pieces.length; i++)
	{
	if (chess.pieces[i].location == location && chess.pieces[i].state == "alive")
	{
		death_count++;
	}
	}
	if (death_count == 2)
	{
	for (var i = 0; i < chess.pieces.length; i++)
	{
	if (chess.pieces[i].location == location && chess.pieces[i].colour != colour)
		{
			$(".update").html ("UPDATE: "+ obj.colour + " "+ obj.type+ " kills " + chess.pieces[i].colour + " "+ chess.pieces[i].type +".");
			chess.pieces[i].state = "dead";
		}
	}
	//chess.finalkill (location);
	}
});

/*
chess.finalkill= (function (location)
{
	for (var i = 0; i < chess.pieces.length; i++)
	{
		if (chess.pieces[i].location == location && chess.pieces[i].state == "dead")
		{
		$(".update").html ("UPDATE: "+ obj.colour + " "+ obj.type+ " kills " + chess.pieces[i].colour + " "+ chess.pieces[i].type +".");
			chess.pieces.splice (i,1);
		}
	}
});


chess.restore = (function(location)
{
	for (var i = 0; i < chess.pieces.length; i++)
	{
		if (chess.pieces[i].location == location && chess.pieces[i].state == "dead")
		{
			chess.pieces[i].state = "alive";
		}
	}
});*/
})(jQuery,chess);