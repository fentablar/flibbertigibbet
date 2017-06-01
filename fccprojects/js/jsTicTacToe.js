var tknUser = "X", tknComp = "O", uStart = true, uTurn = true, gameOver = false,
    uMove, cMove, uWin, cWin, uNear, cNear, uMvOne, cPlay, square, tkn,
    userCnt = 0, tieCnt = 0, compCnt = 0, mvCnt = 0,
    winCombo, nearCombo, tryMe, cTry, corners = [0, 2, 6, 8],
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0], bLen = board.length,
    vic = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]
    ],
    vicLen = vic.length;

$(function() {
  $(".token").click(function() {
    tkn = $(this).attr("id");
    $("#tokenChoice, .gameInfo, main").toggleClass("hideMe");
    preGame(tkn);
  })

  $(".tttBox").click(function() {
    square = $(this).attr("id");
    if (uTurn && mvCnt < 9) moveCheck(square);
  });
});

function preGame(sel) {
  tknUser = sel;
  tknComp = sel === "X" ? "O" : "X";
  uStart = sel === "X" ? true : false;
  uMove = "Your\u00A0Turn\u00A0\u0028" + tknUser + "\u0029";
  cMove = "Computer\u0027s\u00A0Turn\u00A0\u0028" + tknComp + "\u0029";
  startGame();
}

function startGame() {
  if (!uStart) {
    uTurn = false;
    $("#gameStatus").html(cMove);
    setTimeout(cTurn, 700);
  }
  else {
    uTurn = true;
    $("#gameStatus").html(uMove);
  }
}

function boardReset() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  mvCnt = 0;
  $("#gameStatus").empty();
  $(".tttBox").empty();
  $(".tttBox").removeClass("victory");
  gameOver = false;
  uStart = !uStart;
  startGame();
}

function tieGame() {
  gameOver = true;
  tieCnt++;
  $("#gameStatus").html("Tie\u00A0Game");
  $("#tieCnt").html(tieCnt);
  setTimeout(boardReset, 3000);
}

function winCheck(token) {
  winCombo = "";
  for (var v = 0; v < vicLen; v++) {
    if (board[vic[v][0]] === token &&
        board[vic[v][1]] === token &&
        board[vic[v][2]] === token) {
          winCombo = vic[v];
          break;
        }
  }
  return winCombo;
}

function nearWin(token) {
  nearCombo = "";
  for (var v = 0; v < vicLen; v++) {
    if (board[vic[v][0]] === token &&
        board[vic[v][1]] === token &&
        !board[vic[v][2]] ||
        board[vic[v][0]] === token &&
        !board[vic[v][1]] &&
        board[vic[v][2]] === token ||
        !board[vic[v][0]] &&
        board[vic[v][1]] === token &&
        board[vic[v][2]] === token) {
          nearCombo = vic[v];
          break;
        }
  }
  return nearCombo;
}

function getVicPlay(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (!board[arr[i]]) return arr[i];
  }
}

function showVic(arr) {
  for (var i = 0; i < arr.length; i++) {
    $("#" + arr[i]).addClass("victory");
  }
}

function nextOpen() {
  for (var i = 0; i < bLen; i++) {
    if (!board[i]) return i;
  }
}

function tryToWin(token) {
  tryMe = "";
  for (var v = 0; v < vicLen; v++) {
    if (board[vic[v][0]] === token &&
        !board[vic[v][1]] &&
        !board[vic[v][2]]) {
          tryMe = vic[v][1];
          break;
    }
    else if (!board[vic[v][0]] &&
            board[vic[v][1]] === token &&
            !board[vic[v][2]] ||
            !board[vic[v][0]] &&
            !board[vic[v][1]] &&
            board[vic[v][2]] === token) {
              tryMe = vic[v][0];
              break;
    }
  }
  return tryMe;
}

function moveCheck(box) {

  if (!board[box] && mvCnt < 9) {
    $("#" + box).html(tknUser);
    board[box] = tknUser;
    mvCnt++;

    uWin = winCheck(tknUser);

    if (uWin) {
      gameOver = true;
      userCnt++;
      $("#gameStatus").html("You\u00A0Win\u0021");
      $("#userCnt").html(userCnt);
      showVic(uWin);
      setTimeout(boardReset, 3500);
    }
    else if (mvCnt < 9) {
      uTurn = false;
      $("#gameStatus").html(cMove);
      setTimeout(cTurn, 700);
    }
    else if (mvCnt === 9) tieGame();
  }
}

function cTurn() {
  uNear = nearWin(tknUser);
  cNear = nearWin(tknComp);
  cTry = tryToWin(tknComp);

  if (mvCnt === 0 || mvCnt === 1 && board[4]) cPlay = 0;
  else if (mvCnt === 1) {
    uMvOne = board.indexOf(tknUser);
    if (corners.indexOf(uMvOne) !== -1) cPlay = 4;
    else {
      if (board[3] || board[5]) cPlay = uMvOne - 3;
      else cPlay = uMvOne - 1;
    }
  }
  else if (mvCnt === 2) {
    if (board[4]) cPlay = 8;
    else if (board[8]) cPlay = 6;
    else cPlay = 4;
  }
  else if (mvCnt === 3) {
    if (uNear) cPlay = getVicPlay(uNear);
    else if (!board[4]) {
      if (board[8]) {
        if (board[1]) cPlay = 6;
        else cPlay = 2;
      }
      else cPlay = 4;
    }
    else if (board[4] === tknUser && board[8] === tknUser) cPlay = 2;
    else if (!board[1] && !board[3] && !board[5] && !board[7]) cPlay = 1;
    else if (board[0] === tknUser &&
            board[5] === tknUser ||
            board[8] === tknUser &&
            board[1] === tknUser)
              cPlay = 2;
    else if (board[0] === tknUser &&
            board[7] === tknUser ||
            board[8] === tknUser &&
            board[3] === tknUser)
              cPlay = 6;
    else if (board[2] === tknUser &&
            board[3] === tknUser ||
            board[6] === tknUser &&
            board[1] === tknUser)
              cPlay = 0;
    else if (board[2] === tknUser &&
            board[7] === tknUser ||
            board[6] === tknUser &&
            board[5] === tknUser)
              cPlay = 8;
  }
  else if (mvCnt === 4 && !board[4]) cPlay = 2;
  else {
    if (cNear) cPlay = getVicPlay(cNear);
    else if (uNear) cPlay = getVicPlay(uNear);
    else if (!board[4]) cPlay = 4;
    else if (cTry !== "") cPlay = cTry;
    else cPlay = nextOpen();
  }

  board[cPlay] = tknComp;
  $("#" + cPlay).html(tknComp);
  mvCnt++;

  cWin = winCheck(tknComp);

  if (cWin) {
    gameOver = true;
    compCnt++;
    $("#gameStatus").html("Computer\u00A0Wins\u0021");
    $("#compCnt").html(compCnt);
    showVic(cWin);
    setTimeout(boardReset, 3500);
  }
  else if (mvCnt < 9) {
    uTurn = true;
    $("#gameStatus").html(uMove);
  }
  else if (mvCnt === 9) tieGame();
}
