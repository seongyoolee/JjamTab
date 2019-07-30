var isSearchClosed = true;
var isHeaderWidgetShown = true;

var naverIconLink = $("#naverCB_id").val();
var googleIconLink = $("#googleCB_id").val();
var daumIconLink = $("#daumCB_id").val();
var youtubeIconLink = $("#youtubeCB_id").val();
var yahooIconLink = $("#yahooCB_id").val();
var baiduIconLink = $("#baiduCB_id").val();
var bingIconLink = $("#bingCB_id").val();

var engineArray = [];//ex) ["naver", "google", "daum", "youtube"]
// var engineHomeArray = ["https://naver.com", "https://google.com", "https://daum.net","https://youtube"];
var currEngine;//ex)"naver"

var urlString;
var targetUrlNaver = "https://search.naver.com/search.naver?query=";
var targetUrlGoogle = "https://www.google.com/search?q=";
var targetUrlDaum = "https://search.daum.net/search?q=";
var targetUrlYoutube = "https://www.youtube.com/results?search_query=";
var targetUrlYahoo = "https://search.yahoo.com/search?p=";
var targetUrlBaidu = "https://www.baidu.com/s?wd=";
var targetUrlBing = "https://www.bing.com/search?q=";
var targetUrl;

$("#searchBar").keyup(onEnterPressed);
$(window).click(searchUIClose);
$(".search").click(searchUIOpen);
$("#engineLogo").click(searchEngineChange);

$(window).on("resize", function() {
  if(window.innerWidth < "643") {
    searchUIOpen();
  }
  else {
    searchUIClose();
  }
});

function onEnterPressed() {
  urlString = $("#searchBar").val();

  if(event.which==13 || event.keycode==13) {
    if (urlString == "") {
      searchEngineHome();
    } else {
      search();
    }
  }
}

function search() {
  searchBar.value = "";
  targetUrl = localStorage.targetUrl;
  urlString =  targetUrl+ urlString;

  if (localStorage.newTabOpt == "on") {
    var win = window.open(urlString, "_blank");
    if (win) {
      win.focus();
    } else {
      bootbox.alert("팝업을 허용해주세요");
    }
  } else if (localStorage.newTabOpt == "off") {
    location.href = urlString;
  }
}

function searchIcoClose() {
  searchIco.style.display ="none";
}

function searchUIOpen() {
    if (!localStorage.currEngine) {//처음에 열었을때, 기본으로 네이버 설정, 기본으로 이거 4개 넣어줌
        engineArray = ["naver", "google", "daum", "youtube"];
        localStorage.setItem("currEngine", "naver");
        localStorage.setItem("targetUrl", targetUrlNaver);
        localStorage.setItem("engineArray", JSON.stringify(engineArray));
    } else {
        currEngine = localStorage.currEngine;//로컬에서 현재 엔진 가져옴

        if (currEngine == "naver") {//naver
            localStorage.setItem("targetUrl", targetUrlNaver);
        } else if (currEngine == "google") {//google
            localStorage.setItem("targetUrl", targetUrlGoogle);
        } else if (currEngine == "daum") {//daum
            localStorage.setItem("targetUrl", targetUrlDaum);
        } else if (currEngine == "youtube") {//youtube
            localStorage.setItem("targetUrl", targetUrlYoutube);
        } else if (currEngine == "yahoo") {//yahoo
            localStorage.setItem("targetUrl", targetUrlYahoo);
        } else if (currEngine == "baidu") {//baidu
            localStorage.setItem("targetUrl", targetUrlBaidu);
        } else if (currEngine == "bing") {//bing
            localStorage.setItem("targetUrl", targetUrlBing);
        }
    }

    // change engineImg in searchBar
    var currEngineLink;
    if (currEngine == "naver") {
        currEngineLink = naverIconLink;
    } else if (currEngine == "google") {
        currEngineLink = googleIconLink;
    } else if (currEngine == "daum") {
        currEngineLink = daumIconLink;
    } else if (currEngine == "youtube") {
        currEngineLink = youtubeIconLink;
    } else if (currEngine == "yahoo") {
      currEngineLink = yahooIconLink;
    } else if (currEngine == "baidu") {
      currEngineLink = baiduIconLink;
    } else if (currEngine == "bing") {
      currEngineLink = bingIconLink;
    }
    $("#engineLogo").attr("src", currEngineLink);

    if(isSearchClosed) {
      searchIco.style.display = "none";
      if (window.innerWidth < "643"){
        searchUI.style.width = "90vw";
        searchBar.style.width = "75vw";
      }
      else{          
        searchUI.style.width = "43vw";
        searchBar.style.width = "38vw";
      }
      searchBar.style.display = "inline-flex";    
      if (window.innerWidth > 643) {
        setTimeout(function() {
          searchEngine.style.display = "inline-flex";
          searchIco.style.width="50px";
          searchIco.style.display = "inline-flex";
        }, 500);
      }
      else {
        searchEngine.style.display = "inline-flex";
        searchIco.style.width="50px";
        searchIco.style.display = "inline-flex";
      }
      
      isSearchClosed = false;

      // 뭔가를 적었을때만 검색되게. 이전에 searchUI 켰다가 닫고 다시 킬때, searchIconImg 눌러지면 바로 검색되가지고, 이렇게 바꿈.
      $("#searchIconImg").click(function() {
        if (searchBar.value != "") {
          search();
        }
      });
    }  
}

function searchUIClose() {
  if ($(event.target).hasClass("search") || window.innerWidth <= "643") {
    if (window.innerWidth <= "643"){
      isSearchClosed = true;
    }    
  } 
  else{
    searchEngine.style.display = "none";
    searchBar.style.display = "none";
    searchBar.style.width = "0px";
    searchUI.style.width = "50px";
    searchBar.value = "";
    searchIco.style.width="50px";
    if (!isSearchClosed) {
      searchIco.style.display="none";
    }
    setTimeout(function() { searchIco.style.display = "inline-flex"; }, 500);
    isSearchClosed = true;    
    $("#engineLogo").removeClass("animated flipInX");
  }
}
var click=false;
function searchEngineChange() {
    engineArray = JSON.parse(localStorage.engineArray);

    var nextEngineInd = (jQuery.inArray(currEngine, engineArray) + 1) % engineArray.length;
    var nextEngine = engineArray[nextEngineInd];

    localStorage.setItem("currEngine", nextEngine);

    $("#engineLogo").addClass("animated flipInX");
    $("#engineLogo").mousedown(function() {
      $("#engineLogo").removeClass("animated flipInX");
    });
}

function searchEngineHome() {
  var domain = ".com";
  if (localStorage.currEngine == "daum") {
    domain = ".net";
  }

  if (localStorage.newTabOpt == "on") {
    var win = window.open("https://www." + localStorage.currEngine + domain, "_blank");
    if (win) {
      win.focus();
    } else {
      bootbox.alert("팝업을 허용해주세요");
    }
  } else if (localStorage.newTabOpt == "off") {
    location.href = "https://www." + localStorage.currEngine + domain;
  }
}
