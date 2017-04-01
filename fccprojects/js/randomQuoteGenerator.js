/* var currQuote = "", currAuth = "", currCat = "";
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
      $("#tweetLink").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&via=fentablar&text=' + encodeURIComponent('\u201C' + currQuote + '\u201D ' + currAuth));
    }
  });
}
$(document).ready(function() {
  loadQuote();
  $("#iterateQuote").on("click", loadQuote);
}); */
