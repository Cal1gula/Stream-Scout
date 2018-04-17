// Initial array of twitch streamers
var searches = [
  "DrDisrespectLive",
  "Draaxx",
  "PlayHearthstone",
  "Shroud",
  "MightyMouseufc125",
  "Deadmau5"
];

// Render past searches
function renderButtons() {
  // Delete previous searches to prevent duplicates)
  $("#pastSearches").empty();

  // Looping through the array of searches
  for (var i = 0; i < searches.length; i++) {
    // Dynamicaly generating search results for our favorites
    var a = $("<a>");
    var s = $("<span>");
    // Adding a class
    a.addClass("list-group-item search-btn");
    // Adding attributes
    a.attr({
      // href: "https://www.twitch.tv/" + searches[i],
      href: "#",
      "data-parent": "#menu3",
      target: "_blank"
    });
    // Adding a class of searches to our menu
    s.addClass("d-none d-md-inline");
    // Adding the search text to the link (well span..)
    s.text(searches[i]);
    // Adding the span to the anchor
    a.append(s);
    // Adding the searches to the menubar
    $("#pastSearches").append(a);
  }
}

// Renders our search results in the main viewing window
function displaySearchResults() {
  var search = $(this).attr("data-name");
  var queryURL =
    "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Creating a div to hold the movie
    var searchDiv = $("<div class='movie'>");

    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    searchDiv.append(pOne);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Released: " + released);

    // Displaying the release year
    searchDiv.append(pTwo);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    searchDiv.append(pThree);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    searchDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#search-view").prepend(searchDiv);
  });
}

// This function handles events where a movie button is clicked
$("#add-search").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var searchInput = $("#search-input")
    .val()
    .trim();

  // Adding movie from the textbox to our array
  searches.push(searchInput);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".search-btn", displaySearchResults);

$(document).ready(function() {
  renderButtons();
});
