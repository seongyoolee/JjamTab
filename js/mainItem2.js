var remainContentArr = ["img/knowingBros.png", "img/baekRestaurant.png", "img/food.png", "img/musicBank.png", "img/iLiveAlone.png", "img/rollCall.jpg", "img/running.jpg", "img/religion.png", "img/rollCallNight.jpg", "img/60seconds.png", "img/history.png"];
var randomInd = Math.floor(Math.random() * remainContentArr.length);
var leftCountStr = "번";
//전역일 오전 9시를 기준으로 잡음
var endDate = new Date(localStorage.endDateYear, localStorage.endDateMonth - 1, localStorage.endDateDate, 9, 0, 0, 0);
var totalTime = localStorage.wholeDays;
var remainTime = localStorage.todoDays;
var ratio = remainTime / totalTime;

$("#remainContent").click(function() {
    if (!$("#leftCount").hasClass("animated rubberBand")) {
        $("#leftCount").addClass("animated rubberBand");
    }
    nextRandomContent();
});

$(document).ready(function() {

    //모든 이미지 오른쪽 마우스 클릭 금지
    $("img").on("contextmenu",function(){
        return false;
    }); 

    if (localStorage.background == "img/mainback1.jpg") {
        $(".font-color").css("color", "#303030");
    }
    else if (localStorage.background == "img/mainback2.jpg") {
        $(".font-color").css("color", "#303030");
    }
    $("body").css({
        "text-align": "center"
    });

    $("#remainContentImg").attr("src", remainContentArr[randomInd]);
    leftCountCal(randomInd); 
});

function getNextWeeklyTime(curr) {
    // GETDAY() -> [SUN, MON, TUE, WED, THURS, FRI, SAT]
    if (randomInd == 0) {
        //아는형님, 토요일 21:40
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 6 - curr.getDay()) % 7);
        targetTime.setHours(21, 40, 0, 0);
    } else if (randomInd == 1) {
        //골목식당, 수요일 23:10
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 3 - curr.getDay()) % 7);
        targetTime.setHours(23, 10, 0, 0);
    } else if (randomInd == 3 || randomInd == 4) {
        //뮤직뱅크, 금요일 17:40
        if (randomInd == 3){
            var targetTime = new Date(curr.getTime());
            targetTime.setDate(curr.getDate() + (7 + 5 - curr.getDay()) % 7);
            targetTime.setHours(17, 40, 0, 0);
        }
        //나혼자산다, 금요일 23:10
        else if (randomInd == 4){
            var targetTime = new Date(curr.getTime());
            targetTime.setDate(curr.getDate() + (7 + 5 - curr.getDay()) % 7);
            targetTime.setHours(23, 10, 0, 0);
        }
    } else if (randomInd == 7) {
        // 종교, 일요일 10:00
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 7 - curr.getDay()) % 7);
        targetTime.setHours(10, 0, 0, 0);
    }


    //이미 타겟시간 지났을경우 일주일 뒤로
    if (curr > targetTime) {
        targetTime.setDate(curr.getDate() + 7);
    }

    return targetTime;
}

function getNextDailyTime(curr, mealHour, mealMinute) {
    var targetTime = new Date(curr.getTime());
    targetTime.setHours(mealHour, mealMinute, 0, 0);
    if (curr > targetTime) {
        targetTime.setDate(curr.getDate() + 1);
    }
    return targetTime;
}

function currTimeCheck(nextTime, remainCount) {
    while ((nextTime) < endDate) {
        ++remainCount;
        nextTime.setDate(nextTime.getDate() + 1);
    }
    return remainCount;
}

function leftCountCal(randomIndex) {
    var rightCountStr;
    $("#rightCount").show();
    $("#leftCount").removeClass("index10");
    if(localStorage.identity=="girlfriend"){
       rightCountStr = "꽃신!";
    } else {  
        rightCountStr = "전역!";
    }
        
    if (randomIndex == 2) {// 하루에 몇번 하는건 따로 계산
        leftCountStr = "끼";
        // 짬밥, 아침(08:00), 점심(12:00), 저녁(17:30)
        var nextTime1 = getNextDailyTime(new Date(), 8, 0);//아침
        var nextTime2 = getNextDailyTime(new Date(), 12, 0);//점심
        var nextTime3 = getNextDailyTime(new Date(), 17, 30);//저녁

        var remainCount = 0;
        remainCount = currTimeCheck(nextTime1, remainCount);
        remainCount = currTimeCheck(nextTime2, remainCount);
        remainCount = currTimeCheck(nextTime3, remainCount);

        $("#title").html("짬밥");
        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 먹으면 " + rightCountStr);
    } else if (randomIndex == 5) { // 아침점호도 따로 계산
        leftCountStr = "번";
        var remainCount = 0;
        var nextTime = getNextDailyTime(new Date(), 7, 0);
        remainCount = currTimeCheck(nextTime, remainCount);

        $("#title").html("아침점호");
        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 하면 " + rightCountStr);
    } else if (randomIndex == 6) { // 뜀걸음
        leftCountStr = "번";
        var remainCount = 0;
        var nextTime = getNextDailyTime(new Date(), 16, 0); //뜀걸음
        remainCount = currTimeCheck(nextTime, remainCount);

        $("#title").html("뜀걸음");
        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 뛰면 " + rightCountStr);
    } else if (randomIndex == 8) { // 저녁점호도 따로 계산
        leftCountStr = "번";
        var remainCount = 0;
        var nextTime = getNextDailyTime(new Date(), 21, 0);
        remainCount = currTimeCheck(nextTime, remainCount);

        $("#title").html("저녁점호");
        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 하면 " + rightCountStr);
    } else if (randomIndex == 9) {  //60초 폭탄
        leftCountStr = "초";       
        remainCount = Math.floor(60 * ratio);

        if (remainCount == 0 || remainCount == 1) {
            $("#title").html("폭탄 폭발")
            $("#leftCount").html("얼마 안남았습니다!");            
            $("#rightCount").html("곧 " + rightCountStr);  
        }
        else {
            $("#title").html("폭탄 폭발까지")        
            $("#leftCount").html(remainCount + leftCountStr);
            $("#rightCount").html("후면 " + rightCountStr);
        }    
    } else if (randomIndex == 10) { //역사?
        leftCountStr = "시대";
        var history = (1-ratio) * 100;
        $("#leftCount").addClass("index10");
        /* 역사표 (그냥 단순하게 나눔)
            0-10 : 선사시대
            11-20 : 고조선시대
            21-30 : 삼국시대
            31-40 : 통일신라시대
            41-50 : 후삼국시대
            51-60 : 고려시대
            61-70 : 조선시대
            71-80 : 대한제국시대
            81-90 : 대한민국임시정부시대
            91-100 : 대한민국
         */
        if (history <= 10) {
            remainCount = "선사";
        }else if (history <= 20) {
            remainCount = "고조선"
        }
        else if (history <= 30) {
            remainCount = "삼국" 
        }
        else if (history <= 40) {
            remainCount = "통일신라"
        }
        else if (history <= 50) {
            remainCount = "후삼국"
        }
        else if (history <= 60) {
            remainCount = "고려"
        }
        else if (history <= 70) {
            remainCount = "조선"
        }
        else if (history <= 80) {
            remainCount = "대한제국"
        }
        else if (history <= 90) {
            remainCount = "대한민국임시정부"
        }
        else {
            remainCount = "대한민국";
        }
        $("#title").html("역사로 치자면");        
        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").hide();

    } else {//일주일에 한번
        leftCountStr = "번"
        var nextTime = getNextWeeklyTime(new Date());
        var remainCount = 0;
        while ((nextTime) < endDate) {
            ++remainCount;
            nextTime.setDate(nextTime.getDate() + 7);
        }

        $("#leftCount").html(remainCount + leftCountStr);
        if(randomIndex == 7) {
            $("#title").html("종교행사");
            $("#rightCount").html("더 가면 " + rightCountStr);
        } else {
            if (randomIndex == 0) {//아는형님
                $("#title").html("아는형님");

            } else if (randomIndex == 1) {//골목식당
                $("#title").html("골목식당");

            } else if (randomIndex == 3) {//뮤직뱅크
                $("#title").html("뮤직뱅크");

            } else if (randomIndex == 4) {//나혼자산다
                $("#title").html("나혼자산다");
            }
            $("#rightCount").html("더 보면 " + rightCountStr);
        }
    }

    $("#remainContent").mousedown(function() {
        $("#leftCount").removeClass("animated rubberBand");
    });
}

function nextRandomContent(){
    var randomIndNext = Math.floor(Math.random() * remainContentArr.length);
    while (randomInd == randomIndNext){        
        randomIndNext = Math.floor(Math.random() * remainContentArr.length);
    }
    randomInd = randomIndNext;
    $("#remainContentImg").attr("src", remainContentArr[randomInd]);
    leftCountCal(randomInd);
}