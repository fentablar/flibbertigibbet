var currQuote = "", currAuth = "", currCat = "";
var colorScheme = 0, colorHtml = "", colorBG = "";
var colorBodTxt = "", colorHdFt = "", colorButt = "";

function setColorScheme() {
  switch(colorScheme) {
    case 1:
    colorHtml = "maroon";
    colorBG = "saddlebrown";
    colorBodTxt = "navajowhite";
    colorHdFt = "maroon";
    colorButt = "sandybrown";
    break;
    case 2:
    colorHtml = "olive";
    colorBG = "papayawhip";
    colorBodTxt = "seagreen";
    colorHdFt = "yellowgreen";
    colorButt = "olive";
    break;
    case 3:
    colorHtml = "darkturquoise";
    colorBG = "steelblue";
    colorBodTxt = "cyan";
    colorHdFt = "deepskyblue";
    colorButt = "darkturquoise";
    break;
    case 4:
    colorHtml = "darkgray";
    colorBG = "gainsboro";
    colorBodTxt = "gray";
    colorHdFt = "darkgray";
    colorButt = "darkslategray";
    break;
    case 5:
    colorHtml = "indianred";
    colorBG = "firebrick";
    colorBodTxt = "bisque";
    colorHdFt = "indianred";
    colorButt = "lightcoral";
    break;
    case 6:
    colorHtml = "peru";
    colorBG = "navajowhite";
    colorBodTxt = "saddlebrown";
    colorHdFt = "peru";
    colorButt = "sienna";
    break;
    case 7:
    colorHtml = "darkgreen";
    colorBG = "seagreen";
    colorBodTxt = "papayawhip";
    colorHdFt = "darkgreen";
    colorButt = "yellowgreen";
    break;
    case 8:
    colorHtml = "steelblue";
    colorBG = "cyan";
    colorBodTxt = "steelblue";
    colorHdFt = "dodgerblue";
    colorButt = "midnightblue";
    break;
    case 9:
    colorHtml = "gainsboro";
    colorBG = "darkslategray";
    colorBodTxt = "gainsboro";
    colorHdFt = "gray";
    colorButt = "darkgray";
    break;
    case 10:
    colorHtml = "firebrick";
    colorBG = "bisque";
    colorBodTxt = "indianred";
    colorHdFt = "lightcoral";
    colorButt = "firebrick";
    break;
  }
}

function initColorScheme() {
  colorScheme = Math.floor(Math.random() * 10 + 1);
  setColorScheme();
  $("html").css("background-color", colorHtml);
}

function nextColorScheme() {
  if(colorScheme === 10) {
    colorScheme = 1;
  } else {
    colorScheme += 1;
  }
  setColorScheme();
}

function retrieveColors() {
  $("body").css({"background-color": colorBG, "color": colorBodTxt});
  $("header, footer").css({"color": colorHdFt});
  $("#iterateQuote, #tweetQuote").css({"color": colorButt});
}

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
      retrieveColors();
      $("body").animate({
        opacity: 1
      }, 375);
      $("html").css("background-color", colorHtml);
      nextColorScheme();
    }
  });
}
$(document).ready(function() {
  initColorScheme();
  loadQuote();
  $("#iterateQuote").on("click", loadQuote);
});
