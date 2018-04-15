// Menu toggle script
$("#menu-toggle").click(function(e) {
  e.preventDefault(); // Prevents this from going to a url since this is a link
  $("#wrapper").toggleClass("menuDisplayed");
});
