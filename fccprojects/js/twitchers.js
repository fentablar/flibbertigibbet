var twitchers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "test_channel", "fentablar"];

function reapTwitchData() {
  twitchers.forEach(function(twitcher) {
    var twitcherStatus, twitcherURL, twitcherLogo, twitcherDispName, twitcherHTML;
    function twitchLink(inst, user) {
      return "https://wind-bow.gomix.me/twitch-api/" + inst + "/" + user + "?callback=?";
    }
    $.getJSON(twitchLink("users", twitcher), function(data) {
      if(data.error !== undefined) {
        twitcherStatus = "unknown";
        twitcherLogo = "http://www.fillmurray.com/g/50/50";
        twitcherDispName = twitcher;
        twitcherHTML = "<div class='twitcher " + twitcherStatus +
        "'><div class='userLogo'><img class='logoIMG' src=" +
        twitcherLogo + "></div><div class='userName'><span>" +
        twitcherDispName + "</span></div>" +
        "<div class='streamInfo'><div class='userOffline'><span>" +
        data.message + "</span></div></div></div>";
        $("#twitchBox").append(twitcherHTML);
      } else {
        $.getJSON(twitchLink("streams", twitcher), function(data) {
          if(data.stream !== null) {
            twitcherStatus = "online";
            twitcherURL = data.stream.channel.url;
            twitcherLogo = data.stream.channel.logo !== null ? data.stream.channel.logo : "http://www.fillmurray.com/g/50/50";
            twitcherDispName = data.stream.channel.display_name;
            twitcherHTML = "<div class='twitcher " + twitcherStatus +
            "'><div class='userLogo'><img class='logoIMG' src=" +
            twitcherLogo + "></div><div class='userName'><a href=" +
            twitcherURL + " target='_blank'>" +
            twitcherDispName + "</a></div>" +
            "<div class='streamInfo'><div class='game'><a href=" +
            twitcherURL + " target='_blank'>" + data.stream.channel.game +
            "</a></div><div class='chanStatus'><span>" +
            data.stream.channel.status + "</span></div></div></div>";
            $("#twitchBox").append(twitcherHTML);
          } else {
            $.getJSON(twitchLink("channels", twitcher), function(data) {
              twitcherStatus = "offline";
              twitcherURL = data.url;
              twitcherLogo = data.logo !== null ? data.logo : "http://www.fillmurray.com/g/50/50";
              twitcherDispName = data.display_name;
              twitcherHTML = "<div class='twitcher " + twitcherStatus +
              "'><div class='userLogo'><img class='logoIMG' src=" +
              twitcherLogo + "></div><div class='userName'><a href=" +
              twitcherURL + " target='_blank'>" +
              twitcherDispName + "</a></div>" +
              "<div class='streamInfo'><div class='userOffline'><span>Offline</span></div></div></div>";
              $("#twitchBox").append(twitcherHTML);
            });
          }
        });
      }
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
