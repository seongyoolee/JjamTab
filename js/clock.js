var toggleBool = true;

window.onload = setInterval(function() {
  var today = new Date();
  var currYear = today.getFullYear();
  var currMonth = today.getMonth();
  var currDate = today.getDate();
  var currDay = today.getDay();
  var currHour = today.getHours();
  var currMinute = today.getMinutes();
  var currSecond = today.getSeconds();

  currHour = checkTime(currHour);
  currMinute = checkTime(currMinute);
  currSecond = checkTime(currSecond);

  //요일 설정
  var weekday = new Array(7);
  weekday[0] = "일";
  weekday[1] = "월";
  weekday[2] = "화";
  weekday[3] = "수";
  weekday[4] = "목";
  weekday[5] = "금";
  weekday[6] = "토";

  var dateOutString = currYear + "년 " + (currMonth + 1) + "월 " + currDate
  + "일 \(" + weekday[currDay] + "\)";
  document.getElementById("dateDisplay").innerHTML = dateOutString;

  var timeOutString1;
  var timeOutString2;

  if (localStorage.timeOpt == "12hr") {//12시간 옵션
    if (currHour < 12) {//AM
      if (currHour == 0) {
        currHour = 12;
      }
      if (currHour - 10 < 0) {
        timeOutString1 = currHour;
        timeOutString2 = currMinute 
        $("#amOrPm").html("AM");
      } else {
        timeOutString1 = currHour;
        timeOutString2 = currMinute
        $("#amOrPm").html("AM");
      }
    } else {//PM
      if (currHour == 12) {
        timeOutString1 = currHour;
        timeOutString2 = currMinute
        $("#amOrPm").html("PM");
      } else {
        currHour = currHour - 12;
        if (currHour - 10 < 0) {
          timeOutString1 = "0" + currHour;
          timeOutString2 = currMinute
          $("#amOrPm").html("PM");
        } else {
          timeOutString1 = currHour;
          timeOutString2 = currMinute
          $("#amOrPm").html("PM");
        }
      }
    }
  } else if (localStorage.timeOpt == "24hr") {//24시간 옵션
      timeOutString1 = currHour;
      timeOutString2 = currMinute;
  }
  $("#timeDisplay1").html(timeOutString1);
  $("#timeDisplay2").html(timeOutString2);
  
  if (toggleBool) {
    $("#timeColon").css("visibility", "visible");
    toggleBool = false;
  } else {
    $("#timeColon").css("visibility", "hidden");
    toggleBool = true;
  }
}, 500);

function checkTime(i)
{
	if (i < 10) {
	   i="0" + i;
	}
	return i;
}
