// Initial array of searches
var searches = [
  "DrDisrespectLive",
  "Draaxx",
  "PlayHearthstone",
  "Shroud",
  "MightyMouseufc125",
  "Deadmau5"
];

// Render the favorites list
function renderHistory() {
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
      "data-name": searches[i]
      // target: "_blank" Only run this code if user is going off page
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
  console.log("Clicked!");
  // Takes passes data-name into variable to be used in search url
  var search = $(this).attr("data-name");
  console.log(search);

  // Perfoming Giphy AJAX GET request
  function giphyGET() {
    // Storing API URL and passing in the data-name
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      search +
      "&api_key=lErOc7LwRP3qB5bErzQyb5aBr0l8GXRs&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Stores the JSON object
      var results = response.data;
      console.log(results);

      // Looping over every returned gif
      for (var i = 0; i < results.length; i++) {
        // Censorship at it's finest
        if (results[i].rating !== "r") {
          // Creating the responsive div
          var searchDiv = $('<div class="col-sx-12 col-md-3 thumbnail">');
          var searchImg = $("<img>");
          searchImg.attr({
            src: results[i].images.original_still.url,
            alt: results[i].title,
            width: "100%",
            "data-still": results[i].images.original_still.url,
            "data-animate": results[i].images.original.url,
            "data-state": "still"
          });
          // Adding the gif class allowing it to be clicked
          searchImg.addClass("gif");
          // Div for the gif caption / rating
          var captDiv = $('<div class="caption">');
          // Storing the result item's rating
          var rating = results[i].rating;
          // Adding the thumbnail caption
          var p = $("<p>").text(
            '"' + results[i].title + '"' + " Rating: " + rating
          );

          // Attaches the paragraph to the caption
          captDiv.append(p);
          // Attaches the image to the responsive div
          searchDiv.append(searchImg);
          // Attaches the caption div to the responsive div
          searchDiv.append(captDiv);
          // Prepends the responsive div to the search area
          $("#searchResults").prepend(searchDiv);
        }
      }
    });
  }

  // Perfoming YouTube AJAX GET request
  function youtubeGET() {
    // Storing API URL and passing in the data-name
    var queryURL =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=" +
      search +
      "&key=AIzaSyDDwkGgUnIek3GUnbLgjBNwwE4KPMu_T9k";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Stores the JSON object
      var results = response.items;
      console.log(results);

      // Looping over every returned gif
      for (var i = 0; i < results.length; i++) {
        // Creating the responsive div
        var searchDiv = $('<div class="col-sx-12 col-md-3 thumbnail">');
        var searchImg = $("<img>");
        searchImg.attr({
          src: results[i].snippet.thumbnails.medium.url,
          alt: results[i].snippet.title,
          width: "100%",
          "data-still": results[i].snippet.thumbnails.medium.url,
          "data-animate": results[i].snippet.thumbnails.medium.url,
          "data-state": "still"
        });
        var videoID = results[i].id.videoId;
        console.log("https://www.youtube.com/watch?v=" + videoID);
        // Adding the gif class allowing it to be clicked
        searchImg.addClass("gif");
        // Div for the gif caption / rating
        var captDiv = $('<div class="caption">');
        // Storing the result item's rating
        var rating = results[i].rating;
        // Adding the thumbnail caption
        var p = $("<p>").text(
          results[i].snippet.channelTitle +
            ': "' +
            results[i].snippet.title +
            '"'
        );

        // Attaches the paragraph to the caption
        captDiv.append(p);
        // Attaches the image to the responsive div
        searchDiv.append(searchImg);
        // Attaches the caption div to the responsive div
        searchDiv.append(captDiv);
        // Prepends the responsive div to the search area
        $("#searchResults").prepend(searchDiv);
      }
    });
  }
  // Runs the YouTube API call
  youtubeGET();
}

// Adds history when search is clicked
$("#add-search").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var searchInput = $("#search-input")
    .val()
    .trim();

  // Adding movie from the textbox to our array
  searches.push(searchInput);

  // Calling renderButtons which handles the processing of our movie array
  renderHistory();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$("body").on("click", ".search-btn", displaySearchResults);

// Click on the images
$("body").on("click", ".gif", function() {
  console.log("GIF Clicked!");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$(document).ready(function() {
  renderHistory();
});
