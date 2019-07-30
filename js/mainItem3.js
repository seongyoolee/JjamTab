$("#relationshipInfo").click(function() {
    if (window.innerWidth != 272){
        $("#relationshipInfo").hide();
        $("#relationshipInfoBack").css("display", "flex");
    }    
});
$("#relationshipInfoBack").click(function() {
    if (window.innerWidth != 272){
        $("#relationshipInfoBack").hide();
        $("#relationshipInfo").show();
    }
});

$(".imgSetting").click(function() {
    $("#picModal").modal("hide");
});

$(".coupleImg").click(function() {
    for (var i = 1; i <= 3; i++) {
        if ($("#withGF" + i).attr("src") != "img/imgIcon.png") {
        }
    }
})
$("#betweenPic1").mouseover(function() {
    $("#betweenPic1").addClass("animated swing");
});
$("#betweenPic1").mouseleave(function() {
    $("#betweenPic1").removeClass("animated swing");
});
$("#betweenPic2").mouseover(function() {
    $("#betweenPic2").addClass("animated swing");
});
$("#betweenPic2").mouseleave(function() {
    $("#betweenPic2").removeClass("animated swing");
});
$("#betweenPic3").mouseover(function() {
    $("#betweenPic3").addClass("animated swing");
});
$("#betweenPic3").mouseleave(function() {
    $("#betweenPic3").removeClass("animated swing");
});
$("#imgUpload1").change(function(e) {
    currFileNum = 1;
    fileUpload(e);
});
$("#imgUpload2").change(function(e) {
    currFileNum = 2;
    fileUpload(e);
});
$("#imgUpload3").change(function(e) {
    currFileNum = 3;
    fileUpload(e);
});
$("#close1").click(function(e) {
    $("#check1").css("visibility", "hidden");
    e.preventDefault();
    deleteImg(1);
});
$("#close2").click(function(e) {
    $("#check2").css("visibility", "hidden");
    e.preventDefault();
    deleteImg(2);
});
$("#close3").click(function(e) {
    $("#check3").css("visibility", "hidden");
    e.preventDefault();
    deleteImg(3);
});

$("#imgSave").click(saveToDb);
$("#imgRevert").click(revertImg);

$("#anniversaryImg").click(celebrate);

var loverBD = new Date(localStorage.loverBD);
var userBD = new Date(localStorage.userBD);
var today = new Date();
var timeZoneOffSet= new Date().getTimezoneOffset() * 60000;
var todayOff = new Date(today - timeZoneOffSet);
var todayISO = todayOff.toISOString().slice(0,10).replace(/-/g, "");
var relDate = new Date(localStorage.relStartDate);
var year, month, day;
var nextAnniversaryDate;

// Database
let db;
let dbVersion = 1;
let dbReady = false;
var currFileNum;
var firstfile;
var secondfile;
var thirdfile;

$(document).ready(function() {

    //모든 이미지 오른쪽 마우스 클릭 금지
    $("img").on("contextmenu",function(){
        return false;
    }); 

    $("body").css({
        "text-align": "center"
    });
    $("#anniversayDate").hide();

    checking();
    checkAnniversary();

    $(".frame").attr("src", "img/frame.png");

    displayDates();    
    $("#relationshipInfoBack").hide();
    
    //테마
    theme();    
});

function checking() {
    if (!localStorage.loverName || !localStorage.relStartDate){
        $("#instruction").show();  
        $("#pageContent").hide(); 
    } else {
        $("#instruction").hide(); 
        $("#pageContent").show(); 

        $("#userName").html(localStorage.name);
        $("#loverName").html(localStorage.loverName);
        var daysInRelVal = Math.floor((new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()) - new Date(relDate.getFullYear(), relDate.getMonth() - 1, relDate.getDate())) / (1000 * 3600 * 24)) + 1;
        $("#daysInRel").html("D+" + daysInRelVal);
        $("#infoBox").hide();

        if (!localStorage.rot1) {
            localStorage.rot1 = 0;
        }
        if (!localStorage.rot2) {
            localStorage.rot2 = 0;
        }
        if (!localStorage.rot3) {
            localStorage.rot3 = 0;
        }

        //open database
        initDb();

        if (localStorage.background == "img/mainback1.jpg") {
            $(".font-color").css("color", "#303030");
        }
        else if (localStorage.background == "img/mainback1.jpg") {
            $(".font-color").css("color", "#303030");
        }
    }    
}

function checkAnniversary() {    
    var anniversaryDateArray = [];
    //100일, 200일, 300일, .... 추가
    for (var i = 1; i<11; i++){
        var relCal = relDate;
        relCal.setDate(relDate.getDate() + i*100 - 1);
        var relCal = [relCal, i*100 + "일"];
        anniversaryDateArray.push(relCal);
        relDate = new Date(localStorage.relStartDate);
    }
    for (var i = 1; i<5; i++){
        relCal365 = new Date(relDate.getFullYear() + i, relDate.getMonth(), relDate.getDate());
        relCal365 = [relCal365, i + "주년"];
        anniversaryDateArray.push(relCal365);
    }    
    //기본제공 4년, 그 이후
    anniversaryDateArray.push([new Date(relDate.getFullYear() + 100, relDate.getMonth(), relDate.getDate()), "장수커플"]);

    //유저가 생일을 다 입력했을떄만 나옴, 아니면 없음
    if (localStorage.loverBD && localStorage.userBD){
        var lastYearLoverBD = new Date(today.getFullYear() - 1, loverBD.getMonth(), loverBD.getDate());
        var thisYearLoverBD = new Date(today.getFullYear(), loverBD.getMonth(), loverBD.getDate());
        var nextYearLoverBD = new Date(today.getFullYear() + 1, loverBD.getMonth(), loverBD.getDate());
        var lastYearUserBD = new Date(today.getFullYear() - 1, userBD.getMonth(), userBD.getDate());
        var thisYearUserBD = new Date(today.getFullYear(), userBD.getMonth(), userBD.getDate());
        var nextYearUserBD = new Date(today.getFullYear() + 1, userBD.getMonth(), userBD.getDate());
        lastYearLoverBD = [lastYearLoverBD, "연인생일"];
        thisYearLoverBD = [thisYearLoverBD, "연인생일"];
        nextYearLoverBD = [nextYearLoverBD, "연인생일"];
        lastYearUserBD = [lastYearUserBD, "본인생일"];
        thisYearUserBD = [thisYearUserBD, "본인생일"];
        nextYearUserBD = [nextYearUserBD, "본인생일"];

        //사귄날이 2019년도인데 2018년도 생일 기념일은 말이 안된다, 그거 계산;
        if (relDate > thisYearLoverBD[0] || relDate > thisYearUserBD[0]){
            //기본적으로 다음년도 생일 추가
            anniversaryDateArray.push(nextYearLoverBD);
            anniversaryDateArray.push(nextYearUserBD);
            //이번년도 생일이 사귄날짜 이후면 추가
            if(relDate < thisYearLoverBD[0]){
                anniversaryDateArray.push(thisYearLoverBD);
            }            
            if (relDate < thisYearUserBD[0]){
                anniversaryDateArray.push(thisYearUserBD);
            }
        }
        else{ 
            anniversaryDateArray.push(lastYearLoverBD);
            anniversaryDateArray.push(thisYearLoverBD);
            anniversaryDateArray.push(nextYearLoverBD);
            anniversaryDateArray.push(lastYearUserBD);
            anniversaryDateArray.push(thisYearUserBD);
            anniversaryDateArray.push(nextYearUserBD);
        }
    }
    // 기념일날 전부 string으로 변환
    for (var i = 0; i < anniversaryDateArray.length; i++){
        var dateFormat = anniversaryDateArray[i][0];
        if(isValidDate(dateFormat.getFullYear(), dateFormat.getMonth(), dateFormat.getDate())){    
            //toISOString()하면 무조건 UTC기준으로 간다고 해서 local timezoneOffSet 확인해줘야함
            var convertUTCtoKST = new Date(dateFormat - timeZoneOffSet);
            anniversaryDateArray[i][0] = convertUTCtoKST.toISOString().slice(0,10).replace(/-/g, "");
        }
    }
    //기념일날 기준으로 sort
    anniversaryDateArray.sort();

    //오늘기준으로 기념일인지, 전 기념일은 뭔지, 다음 기념일은 뭔지 계산 및 보여주기
    for (var i = 0; i < anniversaryDateArray.length; i++) {
        var dateCheck = anniversaryDateArray[i];
        
        //오늘이 기념일
        if (dateCheck[0] == todayISO){
            $("#anniversaryDate").html(dateCheck[1]);
            celebrate();
            
            break;
        }
        //기본제공 4년, 그 이후 (단, 생일 입력 안했을때만 나옴)
        else if (dateCheck[1] == "장수커플"){
            $("#anniversaryDate").hide();
            $("#nextAnni").html("결혼은 언제하세요?");
        }
        //다음기념일 계산
        else if (dateCheck[0] > todayISO){
            var dateNextAnni = new Date(dateCheck[0].slice(0, 4), dateCheck[0].slice(4,6) - 1, dateCheck[0].slice(6,8));
            var tilNextAnni = Math.floor((dateNextAnni - today) / (1000 * 3600 * 24)) + 1;;
            nextAnniversaryDate = dateCheck[1];    
            // if (nextAnniversaryDate == null)
            $("#anniversaryDate").hide();
            $("#nextAnni").html(nextAnniversaryDate + " 까지");
            $("#numDaysToNextAnni").html("D-" + tilNextAnni);

            break;
        }
    }
}

function isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
        return true;
    }
    return false;
}

function displayDates() {
    var waitDays = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - new Date(relDate.getFullYear(), relDate.getMonth(), relDate.getDate())) / (1000 * 3600 * 24)) + 1;
    var doneDays = localStorage.wholeDays - localStorage.todoDays;
    if (waitDays > doneDays){
        $("#waitDaysCount").html("D+" + doneDays);
    }
    else
    {
        $('#waitDaysCount').html("D+" + waitDays);
    }
    $("#leftDaysCount").html("D-" + localStorage.todoDays);
}

function celebrate() {
    $("#anniveraryDate").show();
    $("#anniversaryDate").css("font-size", "1.5rem");
    $('#anniversaryDate').addClass("animated tada");
}
/**
 * Image Upload / Change Couple Pic
 */
function initDb() {

    let request = indexedDB.open("couplePic", dbVersion);
    
    request.onerror = function(e) {
    }
    request.onsuccess = function(e) {
        db = e.target.result;

        let trans = db.transaction(["couplePicOS"], "readonly");
        
        //preset couple picture on load
        fetchFromDb(1);
        fetchFromDb(2);
        fetchFromDb(3);

    }
    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        db.createObjectStore("couplePicOS");
    }
}

function fileUpload(e) {
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e) {
        let bits = e.target.result;
        if (currFileNum == 1) {
            firstfile = {
                created: new Date(),
                data: bits
            }
            $("#check1").css("visibility", "visible");
        } else if (currFileNum == 2) {
            secondfile = {
                created: new Date(),
                data: bits
            }
            $("#check2").css("visibility", "visible");

        } else if (currFileNum == 3) {
            thirdfile = {
                created: new Date(),
                data: bits
            }
            $("#check3").css("visibility", "visible");
        }
    }
}

function saveToDb() {
    // db에 파일 저장
    let trans = db.transaction(["couplePicOS"], "readwrite");
    let os = trans.objectStore("couplePicOS");

    // null check first
    if (firstfile != null) {
        let addReq1 = os.put(firstfile, 1);
        addReq1.onerror = function(e) {
        }
        addReq1.onsuccess = function(e) {            
            fetchFromDb(1);
        }
    }

    if (secondfile != null) {
        let addReq2 = os.put(secondfile, 2);
        addReq2.onerror = function(e) {
        }
        addReq2.onsuccess = function(e) {    
            fetchFromDb(2);
        }
    }
    if (thirdfile != null) {
        let addReq3 = os.put(thirdfile, 3);
        addReq3.onerror = function(e) {
        }
        addReq3.onsuccess = function(e) {    
            fetchFromDb(3);
        }
    }
}

function fetchFromDb(index) {
    let trans = db.transaction(["couplePicOS"], "readonly");
    req = trans.objectStore("couplePicOS").get(index);
    req.onsuccess = function(e) {
        let record = e.target.result;

        // display image
        if (record == null) {
            $("#withGF" + index).attr("src", "img/imgIcon2.png");
            $("#icon" + index).removeClass("fa-exchange");
            $("#icon" + index).addClass("fa-plus-circle");     
            $("#check" + index).css("visibility", "hidden");       
        } else {
            var imgSrcStr = "data:image/jpeg;base64," + btoa(record.data);
            $("#withGF" + index).attr("src", imgSrcStr);
            $("#withGF" + index).show();
            $("#icon" + index).removeClass("fa-plus-circle");
            $("#icon" + index).addClass("fa-exchange");

            $("#betweenPic" + index).css("border", "none");
            $("#betweenPic" + index).css("background-color", "transparent");
            
            $("#check" + index).css("visibility", "visible");
        }
    }
}

function revertImg() {//그냥 objectstore 비우면 됨
    let trans = db.transaction(["couplePicOS"], "readwrite");
    let req = trans.objectStore("couplePicOS").clear();
    req.onsuccess = function(e) {
        fetchFromDb(1);
        fetchFromDb(2);
        fetchFromDb(3);
    }
}

function deleteImg(index) {
    let trans = db.transaction(["couplePicOS"], "readwrite");
    let req = trans.objectStore("couplePicOS").delete(index);
    req.onsuccess = function(e) {
        $("#withGF" + index).attr("src", "img/imgIcon2.png");

        if (index == 1){
            firstfile = null;
        }
        else if (index == 2){
            secondfile = null;
        }
        else {
            thirdfile = null;
        }

    }
}

function theme() {
    if (localStorage.background ==  "img/mainback1.jpg") {
        $(".modal-header").css("background-color", "rgb(127, 192, 179)");
        $(".modal-header").css("border-color", "rgb(127, 192, 179)");
        $("#imgSave").css("background-color", "rgb(127, 192, 179)");
        $("#imgSave").css("border-color", "rgb(127, 192, 179)");
    }
    else if (localStorage.background ==  "img/mainback2.jpg") {
        $(".modal-header").css("background-color", "#328ba3");
        $(".modal-header").css("border-color", "#328ba3");
        $("#imgSave").css("background-color", "#328ba3");
        $("#imgSave").css("border-color", "#328ba3");
    }
    else if (localStorage.background ==  "img/mainback3.jpg") {
        $(".modal-header").css("background-color", "#001C32");
        $(".modal-header").css("border-color", "#001C32");
        $("#imgSave").css("background-color", "#001C32");
        $("#imgSave").css("border-color", "#001C32");
    }
    else if (localStorage.background ==  "img/mainback4.jpg") {
        $(".modal-header").css("background-color", "#30517E");
        $(".modal-header").css("border-color", "#30517E");
        $("#imgSave").css("background-color", "#30517E");
        $("#imgSave").css("border-color", "#30517E");
    }
    else if (localStorage.background ==  "img/mainback5.jpg") {
        $(".modal-header").css("background-color", "#E0B870");
        $(".modal-header").css("border-color", "#E0B870");
        $("#imgSave").css("background-color", "#E0B870");
        $("#imgSave").css("border-color", "#E0B870");
    }
}