$(document).ready(function() {
 ///create array of strings, related to a topic that interests you, Save it to a var topics.
 var topics = ["Puppies", "Funny", "Ohio State", "I don't know"];
 
 //Your app should take the topics in this array and create buttons in your HTML.
   
   function renderButtons() {
     $("#topics-display").empty();
 
     for (var i = 0; i < topics.length; i++) {
       var newButton = $("<button>").text(topics[i]).attr("data-topic", topics[i]).addClass("topic-button");
       $("#topics-display").append(newButton);
     }
   }
 
   function renderGifs() {
     $("#gifs-display").empty().css("padding", "10px");
 
     var topic = $(this).attr("data-topic");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         topic + "&rating=pg&api_key=7325baea40df4feb8f78ff11549a0ee9&limit=10";
 
         $.ajax({
           url: queryURL,
           method: 'GET'
         }).done(function(response) {
 
           console.log(response);
 
           var results = response.data;
 //Try using a loop that appends a button for each string in the array.
 //When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
 
           for (var i = 0; i < results.length; i++) {
             var topicDiv = $("<div>").addClass("gif-div");
             var rating = $("<p>").html("Rating: " + results[i].rating.toUpperCase());
             var still = results[i].images.fixed_height_still.url;
             var animate = results[i].images.fixed_height.url;
             //sets still image as initial source, saves still and animated URLs for laters
             var topicImg = $("<img>").addClass("gif").attr({"src": still, "data-still": still, "data-animate": animate, "data-state": "still"});
 //Under every gif, display its rating (PG, G, so on). This data is provided by the GIPHY API.           
             topicDiv.append(topicImg).append(rating);
             $("#gifs-display").append(topicDiv);
           }
         });
   }
 
 //When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
   function changeState() {
     var state = $(this).attr("data-state");
 
     if (state === "still") {
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
     } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
     }
   }
 
   $(document).on("click", ".topic-button", renderGifs);
 
   $(document).on("click", ".gif", changeState);
 
   $("#add-search").on("click", function(event) {
     event.preventDefault();
 
     var topic = $("#user-search").val().trim();
 //Add a form to take the value from a user input box and adds it into your topics array.
 //Then make a function call that takes each topic in the array remakes the buttons on the page.
     if (topic != "" && topics.indexOf(topic.toLowerCase()) === -1) {
       $("#user-search").val("");
       topics.push(topic);
       renderButtons();
     } else {
       alert("Enter a new search term!");
     }
 
   });
 
  renderButtons();
 });