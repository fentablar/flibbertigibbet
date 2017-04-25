var trelloAuthSuccess = function() {
  console.log("authentication SUCCESS");
};
var trelloAuthFail = function() {
  console.log("authentication FAIL");
};
/*
Trello.authorize({
  type: "popup",
  name: "Getting Started Application",
  scope: {
    read: "true",
    write: "true"
  },
  expiration: "never",
  success: trelloAuthSuccess,
  error: trelloAuthFail
});
*/
$(document).ready(function() {
  console.log("JavaScript loaded");
  Trello.authorize({
    type: "popup",
    name: "Getting Started Application",
    scope: {
      read: "true",
      write: "true"
    },
    expiration: "never",
    success: trelloAuthSuccess,
    error: trelloAuthFail
  });
});
