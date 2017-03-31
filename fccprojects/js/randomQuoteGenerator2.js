var currQuote = "", currAuth = "";
var quoteURL = "http://quotes.stormconsultancy.co.uk/quotes/random.json?callback=";
function loadQuote() {
  $.getJSON(quoteURL, function(quoteMeta) {
    currQuote = quoteMeta.quote;
    currAuth = quoteMeta.author;
    $("#theQuote").html(currQuote);
    $("#theAuthor").html(currAuth);
  });
}
$(document).ready(function () {
  loadQuote();
  $("#newQuote").on("click", loadQuote);
});
