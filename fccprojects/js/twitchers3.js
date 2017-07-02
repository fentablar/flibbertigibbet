$(function() {
  const twitchers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
                    "brunofin", "comster404", "test_channel", "fentablar"];

  const twitchLink = (inst, user) =>
    "https://wind-bow.gomix.me/twitch-api/" + inst + "/" + user + "?callback=?";

  const twitchHtml = [];

  $(".dispOpt").click(function() {
    $(".dispOpt").removeClass("dispActive");
    $(this).addClass("dispActive");
    let opt = $(this).attr("id");
    if (opt === "showAll") {
      $(".online, .offline, .unknown").css({"display": "flex"});
    }
    else {
      if (opt === "showOnline") {
        $(".online").css({"display": "flex"});
        $(".offline, .unknown").css({"display": "none"});
      }
      else {
        $(".offline, .unknown").css({"display": "flex"});
        $(".online").css({"display": "none"});
      }
    }
  });

  Promise.all(twitchers.map(genTwitchHtml)).then(() => {
    for (let x of twitchHtml) {
      $("#twitchBox").append(x);
    }
  });

  function genTwitchHtml(twitch) {
    const getUser = $.getJSON(twitchLink("users", twitch));
    const getChan = $.getJSON(twitchLink("channels", twitch));
    const getStrm = $.getJSON(twitchLink("streams", twitch));

    return Promise.all([getUser, getChan, getStrm]).then(data =>
      twitchHtml.push(setHtml(data)));
  }

  function setHtml(arr) {
    const user = arr[0], chan = arr[1], strm = arr[2];
    let usrError = user.error,
        usrErrMess = user.message,
        usrDspNmErr = usrErrMess ? usrErrMess.slice(usrErrMess.indexOf('"') + 1,
                      usrErrMess.lastIndexOf('"')) : "",
        usrLogo = user.logo ? user.logo : "http://www.fillmurray.com/g/50/50",
        dispName = user.display_name ? user.display_name : usrDspNmErr,
        logoHtml = "<div class='userLogo'><img class='logoIMG' " +
                    "src='" + usrLogo + "'></div>",
        chanUrl = chan.url,
        usrNmHtml = usrError ? "<span>" + dispName + "</span>" :
                  "<a href='" + chanUrl + "' target='_blank'>" +
                  dispName + "</a>",
        twitchClass = strm.stream ? "online" : "offline",
        strmGame = strm.stream ? strm.stream.channel.game : "",
        strmDtls = strm.stream ? strm.stream.channel.status : "",
        strmInfo;
    if (usrError) strmInfo = "<div class='userOffline'><span>" + usrErrMess +
                    "</span></div>";
    else {
      if (twitchClass === "offline") strmInfo = "<div class='userOffline'" +
                                      "<span>Offline</span></div>";
      else strmInfo = "<div class='game'><a href='" + chanUrl +
            "' target='blank'>" + strmGame + "</a></div>" +
            "<div class='chanStatus'><span>" + strmDtls + "</span></div>";
    }
    return String("<div class='twitcher " + twitchClass + "'>" + logoHtml +
          "<div class='userName'>" + usrNmHtml + "</div>" +
          "<div class='streamInfo'>" + strmInfo + "</div></div>");
  }
});
