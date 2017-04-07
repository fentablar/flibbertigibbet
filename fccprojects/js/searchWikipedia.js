var searchTerm;

function wikiSearch() {
  $.getJSON("https://en.wikipedia.org//w/api.php?callback=?&action=opensearch&limit=25&search=" + searchTerm, function(searchRes) {
    var resTitles = searchRes[1];
    var resSnippets = searchRes[2];
    var resLinks = searchRes[3];
    if (resTitles.length > 0) {
      for (var i = 0; i < resTitles.length; i++) {
        $(".results").append("<div class='resultItem' id='resultItem" + i + "'></div>");
        $("#resultItem" + i).append("<a id='resItemLink" + i + "' href='" + resLinks[i] + "' target='_blank'></a>");
        $("#resItemLink" + i).append("<h2>" + resTitles[i] + "</h2>");
        $("#resultItem" + i).append("<p>" + resSnippets[i] + "</p>");
      }
    } else {
      $(".results").append("<p>No results found</p>");
    }
  });
}

$(document).ready(function() {
  $("#searchBox").attr("placeholder", "search for...");
  $("#ranButt").click(function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random")
  });
  $("#searchButt").click(function() {
    searchTerm = $("#searchBox").val();
    $(".results").empty();
    if(searchTerm !== '') {
      wikiSearch();
    }
  });
  $("#searchBox").keyup(function(event) {
    searchTerm = $("#searchBox").val();
    if(event.keyCode === 13) {
      $(".results").empty();
      if(searchTerm !== '') {
        wikiSearch();
      }
    }
  });
});
