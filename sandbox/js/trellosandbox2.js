var reapTrelloData = function() {
  console.log("trello auth success");
};

var trelloAuthFail = function() {
  console.log("trello auth fail");
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

$(document).ready(function() {
  console.log("document ready");
});
