var currQuote = "", currAuth = "", currCat = "";
var quoteURL = "http://quotes.stormconsultancy.co.uk/quotes/random.json?callback=";
function loadQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "QJs3ZNm6xHmshsvyHooxiDvMmf2dp14jKOAjsn1VTpXzU8tlKv",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=",
    success: function(quoteMeta) {
      currQuote = JSON.parse(quoteMeta).quote;
      currAuth = JSON.parse(quoteMeta).author;
      currCat = JSON.parse(quoteMeta).category;
      $("#theQuote").html(currQuote);
      $("#theAuthor").html(currAuth);
      $("#theCat").html(currCat);
      $("#tweetQuote").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&via=fentablar&text=' + encodeURIComponent('"' + currQuote + '" -' + currAuth));
    }
  });
}
$(document).ready(function () {
  loadQuote();
  $("#newQuote").on("click", loadQuote);
});
