function trelloAuth() {
  var trelloAuthSuccess = function() {
    console.log("Trello auth SUCCESS");
  };
  var trelloAuthFail = function() {
    console.log("Trello auth FAIL");
  };
  Trello.authorize({
    type: "popup",
    name: "Getting Started Application",
    scope: {
      read: "true",
      write: "true",
    },
    expiration: "never",
    success: trelloAuthSuccess,
    error: trelloAuthFail
  });
}

$(document).ready(function() {
  console.log("JavaScript loaded");
  trelloAuth();
});
