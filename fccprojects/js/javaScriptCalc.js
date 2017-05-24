var ops = ["/", "*", "+", "-"];
var sel = "", last = "", curr = "", hist = "", agg = "";
var valA = "", decValA = 0, valB = "", decValB = 0;
var operation = "", reset = false;

$(function() {
  $("button").click(function() {
    last = sel;
    sel = $(this).val();
    buttonPressed();
  });
});

function clearAll() {
  curr = "", reset = false, hist = "", res = "";
  valA = "", decValA = 0, valB = "", decValB = 0;
  operation = "";
  $("#currInput").html("0");
  $("#combInput").html(hist);
}

function clearEntry() {
  if (reset) { clearAll(); }
  else {
    curr = "";
    $("#currInput").html("0");
  }
}

function setOp() {
  switch (sel) {
    case "+":
      operation = "add";
      break;
    case "-":
      operation = "subtract";
      break;
    case "*":
      operation = "multiply";
      break;
    case "/":
      operation = "divide";
      break;
  }
}

function setValA(src) {
  valA = src;
  if (src.indexOf(".") === -1) { decValA = 0; }
  else { decValA = (src.length - (src.indexOf(".") + 1)); }
}

function setValB(src) {
  valB = src;
  if (src.indexOf(".") === -1) { decValB = 0; }
  else { decValB = (src.length - (src.indexOf(".") + 1)); }
}

function calcAdd() {
  var numValA = Number(valA), numValB = Number(valB), decExp, result;
  if (decValA > decValB || decValA === decValB) { decExp = decValA; }
  else { decExp = decValB; }
  result = ((numValA * (10 ** decExp)) + (numValB * (10 ** decExp))) / (10 ** decExp);
  if (result.toString().length > 10) { agg = result.toPrecision(10); }
  else { agg = result.toString(); }
}

function calcSub() {
  var numValA = Number(valA), numValB = Number(valB), decExp, result;
  if (decValA > decValB || decValA === decValB) { decExp = decValA; }
  else { decExp = decValB; }
  result = ((numValA * (10 ** decExp)) - (numValB * (10 ** decExp))) / (10 ** decExp);
  if (result.toString().length > 10) { agg = result.toPrecision(10); }
  else { agg = result.toString(); }
}

function calcMult() {
  var numValA = Number(valA), numValB = Number(valB), result;
  result = ((numValA * (10 ** decValA)) * (numValB * (10 ** decValB))) / (10 ** (decValA + decValB));
  if (result.toString().length > 10) { agg = result.toPrecision(10); }
  else { agg = result.toString(); }
}

function calcDiv() {
  var numValA = Number(valA), numValB = Number(valB), decExp, result;
  if (decValA > decValB || decValA === decValB) { decExp = decValA; }
  else { decExp = decValB; }
  result = (numValA * (10 ** decExp)) / (numValB * (10 ** decExp));
  if (result.toString().length > 10) { agg = result.toPrecision(10); }
  else { agg = result.toString(); }
}

function calcAgg() {
  switch (operation) {
    case "add":
      calcAdd();
      break;
    case "subtract":
      calcSub();
      break;
    case "multiply":
      calcMult();
      break;
    case "divide":
      calcDiv();
      break;
  }
}

function buttonPressed() {
  if (sel === "ac" || sel === "ce") {
    switch (sel) {
      case "ac":
        clearAll();
        break;
      case "ce":
        clearEntry();
        break;
    }
  }

  else if (!isNaN(sel)) {
    if (reset) { clearAll(); }
    if (ops.indexOf(last) !== -1) { curr = ""; }
    if (curr.length === 10) {
      curr = "";
      $("#currInput").html("max digit limit");
    }
    else {
      curr = curr.concat(sel);
      $("#currInput").html(curr);
    }
  }

  else if (sel === ".") {
    if (reset) { clearAll(); }
    if (curr === "") {
      curr = curr.concat("0", sel);
      $("#currInput").html(curr);
    }
    else if (curr.indexOf(sel) === -1) {
      curr = curr.concat(sel);
      $("#currInput").html(curr);
    }
  }

  else if (ops.indexOf(sel) !== -1) {
    if (curr[curr.length - 1] === ".") { curr = curr.slice(0, curr.length -1); }
    if (!reset) {
      if (operation !== "" && valA !== "" && curr !== "") {
        setValB(curr);
        calcAgg();
        $("#currInput").html(agg);
        if (hist.length > 92) { hist = agg + "\u2002" + sel + "\u2002"; }
        else { hist = hist.concat(curr, "\u2002", sel, "\u2002"); }
        $("#combInput").html(hist);
        setValA(agg);
        valB = "", decValB = 0, curr = "";
        setOp();
      }
      else if (operation !== "" && valA !== "" && ops.indexOf(last) !== -1) {
        setOp();
        hist = hist.slice(0, hist.length - 2).concat(sel, "\u2002");
        $("#combInput").html(hist);
      }
      else if (operation === "" && valA === "" && curr !== "") {
        hist = hist.concat(curr, "\u2002", sel, "\u2002");
        $("#combInput").html(hist);
        setValA(curr);
        setOp();
        curr = "";
      }
    }
    else if (reset) {
      setValA(agg);
      setOp();
      valB = "", decValB = 0;
      hist = hist.concat(agg, "\u2002", sel, "\u2002");
      $("#combInput").html(hist);
      reset = false;
    }
  }

  else if (sel === "=") {
    if (reset) {
      setValA(agg);
      calcAgg();
      $("#currInput").html(agg);
    }
    else if (operation !== "") {
      if (valB === "" && curr === "") { setValB(valA); }
      else if (valB === "" && curr !== "") { setValB(curr); }
      calcAgg();
      $("#currInput").html(agg);
      hist = "";
      $("#combInput").html(hist);
      reset = true;
    }
  }
}
