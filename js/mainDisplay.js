var iframeInd = 0;
var iframeArr;
var timeoutCheck;
var firstEntrance = true;
var possibleSearchEngine = ["naver", "google", "daum", "youtube", "yahoo", "baidu", "bing"];//여기에 체크할수 있는 모든 engine 다 추가 시켜줌
var settingsEnterCount = 0;
var settingsEnterCountSub = 0;

var currDate = new Date();

// starting point
$(document).ready(checkStorage);

//actions from mainPage
$("#storageResetButton").click(function() {

    $("#settingsModal").modal("hide");

    bootbox.confirm("설정을 초기화하시겠습니까? </br> 최초 설정으로 이동합니다.", function(result) {
        /* your callback code */ 
        if (result) {
            resetStorage();
        }
    })
});
$("#leftPointer").click(clickLeft);
$("#rightPointer").click(clickRight);
$("#timeUIFront").click(function() {
    $("#timeUIFront").hide();
    $("#timeUIBack").show();
});
$("#timeUIBack").click(function() {
    $("#timeUIBack").hide();
    $("#timeUIFront").show();
});
$("#weatherInfoArea").mousedown(function() {
    if (localStorage.weatherStatus == "weatherFront") {
        $(".weatherFront").hide();
        $(".weatherBack").show();
        localStorage.weatherStatus = "weatherBack";
    } else if (localStorage.weatherStatus == "weatherBack") {
        $(".weatherBack").hide();
        $(".weatherFront").show();
        localStorage.weatherStatus = "weatherFront";
    }
});

//설정 바로가기 action
$("#toWeatherSettingsButton").click(function() {
    presetSettings();
    $("#weatherArrow").show();
    $("#settingsModal").modal("show");
    setDefaultSettingsTab(1, "main");
});
$("#iframe").on("load",function() {
    var iframeContent = $("#iframe").contents();

    iframeContent.find(".rankSettings").click(function() {
        presetSettings();
        $("#settingsModal").modal("show");
        setDefaultSettingsTab(2 , "main");
    });
});

// 우리사이 onOff 설정 내에서 활성화 / 비활성화 시켰을 때
$("#onButton").click(function(){
    $("#loveInfo").find(".loveSetting").prop("disabled", false);
});
$("#offButton").click(function(){
    $("#loveInfo").find(".loveSetting").prop("disabled", true);
});


//actions within settings
$("#weatherInitButton").click(function() {
    $("#toWeatherSettings").hide();
    $("#weatherArrow").hide();
    $("#settingsModal").modal("hide");
    localStorage.setItem("currLocAllowed", true);
    storageCheckLocation();
});
$("#weatherChangeLocButton").click(refreshLocation);
$("#user-name").keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
$("#lover-name").keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
$("#user-rank").click(function() {
    $("#rankArrow").hide();
});
$("#saveSettings").click(function() {

    var engineArray = [];//engineArray 비워두고 시작
    for (var i = 0; i < possibleSearchEngine.length; i++) {
        if ($("#" + possibleSearchEngine[i] + "CB_id").is(":checked")) {//체크되어 있는거만 추가
            engineArray.push(possibleSearchEngine[i]);
        }
    }
    if (engineArray.length == 0) {
        bootbox.alert("최소한 1개의 검색엔진을 선택해주세요!");
    } else {
        onSaveSettings(engineArray);
    }
});
$("#settingButton").click(function() {
    $("#weatherArrow").hide();
    $("#rankArrow").hide();

    presetSettings();//설정 버튼 누를때 presetSettings 실행
    if (settingsEnterCount == 0) {//처음으로 설정 들어갈때만 크레딧 페이지 띄우기
        $("#settingsModal").modal("show");
        setDefaultSettingsTab(0, "main");
    }
    settingsEnterCount++;
});
$("#settingButtonSub").click(function() {
    presetSettingsSub();

    if (settingsEnterCountSub == 0) {//처음으로 설정 들어갈때만 크레딧 페이지 띄우기
        $("#settingsSubModal").modal("show");
        setDefaultSettingsTab(0, "sub");
    }
    settingsEnterCountSub++;
});
$("#sal2019").click(function() {
    $("#sal2019Card").show();
    $("#sal2020Card").hide();
});
$("#sal2020").click(function() {
    $("#sal2020Card").show();
    $("#sal2019Card").hide();
});

$(".hideSave").click(function() {
    $("#saveSettings").hide();
});
$(".showSave").click(function() {
    $("#saveSettings").show();
});

$("body").keydown(pressLeftRight);

function pressLeftRight(e) {
    if (isSearchClosed && ((localStorage.progressBar >= 0) && (localStorage.progressBar <= 100))) {
        if (e.keyCode == 37){
            $("iframe").removeClass("animated fadeIn");
            clickLeft();
        }
        else if (e.keyCode == 39){
            $("iframe").removeClass("animated fadeIn");
            clickRight();
        }
    }
}
/**
 * iframe 넘기기
 */
function clickRight() {
    if (localStorage.setUpComplete == "true" && $("#modalContent").is(":hidden")) {
        $("iframe").addClass("animated fadeIn");
        $("#rightPointer").mousedown(function() {
            $("iframe").removeClass("animated fadeIn");
        });
        iframeInd = ++iframeInd % iframeArr.length;
        $("iframe").attr("src", iframeArr[iframeInd]);
        localStorage.setItem("currIframe", iframeInd);
    }
}

function clickLeft() {
    if (localStorage.setUpComplete == "true" && $("#modalContent").is(":hidden")) {
        $("iframe").addClass("animated fadeIn");
        $("#leftPointer").mousedown(function() {
            $("iframe").removeClass("animated fadeIn");
        });
        iframeInd = (iframeArr.length + iframeInd - 1) % iframeArr.length;
        $("iframe").attr("src", iframeArr[iframeInd]);        
        localStorage.setItem("currIframe", iframeInd);
    }
}

// 정보를 입력받았을 때만 환영합니다 띄우고 3초 후 보여주고, 새로고침 or 새 탭 시에는 바로 띄우게 하기 위한 변수
function resetStorage() {
    localStorage.clear();
    // indexedDB자체를 다 지움
    var req = indexedDB.deleteDatabase("couplePic");
    req.onsuccess = function () {
    };
    req.onerror = function () {
        // alert("데이터베이스를 지우는데 오류가 발생했습니다.");
    };
    req.onblocked = function () {
        // alert("데이터베이스를 지우는데 오류가 발생했습니다.");
    };

    location.reload();
}

function loadPage() {
    if (firstEntrance) {
        $("#mainInit").hide();
        $("#loadLogo").attr("src", "/img/logo.png");
        $("#mainLoad").css("display", "inline");
        firstEntrance = false;
        setTimeout(function() {
            $("#mainLoad").fadeOut(1000, function() {
                $("#mainLoad").hide();
                $("#mainInit").show();
                nameCheck();
            })
        }, 2000);
    } else {
        nameCheck();
    }
}

function checkStorage() {
    $("#timeColon").hide();

    if (localStorage.length == 0) {
        // 정보 입력을 받았을 때만 timeoutCheck를 1로 바꿔줘서 3초 딜레이
        timeoutCheck = 1;
        $("#defaultBG").css("background-image","url(../img/mainback3.jpg)");
        loadPage();
    } else {
        if (!localStorage.name || !localStorage.identity|| !localStorage.branch || !localStorage.enlistDate) {            
            bootbox.alert("최초설정이 완료되지 않았습니다.");

            timeoutCheck = 1;
            localStorage.clear();       
            $("#defaultBG").css("background-image","url(../img/mainback3.jpg)");
            nameCheck();
        }
        else{
            displayWidgets();
        }
    }
}

/**
 * welcome message after initial setup
 */
function initDoneDisplay() {
    localStorage.setItem("currLocAllowed", false);//처음에는 날씨 위치정보 허용 안 된 상태
    localStorage.setItem("setUpComplete", true);
    localStorage.couplePicFileName = "";//처음에는 커플사진 아무것도 설정 안 되어 있는 상태
    localStorage.weatherStatus = "weatherFront";//처음에는 무조건 날씨 앞면 보이게

    if (localStorage.name != "" && localStorage.identity != "" && !(localStorage.branch == "undefined") && localStorage.enlistDate != "") {  
        var welcomeStr = localStorage.name + "님!</br>환영합니다";
        $("#welcomeMsg").html(welcomeStr);
        $("#welcomeMsg").css("display", "inline");
        $("#welcomeMsg").fadeOut(2000, displayWidgets());
       
    } else {
        bootbox.alert("모든 정보를 입력하지 않았습니다.");//TODO: make a custom alert message
        nameCheck();
    }
}

/**
 * remove welcomeMsg, display widgets and everything else
 */
function displayWidgets() {
    if(timeoutCheck==1) {
        setTimeout(displayAllFunc, 2000);
    }
    else {
        displayAllFunc();
    }
    var endDateStr = calculateEndDate();//왠지 모르겠는데 필요함;
}

/**
 * show everything on main page
 */
function displayAllFunc() {

    //모든 이미지 오른쪽 마우스 클릭 금지
    $("img").on("contextmenu",function(){
        return false;
    }); 

    if (window.innerWidth <= "634") {
        searchUIOpen();
    }
    //만약 군생활 끝났거나, 시작도 안했으면 mainItem1만 띄우기
    if (localStorage.progressBar > 100 || localStorage.progressBar < 0) {
        iframeArr = ["mainItem1.html"];
        $("#leftPointer").hide();
        $("#rightPointer").hide();
    } else if (localStorage.switchOnOff == "off" || !localStorage.switchOnOff || localStorage.switchOnOff == "undefined") {
        iframeArr = ["mainItem1.html", "mainItem2.html"];
        localStorage.switchOnOff = "off";
    } else if (localStorage.switchOnOff == "on") {
        iframeArr = ["mainItem1.html", "mainItem2.html", "mainItem3.html"];
    }

    if (!localStorage.background) {
        localStorage.setItem("background", "img/mainback3.jpg");
        $("#searchUI").css("box-shadow", "0px 0px 5px #001C32");
        $(".fitBGborder").css("background-color", "#001C32");
        $(".fitBGborder").css("border-color", "#001C32"); 
        $(".btn-primary").css("background-color", "#001C32");
        $(".btn-primary").css("border", "1px solid #001C32");  
        for (i = 0; i < cardHeader.length; i++) {
            $(cardHeader[i]).addClass("mainback3");
        }
        for (i = 0; i < switchField.length; i++) {
            $(switchField[i]).addClass("mainback3");
        }
    }

    if (!localStorage.timeOpt) {
        localStorage.setItem("timeOpt", "12hr");
    }

    if (!localStorage.newTabOpt) {
        localStorage.setItem("newTabOpt", "off");
    }

    if (!localStorage.salYear) {
        localStorage.setItem("salYear", "sal" + new Date().getFullYear());
    }

    // 날씨 보여주기
    if (localStorage.currLocAllowed == "true") {
        getWeather();
    }
    else{
        $("#toWeatherSettings").show();
    }

    // 새탭에서 열기 옵션 설정
    checkOpenInNewTab();

    $("#iframe").contents(function() {
        location.reload();
    });

    if(!localStorage.currIframe){
        localStorage.setItem("currIframe", 0);
    }
    iframeInd = localStorage.currIframe;
    if (iframeInd == 0){
        $("#iframe").attr("src", iframeArr[0]);
    }
    else if (iframeInd == 1){
        $("#iframe").attr("src", iframeArr[1]);
    }
    else if (iframeInd == 2){
        $("#iframe").attr("src", iframeArr[2]);
    }

    $("#mainInit").css("display","none");
    $("#mainItem").css("display","inline");
    $(".widget").css("visibility","visible");
    $("#timeColon").show();
   
    var imgUrl = "url(" + localStorage.background + ")";    
    $("#defaultBG").css("background-image", imgUrl);
    
    var dDayCount = "D-" + localStorage.todoDays + "일!";
    $("#dDayDisplaySm").html(dDayCount);
    $('#settingsModal').appendTo("body");
    $('#settingsModal').modal({
        keyboard: true,
        backdrop: true,
        focus: true,
        show: false
    });

    $('#settingsSubModal').appendTo("body");
    $('#settingsSubModal').modal({
        keyboard: true,
        backdrop: true,
        focus: true,
        show: false
    });  
    
    // presetSettings();
}

/**
 * 새탭에서 여는지 확인
 * 
 * 군관련사이트, 군인혜택만 해당
 */
function checkOpenInNewTab() {
    if (localStorage.newTabOpt == "off") {
        $(".tabOpt").find("a").attr("target", "_self");
    } else if (localStorage.newTabOpt == "on") {
        $(".tabOpt").find("a").attr("target", "_blank");
    }
}

/**
 * settings
 */
function presetSettings() {//설정창 들어갔을때 local에 있는 내용으로 presetting만

    // 맨 처음에 init 끝나고 나서 서치바 안 열고 설정 들어가면 localstorage에 아무것도 없어서 이걸로 preset
    if (!localStorage.currEngine) {
        engineArray = ["naver", "google", "daum", "youtube"];
        localStorage.setItem("currEngine", "naver");
        localStorage.setItem("targetUrl", targetUrlNaver);
        localStorage.setItem("engineArray", JSON.stringify(engineArray));
    }
    
    //preset time
    if (localStorage.timeOpt == "12hr") {
        $("input[name=timeRadioSettings][value='12hr']").prop("checked",true);
    } else if (localStorage.timeOpt == "24hr") {
        $("input[name=timeRadioSettings][value='24hr']").prop("checked",true);
    }
    //preset new tab option
    if (localStorage.newTabOpt == "on") {
        $("input[name=newTabRadioSettings][value='on']").prop("checked",true);

    } else if (localStorage.newTabOpt == "off") {
        $("input[name=newTabRadioSettings][value='off']").prop("checked",true);

    }
    //preset searchEngine
    var engineArray2 = JSON.parse(localStorage.engineArray);
    for (var j = 0; j < engineArray2.length; j++) {
        if (jQuery.inArray(engineArray2[j], possibleSearchEngine) == -1) {
            $("#" + engineArray2[j] + "CB_id").prop("checked", false);
        } else {
            $("#" + engineArray2[j] + "CB_id").prop("checked", true);
        }
    }
    // preset weather
    if (localStorage.currLocAllowed == "false") {
        $("#weatherChangeLocButton").hide();
        $("#weatherInitButton").show();
    } else if (localStorage.currLocAllowed == "true") {
        $("#weatherInitButton").hide();
        $("#weatherChangeLocButton").show();
    }

    //preset name
    $("#user-name").attr("value", localStorage.name);
    //preset identity
    if (localStorage.identity == "soldier") {
        $("input[name=identityRadioSettings][value='soldier']").prop("checked",true);
    } else if (localStorage.identity == "girlfriend") {
        $("input[name=identityRadioSettings][value='girlfriend']").prop("checked",true);
        $(".fitQuestion").html("남자친구의 ");
    }
    //preset branch
    if (localStorage.branch == "army") {
        $("#user-branch option[value=army]").prop("selected", "selected");
    } else if (localStorage.branch == "navy") {
        $("#user-branch option[value=navy]").prop("selected", "selected");
    } else if (localStorage.branch == "airForce") {
        $("#user-branch option[value=airForce]").prop("selected", "selected");
    } else if (localStorage.branch == "marine") {
        $("#user-branch option[value=marine]").prop("selected", "selected");
    } else if (localStorage.branch == "socialService") {
        $("#user-branch option[value=socialService]").prop("selected", "selected");
    } else if (localStorage.branch == "police") {
        $("#user-branch option[value=police]").prop("selected", "selected");
    }

    //preset rank
    if (localStorage.rank == "이병") {
        $("#user-rank option[value=이병]").prop("selected", "selected");
    } else if (localStorage.rank == "일병") {
        $("#user-rank option[value=일병]").prop("selected", "selected");
    } else if (localStorage.rank == "상병") {
        $("#user-rank option[value=상병]").prop("selected", "selected");
    } else if (localStorage.rank == "병장") {
        $("#user-rank option[value=병장]").prop("selected", "selected");
    } else {
        $("#user-rank option[value=rankQ]").prop("selected", "selected");
    }

    //preset date
    $("#user-enlistDate").val(localStorage.enlistDate);
    //preset background
    if (localStorage.background == "img/mainback1.jpg") {
        $("#img1").prop("checked", true);
    } else if (localStorage.background == "img/mainback2.jpg") {
        $("#img2").prop("checked", true);
    } else if (localStorage.background == "img/mainback3.jpg") {
        $("#img3").prop("checked", true);
    } else if (localStorage.background == "img/mainback4.jpg") {
        $("#img4").prop("checked", true);
    } else if (localStorage.background == "img/mainback5.jpg") {
        $("#img5").prop("checked", true);
    }
    //preset relationship info 
    $("#lover-name").attr("value", localStorage.loverName);
    $("#lover-birthday").val(localStorage.loverBD);//nothing yet
    $("#user-birthday").val(localStorage.userBD);//nothing yet
    $("#first-date").val(localStorage.relStartDate);
    
    // class "loveSetting"만들어서 그 하위 div (lover-name, lover-birthday, user-birthday, first-date)에다가 줌
    $("#loveInfo").find(".loveSetting").prop("disabled", true); //맨 처음엔 witchOnOff가 localStorage에 안들어가서 default로 줌

    if (localStorage.switchOnOff == "on") {
        $("input[name=loveRadioSettings][value='on']").prop("checked",true);
        $("#loveInfo").find(".loveSetting").prop("disabled", false);        
    } else if (localStorage.switchOnOff == "off") {
        $("input[name=loveRadioSettings][value='off']").prop("checked",true);
        $("#loveInfo").find(".loveSetting").prop("disabled", true);
    }

    //select text field on click
    $("#user-name").click(function() {
        this.select();
    });
    $("#lover-name").click(function() {
        this.select();
    });
}

function presetSettingsSub() {
    if (localStorage.salYear == "sal2019") {
        $("input[name=salSwitch][value='2019년']").prop("checked",true);
        $("#sal2019Card").show();
        $("#sal2020Card").hide();
    } else if (localStorage.salYear == "sal2020") {
        $("input[name=salSwitch][value='2020년']").prop("checked",true);
        $("#sal2019Card").hide();
        $("#sal2020Card").show();
    }
}

function onSaveSettings(engineArray) {
    // 우리사이 키고 저장할때 확인
    if ($("input[name=loveRadioSettings]:checked").val() == "on") {//우리사이 켰을때 확인
        if ($("#lover-name").val() == "" || $("#first-date").val() == "") {
            bootbox.alert("우리사이의 모든 정보를 입력해주세요");
            return;
        }

        // 생일두개가 사귄날짜보다 빠르진 않는지 & 미래에서 사귈순 없으니까
        let loverBD = new Date($("#lover-birthday").val());
        let userBD = new Date($("#user-birthday").val());
        let firstDate = new Date($("#first-date").val());

        if (firstDate - loverBD <= 0 || firstDate - userBD <= 0 || (currDate < firstDate)) {
            bootbox.alert("생일과 사귄날짜를 올바르게 입력해주세요");
            return;
        }
    }

    //settings-시간
    localStorage.setItem("timeOpt", $("input[name=timeRadioSettings]:checked").val());
    //settings-검색엔진 
    localStorage.setItem("engineArray", JSON.stringify(engineArray));//engineArray 업데이트
    if (!($("#" + localStorage.currEngine + "CB_id").is(":checked"))) {
        localStorage.setItem("currEngine", engineArray[0]);
        //현재 engine을 없애면 그냥 남아있는거 중 처음으로, 현재 engine 안 없애고 앞의 index의 engine을 추가시키면 안 돌아가게
    }
    //settings-새탭 옵션
    localStorage.setItem("newTabOpt", $("input[name=newTabRadioSettings]:checked").val())

    // settingsInfo
    localStorage.setItem("name", $("#user-name").val());
    localStorage.setItem("identity", $("input[name=identityRadioSettings]:checked").val());
    localStorage.setItem("branch", $("#user-branch").val());
    localStorage.setItem("rank", $("#user-rank").val());
    localStorage.setItem("enlistDate", $("#user-enlistDate").val());
    calculateEndDate();

    // settingsBG
    localStorage.setItem("background", $("input[name=bgImgRadioSettings]:checked").val())

    // settingsLove
    localStorage.setItem("switchOnOff", $("input[name=loveRadioSettings]:checked").val());

    localStorage.setItem("loverName", $("#lover-name").val());
    localStorage.setItem("loverBD", $("#lover-birthday").val());
    localStorage.setItem("userBD", $("#user-birthday").val());
    localStorage.setItem("relStartDate", $("#first-date").val());

    location.reload();
}

function setDefaultSettingsTab(index, mainOrSub) {
    var settingsTabs;
    var settingsPanes;

    if (mainOrSub == "main") {
        settingsTabs = $(".settingsMain");
        settingsPanes = $(".settingsPaneMain");
        $("#saveSettings").hide();
    } else {
        settingsTabs = $(".settingsSub");
        settingsPanes = $(".settingsPaneSub")
    }

    for (var i = 0; i < settingsTabs.length; i++) {
        settingsTabs[i].classList.remove("active");
        settingsPanes[i].classList.remove("active");
    }
    settingsTabs[index].classList.add("active");
    settingsPanes[index].classList.add("active");
}