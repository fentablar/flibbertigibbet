//audio
var gTone = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    rTone = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    yTone = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    bTone = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    errorTone = new Audio("../audio_global/pacman_death.mp3"),
    winTone = new Audio("../audio_global/smb_stage_clear.mp3");

//objects (static)
var colors = { 0: "green", 1: "red", 2: "yellow", 3: "blue" },
    tones = { "green": gTone, "red": rTone, "yellow": yTone, "blue": bTone },
    colorsLength = Object.keys(colors).length;

//settings (dynamic)
var ctrlButton, powerOn = false, startOn = false, strictOn = false,
    gameLength = 20, simonArray = [], userActive = false, freezeGame = true,
    userColor, simonColor, userTone, simonTone,
    gameCount, simonCount, userCount, celebCount;

//timer items
var stTurn, stClick, stError, stClickDelay, stErrorDelay, celebIntvl;

$(function() {
  winTone.onended = null;
  $(".ctrlButton").click(function() {
    ctrlButton = $(this).attr("id");
    controlButtons(ctrlButton);
  });
  $(".mainButton").click(function() {
    if (userActive && !freezeGame) {
      userColor = $(this).attr("id");
      userClick(userColor);
    }
  });
});

function celebrate() {
  if (!freezeGame) {
    $(".mainButton").removeClass("simon");
    $("#" + colors[celebCount]).addClass("simon");
    if (celebCount === 3) celebCount = 0;
    else celebCount++;
  }
}

function userWin() {
  celebCount = 0;
  userActive = false;
  $("#counterDisp").html("\u2605"); //html entity &bigstar;
  $(".mainButton").removeClass("act");
  winTone.onended = function() {
    clearInterval(celebIntvl);
    $(".mainButton").removeClass("simon");
  };
  winTone.play();
  celebrate();
  celebIntvl = setInterval(celebrate, 100);
}

function userError() {
  if (!freezeGame) {
    userActive = false;
    $("#counterDisp").html("\u2298"); //html entity &olsol;
    errorTone.play();
    errorTone.onended = function() {
      if (strictOn) gameCount = 1;
      stTurn = setTimeout(simonTurn, 500);
    };
  }
}

function userClick(color) {
  clearTimeout(stError);
  if (color !== simonArray[userCount]) userError();
  else {
    userTone = tones[color];
    userTone.play();
    userCount++;
    if (userCount === gameCount) {
      userActive = false;
      $(".mainButton").removeClass("act");
      if (gameCount === gameLength) userWin();
      else {
        gameCount++;
        stTurn = setTimeout(simonTurn, 1500);
      }
    }
    else stError = setTimeout(userError, stErrorDelay);
  }
}

function userTurn() {
  userActive = true;
  userCount = 0;
  if (gameCount < 6) stErrorDelay = 5000;
  else if (gameCount < 11) stErrorDelay = 4000;
  else if (gameCount < 16) stErrorDelay = 3000;
  else if (gameCount > 15) stErrorDelay = 2000;
  $(".mainButton").addClass("act");
  stError = setTimeout(userError, stErrorDelay);
}

function endSimonClick() {
  simonTone.onended = null;
  simonTone = null;
  $("#" + simonColor).removeClass("simon");
  simonCount++;
  if (simonCount === gameCount) userTurn();
  else stClick = setTimeout(simonClick, stClickDelay);
}

function simonClick() {
  if (!freezeGame) {
    simonColor = simonArray[simonCount];
    simonTone = tones[simonColor];
    simonTone.onended = function() {
      if (!freezeGame) endSimonClick()
    };
    $("#" + simonColor).addClass("simon");
    simonTone.play();
  }
}

function simonTurn() {
  if (!freezeGame) {
    $("#counterDisp").html(gameCount);
    simonCount = 0;
    if (gameCount < 5) stClickDelay = 400;
    else if (gameCount < 9) stClickDelay = 250;
    else if (gameCount < 13) stClickDelay = 125;
    else if (gameCount < 17) stClickDelay = 50;
    else if (gameCount > 16) stClickDelay = 0;
    stClick = setTimeout(simonClick, stClickDelay);
  }
}

function bootup() {
  var i, num;
  $("#counterDisp").html("\u21BB"); //html entity &orarr;
  for (i = 0; i < gameLength; i++) {
    num = Math.floor(Math.random() * colorsLength);
    simonArray.push(colors[num]);
  }
  gameCount = 1;
  freezeGame = false;
  stTurn = setTimeout(simonTurn, 1500);
}

function reboot() {
  resetGame();
  bootup();
}

function resetGame() {
  freezeGame = true;
  userActive = false;
  if (simonTone) {
    simonTone.onended = null;
    simonTone.pause()
  }
  if (userTone) {
    userTone.onended = null;
    userTone.pause();
  }
  errorTone.pause();
  winTone.pause();
  clearTimeout(stTurn);
  clearTimeout(stClick);
  clearTimeout(stError);
  clearInterval(celebIntvl);
  $(".mainButton").removeClass("act simon");
  simonTone = null;
  userTone = null;
  userColor = null;
  simonColor = null;
  simonArray = [];
}

function powerButton() {
  if (!powerOn) {
    powerOn = true;
    $("#power").addClass("ctrlBtnOn");
    $("#counterDisp").html("\u22EF"); //html entity &ctdot;
  }
  else if (powerOn) {
    powerOn = false;
    startOn = false;
    strictOn = false;
    $("#counterDisp").empty();
    $(".ctrlButton").removeClass("ctrlBtnOn");
    resetGame();
  }
}

function startButton() {
  if (!startOn) {
    startOn = true;
    $("#start").addClass("ctrlBtnOn");
    bootup();
  }
  else if (startOn) reboot();
}

function strictButton() {
  strictOn = !strictOn;
  $("#strict").toggleClass("ctrlBtnOn");
}

function controlButtons(btn) {
  if (btn === "power") powerButton();
  else if (btn === "start" && powerOn) startButton();
  else if (btn === "strict" && powerOn) strictButton();
}
