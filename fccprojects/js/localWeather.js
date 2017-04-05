var ipLat, ipLon, ipCity;
var climeDt, climeTemp, climeName, climeCnty, climeDesc;
var climeIcon, climeIconClass;
var ipUrl = 'https://ipapi.co/json';
var corsUrl = 'https://cors-anywhere.herokuapp.com/';
var climeUrl = 'http://api.openweathermap.org/data/2.5/';
var climeCurr = 'weather?units=metric';
var climeDaily = 'forecast/daily?units=metric&cnt=';
var climeDailyCnt = 5;
var climeAppId = '&APPID=daac7e31d48465a5708a90fcb3c81021';
var climeCurrUrl = corsUrl + climeUrl + climeCurr + climeAppId;
var climeDailyUrl = corsUrl + climeUrl + climeDaily + climeDailyCnt + climeAppId;

function tempConvert(temp) {
  return temp * 1.8 + 32;
}

function setTempMetric() {
  $("#setTempMetric").css({"border": "2px solid cadetblue"});
  $("#setTempImperial").css({"border": "initial"});
  $("#currTemp").html(climeTemp.toFixed(0) + "\u00B0C");
}

function setTempImperial() {
  $("#setTempImperial").css({"border": "2px solid cadetblue"});
  $("#setTempMetric").css({"border": "initial"});
  $("#currTemp").html(tempConvert(climeTemp).toFixed(0) + "\u00B0F");
}

function setClimeIconClass() {
  switch(climeIcon) {
    case "01d":
      climeIconClass = "wi wi-day-sunny";
      break;
    case "01n":
      climeIconClass = "wi wi-night-clear";
      break;
    case "02d":
      climeIconClass = "wi wi-day-cloudy";
      break;
    case "02n":
      climeIconClass = "wi wi-night-alt-cloudy";
      break;
    case "03d":
      climeIconClass = "wi wi-cloudy";
      break;
    case "03n":
      climeIconClass = "wi wi-cloudy";
      break;
    case "04d":
      climeIconClass = "wi wi-cloudy";
      break;
    case "04n":
      climeIconClass = "wi wi-cloudy";
      break;
    case "09d":
      climeIconClass = "wi wi-day-rain";
      break;
    case "09n":
      climeIconClass = "wi wi-night-alt-rain";
      break;
    case "10d":
      climeIconClass = "wi wi-day-rain";
      break;
    case "10n":
      climeIconClass = "wi wi-night-alt-rain";
      break;
    case "11d":
      climeIconClass = "wi wi-day-lightning";
      break;
    case "11n":
      climeIconClass = "wi wi-night-alt-lightning";
      break;
    case "13d":
      climeIconClass = "wi wi-day-snow";
      break;
    case "13n":
      climeIconClass = "wi wi-night-alt-snow";
      break;
    case "50d":
      climeIconClass = "wi wi-day-fog";
      break;
    case "50n":
      climeIconClass = "wi wi-night-fog";
      break;
             }
}

function getLocalWeather() {
  $.getJSON(ipUrl, function(ipLocation) {
    ipLat = ipLocation.latitude;
    ipLon = ipLocation.longitude;
    ipCity = ipLocation.city;
    $.getJSON(climeCurrUrl + '&lat=' + ipLat + '&lon=' + ipLon, function(clime) {
      climeDt = clime.dt;
      climeTemp = clime.main.temp;
      climeName = clime.name;
      climeCnty = clime.sys.country;
      climeDesc = clime.weather[0].description;
      climeIcon = clime.weather[0].icon;
      setClimeIconClass();
      if(climeName === ipCity) {
        $("#cityName").html(ipCity);
      } else {
        $("#cityName").html(ipCity + ' \u0028' + climeName + '\u0029');
      }
      if(climeCnty === "US") {
        setTempImperial();
      } else {
        setTempMetric();
      }
      $("#climeIcon").addClass(climeIconClass);
      $("#currCondition").html(climeDesc);
      $("#syncTime").html("data synched at:" + new Date(climeDt * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}));
      $("#setTempMetric").html("celsius");
      $("#setTempImperial").html("fahrenheit");
    });
  });
}

$(document).ready(function() {
  getLocalWeather();
  $("#setTempMetric").on("click", setTempMetric);
  $("#setTempImperial").on("click", setTempImperial);
});
