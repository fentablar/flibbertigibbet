$.holdReady(true);
console.log("doc held");

$(document).ready(function() {
  console.log("document ready");
});

var reapTrelloData = function() {
  Trello.get("members/me/boards", function(boardData) {
    for (var bd = 0; bd < boardData.length; bd++) {
      console.log("board " + boardData[bd].id);
      Trello.get("boards/" + boardData[bd].id + "/lists", function(listData) {
        for (var ld = 0; ld < listData.length; ld++) {
          console.log("list " + listData[ld].id);
          Trello.get("lists/" + listData[ld].id + "/cards", function(cardData) {
            for (var cd = 0; cd < cardData.length; cd++) {
              console.log("card " + cardData[cd].id);
            } return "cards loaded";
          }, function() { console.log("card load failed"); });
        } return "lists loaded";
      }, function() { console.log("list load failed"); });
    } return "boards loaded";
  }, function() { console.log("board load failed"); });
  return $.holdReady(false);
};

var trelloAuthFail = function() {
  console.log("trello auth fail");
  return $.holdReady(false);
}

Trello.authorize( {
  type: "popup",
  name: "chingu raccoons xtal",
  scope: {
    read: "true",
    write: "true"
  },
  expiration: "never",
  success: reapTrelloData,
  error: trelloAuthFail
});
