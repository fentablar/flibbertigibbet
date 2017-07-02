$(function() {
  const twitchers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
                    "brunofin", "comster404", "test_channel", "fentablar"];

  const twitchLink = (inst, user) =>
    "https://wind-bow.gomix.me/twitch-api/" + inst + "/" + user + "?callback=?";

  const twitcherData = twitchers.map(genTwitchData);

  Promise.all(twitcherData).then(data => {
    for (let x of data) {
      $("#twitchBox").append(x.twitcherHtml);
    }
  });

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
        $(".online").css({"display": "flex"});
      }
    }
  });

  function genTwitchData(twitch) {
    const obj = {};

    const defImg = "http://www.fillmurray.com/g/50/50";

    const getUser = $.getJSON(twitchLink("users", twitch)).then(data => {
      obj.usrError = data.error;
      obj.usrErrMess = data.message;
      obj.usrLogo = data.logo == null ? defImg : data.logo;
      obj.dispName = data.display_name === undefined ? twitch : data.display_name;
      obj.logoHtml = "<div class='userLogo'>" +
                      "<img class='logoIMG' src=" + obj.usrLogo + "></div>";
    });

    const getChannel = $.getJSON(twitchLink("channels", twitch)).then(data => {
      obj.chanUrl = data.url;
      obj.usrNmHtml = data.error !== undefined ?
                      "<span>" + obj.dispName + "</span>" :
                      "<a href=" + obj.chanUrl + " target='_blank'>" +
                      obj.dispName + "</a>";
    });

    const getStream = $.getJSON(twitchLink("streams", twitch)).then(data => {
      obj.twitchClass = data.stream == null ? "offline" : "online";
      obj.strmGame = data.stream !== null ? data.stream.channel.game : "";
      obj.strmDtls = data.stream !== null ? data.stream.channel.status : "";
      if (obj.usrError !== undefined) {
        obj.strmInfo = "<div class='userOffline'><span>" +
                          obj.usrErrMess + "</span></div>";
      }
      else {
        if (obj.twitchClass === "offline") {
          obj.strmInfo = "<div class='userOffline'><span>Offline</span></div>";
        }
        else {
          obj.strmInfo = "<div class='game'><a href=" + obj.chanUrl +
                          " target='_blank'>" + obj.strmGame + "</a></div>" +
                          "<div class='chanStatus'>" +
                          "<span>" + obj.strmDtls + "</span></div>";
        }
      }
    });

    const setHtml = () => {
      obj.twitcherHtml = "<div class='twitcher " + obj.twitchClass + "'>" +
                          obj.logoHtml + "<div class='userName'>" + obj.usrNmHtml +
                          "</div><div class='streamInfo'>" + obj.strmInfo +
                          "</div></div>";
      return obj;
    }

    return getUser.then(getChannel).then(getStream).then(setHtml);
  }
});
