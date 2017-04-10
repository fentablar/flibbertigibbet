var twitchers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "test_channel", "fentablar"];

function twitchLink(inst, user) {
  return "https://wind-bow.gomix.me/twitch-api/" + inst + "/" + user + "?callback=?";
}

function reapTwitchData() {
  twitchers.forEach(function(twitch) {
    $.getJSON(twitchLink("users", twitch), function(usrData) {
      var usrError = usrData.error;
      var usrErrMess = usrData.message;
      var usrLogo = usrData.logo == null ? "http://www.fillmurray.com/g/50/50" : usrData.logo;
      var dispName = usrData.display_name === undefined ? twitch : usrData.display_name;
      var logoHtml = "<div class='userLogo'><img class='logoIMG' src=" +
      usrLogo + "></div>";
      $.getJSON(twitchLink("channels", twitch), function(chanData) {
        var chanUrl = chanData.url;
        var usrNmHtml = chanData.error !== undefined ?
        "<span>" + dispName + "</span>" :
        "<a href=" + chanUrl + " target='_blank'>" + dispName + "</a>";
        $.getJSON(twitchLink("streams", twitch), function(strmData) {
          var twitchClass = strmData.stream == null ? "offline" : "online";
          var strmGame = strmData.stream != null ? strmData.stream.channel.game : "";
          var strmDtls = strmData.stream != null ? strmData.stream.channel.status : "";
          var strmInfo;
          if(usrError !== undefined) {
            strmInfo = "<div class='userOffline'><span>" + usrErrMess +
            "</span></div>";
          } else if(twitchClass === "offline") {
            strmInfo = "<div class='userOffline'><span>Offline</span></div>";
          } else {
            strmInfo = "<div class='game'><a href=" + chanUrl + " target='_blank'>" +
            strmGame + "</a></div><div class='chanStatus'><span>" +
            strmDtls + "</span></div>";
          }
          var twitcherHtml = "<div class='twitcher " + twitchClass + "'>" +
          logoHtml + "<div class='userName'>" + usrNmHtml + "</div>" +
          "<div class='streamInfo'>" + strmInfo + "</div></div>";
          $("#twitchBox").append(twitcherHtml);
        });
      });
    });
  });
}

$(document).ready(function() {
  reapTwitchData();
  $(".dispOpt").click(function() {
    $(".dispOpt").removeClass("dispActive");
    $(this).addClass("dispActive");
    var opt = $(this).attr("id");
    if(opt === "showAll") {
      $(".online, .offline, .unknown").css({"display": "flex"});
    } else if(opt === "showOnline") {
      $(".online").css({"display": "flex"});
      $(".offline, .unknown").css({"display": "none"});
    } else {
      $(".offline, .unknown").css({"display": "flex"});
      $(".online").css({"display": "none"});
    }
  });
});
