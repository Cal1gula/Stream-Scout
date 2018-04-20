// Initial array of searches
var searches = [
  "DrDisrespectLive",
  "DraaxxTV",
  "PlayHearthstone",
  "Shroud",
  "MightyMouseufc125",
  "Deadmau5"
];

// Sets savedHistory as our localStorage variable
var savedHistory = JSON.parse(localStorage.getItem("history"));

// Checks to see if savedHistory is currently an array, if not sets it to the value of searches and saves it to the localStorage
if (!Array.isArray(savedHistory)) {
  localStorage.setItem("history", JSON.stringify(searches));
}

// Render the favorites list
function renderHistory() {
  // Delete previous searches to prevent duplicates)
  $("#pastSearches").empty();

  // Looping through the array of searches
  for (var i = 0; i < savedHistory.length; i++) {
    // Dynamicaly generating search results for our favorites
    var a = $("<a>");
    var s = $("<span>");
    // Adding a class
    a.addClass("list-group-item search-btn");
    // Adding attributes
    a.attr({
      // href: "https://www.youtube.com/watch?v=" + searches[i].items.id.videoId,
      href: "#",
      "data-parent": "#menu3",
      "data-name": savedHistory[i]
      // target: "_blank"
    });
    // Adding a class of searches to our menu
    s.addClass("d-none d-md-inline");
    // Adding the search text to the link (well span..)
    s.text(savedHistory[i]);
    // Adding the span to the anchor
    a.append(s);
    // Adding the searches to the menubar
    $("#pastSearches").append(a);
  }
}

// Renders our search results in the main viewing window
function displaySearchResults() {
  // Takes passes data-name into variable to be used in search url
  var search = $(this).attr("data-name");

  // Pick your API call (WARNING: Changing this requires changing the click function below!)
  // giphyGET();
  // youtubeGET(search);
  if ($("#giphy").is(":checked")) {
    giphyGET(search);
  } else if ($("#youtube").is(":checked")) {
    youtubeGET(search);
  }
}

// Perfoming Giphy AJAX GET request -- You can call this instead of YouTube to have this display gifs instead...
function giphyGET(search) {
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
function youtubeGET(search) {
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

    // Looping over every returned gif
    for (var i = 0; i < results.length; i++) {
      var videoID = results[i].id.videoId;
      // Creating the responsive div
      var searchDiv = $('<div class="col-sx-12 col-md-3 thumbnail">');
      var searchFrame = $("<iframe>");
      searchFrame.attr({
        id: videoID,
        width: "100%",
        src: "https://www.youtube.com/embed/" + videoID,
        frameborder: 0,
        allow: "autoplay; encrypted-media"
      });
      searchDiv.attr("id", "fav" + videoID);
      var searchImg = $("<img>");
      searchImg.attr({
        src: results[i].snippet.thumbnails.medium.url,
        alt: results[i].snippet.title,
        width: "100%",
        "data-still": results[i].snippet.thumbnails.medium.url,
        "data-animate": videoID,
        "data-state": "still"
      });
      searchFrame.hide();
      // Adding the gif class allowing it to be clicked
      searchImg.addClass("gif");
      searchImg.attr("id", videoID);
      // Div for the gif caption / rating
      var captDiv = $('<div class="caption">');
      // Storing the result item's rating
      var rating = results[i].rating;
      // Adding the thumbnail caption
      var p = $("<p>").text(
        results[i].snippet.channelTitle + ': "' + results[i].snippet.title + '"'
      );
      // Attaches our iframe to the responsive div
      searchDiv.append(searchFrame);
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

// Dispays favorite icon on mouseover - This is for a favorites feature which will be implemented later
// $("#fav" + "123").hover(function() {
//   $(this)
//     .children(".favOverlay")
//     .toggleClass("favOverlayHide");
// });

// Adds history when search is clicked
$("#add-search").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var searchInput = $("#search-input")
    .val()
    .trim();

  // Adding movie from the textbox to our array
  savedHistory.push(searchInput);

  if (savedHistory.length > 10) {
    savedHistory.shift();
  }

  localStorage.setItem("history", JSON.stringify(savedHistory));

  // Calling renderButtons which handles the processing of our movie array
  renderHistory();
  console.log($("#giphy").attr("checked"));
  console.log($("#youtube").attr("checked"));
  if ($("#giphy").is(":checked")) {
    giphyGET(searchInput);
  } else if ($("#youtube").is(":checked")) {
    youtubeGET(searchInput);
  }

  $("#search-input").val("");
});

// Adding a click event listener to all elements with a class of "movie-btn"
$("body").on("click", ".search-btn", displaySearchResults);

// Click on the images
$("body").on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  var vidId = $(this).attr("data-animate");

  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    if ($("#giphy").is(":checked")) {
      $(this).attr("src", $(this).attr("data-animate"));
    } else if ($("#youtube").is(":checked")) {
      $(this).hide(); // You must uncommented this for the youtubeGET(search) to work!
      $("#" + vidId).show(); // You must uncommented this for the youtubeGET(search) to work!
    }
    // $(this).hide(); // You must uncommented this for the youtubeGET(search) to work!
    // $("#" + vidId).show(); // You must uncommented this for the youtubeGET(search) to work!
    // $(this).attr("src", $(this).attr("data-animate")); // You must uncomment this for the giphyGET() to work!
    $(this).attr("data-state", "animate");
  } else {
    if ($("#giphy").is(":checked")) {
      $(this).attr("src", $(this).attr("data-still")); // You must uncomment this for the giphyGET() to work!
    } else if ($("#youtube").is(":checked")) {
      $(this).show(); // You must uncommented this for the youtubeGET(search) to work!
      $("#" + vidId).hide(); // You must uncommented this for the youtubeGET(search) to work!
    }

    // $(this).show(); // You must uncommented this for the youtubeGET(search) to work!
    // $("#" + vidId).hide(); // You must uncommented this for the youtubeGET(search) to work!
    // $(this).attr("src", $(this).attr("data-still")); // You must uncomment this for the giphyGET() to work!
    $(this).attr("data-state", "still");
  }
});

$(document).ready(function() {
  renderHistory();
});
