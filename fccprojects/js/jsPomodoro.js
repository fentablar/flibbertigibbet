var workMins = 25, shrtBrkMins = 5, lngBrkMins = 15, work, brk,
    workTimer, brkTimer, mins, secs,
    workActive = false, shrtBrkActive = false, lngBrkActive = false,
    sessionCount = 0, cycleCount = 0, timerActive = false;

var workEnding = new Audio("../audio_global/job-done.mp3");
var workDone = new Audio("../audio_global/happy-ending.mp3");
var brkEnding = new Audio("../audio_global/coins.mp3");
var brkDone = new Audio("../audio_global/long-chime-sound.mp3");

$(function() {

  clockHtml();

  $(".intAdj").click(function() {
    var adj = $(this).attr("id");
    adjustInterval(adj);
  });

  $("#startReset").click(function() {
    if (!timerActive) {
      timerActive = true;
      triggerWork();
    }
    else if (timerActive) {
      timerActive = false;
      resetPomodoro();
    }

  });
});

function clockHtml() {
  $("#timer").html(workMins + "\u2236" + "00");
  $("#workMins").html(workMins);
  $("#shrtBrkMins").html(shrtBrkMins);
  $("#lngBrkMins").html(lngBrkMins);
  $("#sessionCount").empty();
  $("#cycleCount").html("<span>\u2002" + cycleCount + "</span>");
}

function resetPomodoro() {
  clearInterval(work);
  clearInterval(brk);
  workActive = false;
  shrtBrkActive = false;
  lngBrkActive = false;
  sessionCount = 0;
  cycleCount = 0;

  $(".perTitle").removeClass("myTurn");
  $(".interval").removeClass("noTouch");

  clockHtml();
}

function triggerWork() {
  clearInterval(brk);
  shrtBrkActive = false;
  lngBrkActive = false;
  workActive = true;
  workTimer = workMins * 60;

  $(".perTitle").removeClass("myTurn");
  $(".interval").removeClass("noTouch");

  $("#workTitle").addClass("myTurn");
  $("#workInterval").addClass("noTouch");

  pomWork();
  work = setInterval(pomWork, 1000);
}

function triggerBreak() {
  clearInterval(work);
  workActive = false;

  $(".perTitle").removeClass("myTurn");
  $(".interval").removeClass("noTouch");

  if (sessionCount === 4) {
    lngBrkActive = true;
    brkTimer = lngBrkMins * 60;

    $("#lngBrkTitle").addClass("myTurn");
    $("#lngBrkInterval").addClass("noTouch");

    pomLngBrk();
    brk = setInterval(pomLngBrk, 1000);
  }
  else {
    shrtBrkActive = true;
    brkTimer = shrtBrkMins * 60;

    $("#shrtBrkTitle").addClass("myTurn");
    $("#shrtBrkInterval").addClass("noTouch");

    pomShrtBrk();
    brk = setInterval(pomShrtBrk, 1000);
  }
}

function pomWork() {
  mins = (workTimer / 60) | 0;
  secs = (workTimer % 60) | 0;

  secs = secs < 10 ? "0" + secs : secs;

  $("#timer").html(mins + "\u2236" + secs);

  if (workTimer < 5 && workTimer > 0) { workEnding.play(); }

  if (workTimer === 0) {
    sessionCount++;
    $("#sessionCount").append("<span>\u2002\u00B7</span>");
    workDone.play();
    triggerBreak();
  }
  else { workTimer-- }
}

function pomShrtBrk() {
  mins = (brkTimer / 60) | 0;
  secs = (brkTimer % 60) | 0;

  secs = secs < 10 ? "0" + secs : secs;

  $("#timer").html(mins + "\u2236" + secs);

  if (brkTimer < 5 && brkTimer > 0) { brkEnding.play(); }

  if (brkTimer === 0) {
    brkDone.play();
    triggerWork();
  }
  else { brkTimer-- }
}

function pomLngBrk() {
  mins = (brkTimer / 60) | 0;
  secs = (brkTimer % 60) | 0;

  secs = secs < 10 ? "0" + secs : secs;

  $("#timer").html(mins + "\u2236" + secs);

  if (brkTimer < 5 && brkTimer > 0) { brkEnding.play(); }

  if (brkTimer === 0) {
    sessionCount = 0;
    cycleCount++;
    $("#sessionCount").empty();
    $("#cycleCount").html("<span>\u2002" + cycleCount);
    brkDone.play();
    triggerWork();
  }
  else { brkTimer-- }
}

function adjustInterval(id) {
  switch (id) {
    case "workSub":
      if (!workActive && workMins > 1) {
        workMins--;
        $("#workMins").html(workMins);
        if (!timerActive) {
          $("#timer").html(workMins + "\u2236" + "00");
        }
      }
      break;
    case "workAdd":
      if (!workActive) {
        workMins++;
        $("#workMins").html(workMins);
        if (!timerActive) {
          $("#timer").html(workMins + "\u2236" + "00");
        }
      }
      break;
    case "shrtBrkSub":
      if (!shrtBrkActive && shrtBrkMins > 1) {
        shrtBrkMins--;
        $("#shrtBrkMins").html(shrtBrkMins);
      }
      break;
    case "shrtBrkAdd":
      if (!shrtBrkActive) {
        shrtBrkMins++;
        $("#shrtBrkMins").html(shrtBrkMins);
      }
      break;
    case "lngBrkSub":
      if (!lngBrkActive && lngBrkMins > 1) {
        lngBrkMins--;
        $("#lngBrkMins").html(lngBrkMins);
      }
      break;
    case "lngBrkAdd":
      if (!lngBrkActive) {
        lngBrkMins++;
        $("#lngBrkMins").html(lngBrkMins);
      }
      break;
  }
}
