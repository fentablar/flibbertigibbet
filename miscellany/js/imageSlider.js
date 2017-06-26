var intvl, cnt = 1, presenting = false;

$(function() {

  $(".ctrl").click(function() {
    let button = $(this).attr("id");
    if (button === "start" && !presenting) startShow();
    if (button === "stop" && presenting) stopShow();
  });

  $("label").click(function() {
    let fig = $(this).attr("id");
    changeCount(fig);
  });

});

function startShow() {
  $("#start").addClass("active");
  presenting = true;
  intvl = setInterval(iterateFig, 3000)
}

function stopShow() {
  clearInterval(intvl);
  $("#start").removeClass("active");
  presenting = false;
}

function changeCount(num) {
  clearInterval(intvl);
  cnt = num;
  if (presenting) intvl = setInterval(iterateFig, 3000);
}

function iterateFig() {
  if (cnt == 5) cnt = "1";
  else cnt++;
  $("#fig" + cnt).prop("checked", true);
}
