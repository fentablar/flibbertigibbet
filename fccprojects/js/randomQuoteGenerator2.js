var currQuote = "", currAuth = "", currCat = "";

function setHeaderText() {
  switch(currCat) {
    case "Famous":
      return currCat + " quotes";
      break;
    case "Movies":
      return "movie quotes";
      break;
                }
}

function setTwitterHash() {
  switch(currCat) {
    case "Famous":
      return "famousquotes";
      break;
    case "Movies":
      return "moviequotes";
      break;
                }
}

function loadQuote() {
  $("body").animate({
    opacity: 0
  }, 375);
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
      $("#headerText").html(setHeaderText);
      $("#footerText").html("page by fentablar");
      $("#theQuote").html('\u201C' + currQuote + '\u201D');
      $("#theAuthor").html(currAuth);
      $("#iterateQuote").html("iterate");
      $("#tweetQuote").html("share via twitter");
      $("#tweetLink").attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('\u201C' + currQuote + '\u201D ' + currAuth) + '&hashtags=' + setTwitterHash() + '&via=fentablar');
      $("body").animate({
        opacity: 1
      }, 375);
    }
  });
}
$(document).ready(function() {
  loadQuote();
  $("#iterateQuote").on("click", loadQuote);
});
