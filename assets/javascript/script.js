// This is where the buttons will be added when doing the search 
var puppiesVar = ["Yorkies", "Poodles", "Golden Retrievers", "Pitbulls", "Pugs"]; 



function renderButtons(){ 

	$("#puppy-view").empty();

	for ( var i = 0; i < puppiesVar.length; i++){
		var a = $("<button>");
		a.addClass('puppies');
		a.attr("data-name", puppiesVar[i]); 
		a.text(puppiesVar[i]); 
		$("#puppy-view").append(a);
	}

	$("button").on("click", function(){
		var dog = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=eKcu9um6axWjo4h6ep6kNMAFBY7Z7bOG&q=" + dog + 
		"&limit=25&offset=0&rating=G&lang=en"; 


		$.ajax({
			url: queryURL, 
			method: "GET"
		})

		.done(function(response){

			var results = response.data; 
			for (var j = 0; j < results.length; j++){
				var gifDiv = $("<div class = 'item'>"); 
				var dogImage = $("<img data-still='stillImage' data-notstill='notStillImage' data-state='still' id='gif'>"); 
				dogImage.attr("src", results[j].images.fixed_height.url); 
				dogImage.attr("data-still", results[j].images.original_still.url); 
				dogImage.attr("data-notstill", results[j].images.original.url);
				gifDiv.prepend(dogImage);
				$("#gifs-appear-here").prepend(gifDiv); 

			}

		})


	})

}
// On Click Function for the buttons to be added to the screen / form 

$("#add-animal").on("click", function(event){

	event.preventDefault();
	var puppies = $("#puppy-input").val().trim();
	puppiesVar.push(puppies);
	renderButtons();

}); 
renderButtons();

// Code meant to make image from still to motion. 

$("#gifs-appear-here").on("click", function() {

	if($(this).attr("data-state") == "still") {
            $(this).attr("src", $(this).attr("data-notstill"));
            $(this).attr("data-state", "notstill");
          } else {
            $(this).attr("src", $(this).attr("data-notstill"));
          }
 

});
