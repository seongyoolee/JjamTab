var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getWeather() {
    var openWeatherMap = "http://api.openweathermap.org/data/2.5/weather";
    $.getJSON(openWeatherMap, {
        lat: localStorage.lat,
        lon: localStorage.long,
        units: "metric",
        APPID: "3b2a6440c9db33c97812d5b7f73e9206"
    }).done(function(data) {
        displayWeatherInfo(data);
    }).fail(function() {
        localStorage.setItem("currLocAllwed", false);
    });
}

function storageCheckLocation() {

    if (localStorage.currLocAllowed == "true") {
        if (!localStorage.lat || !localStorage.long) {
            window.navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        } else {
            getWeather();
        }
    } else {
        bootbox.alert("현재위치정보 사용을 허용해주세요");
    }
}

function refreshLocation() {
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    localStorage.setItem("a", "changed");
}

function onSuccess(pos) {
    var crd = pos.coords;
    localStorage.setItem("lat", crd.latitude);
    localStorage.setItem("long", crd.longitude);
    getWeather();
}

function onError(err) {
    bootbox.alert("현재 위치를 가져올수 없습니다.</br> 날씨정보를 이용하려면 현재위치 사용을 허용해주세요");
}

function displayWeatherInfo(data) {    

    $("#weatherInfoArea").show();
    $(".weatherIconImg").hide();
    $("#currTemp").html(Math.round(data.main.temp));
    $("#tempMinArea").html("최저: " + data.main.temp_min + " ºC");
    $("#tempMaxArea").html("최고: " + data.main.temp_max + " ºC");

    var main = data.weather[0].main;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    var time = Math.floor(new Date().getTime() / 1000);

    var weatherDesc;
    if (main == "Clear") {
        weatherDesc = "맑음";
        //check time
        if (time >= sunrise && time < sunset) {
            $("#weatherSun").show();
        } else {
            $("#weatherMoon").show();
        }
    } else if (main == "Clouds") {
        weatherDesc = "흐림";
        //check time
        if (time >= sunrise && time < sunset) {
            $("#weatherClouds").show();
        } else {
            $("#weatherMoon").show();//밤 구름 그림 삽입
        }
    } else if (main == "Drizzle") {
        weatherDesc = "이슬비";
        $("#weatherShower").show();
    } else if (main == "Rain") {
        weatherDesc = "비";
        $("#weatherRain").show();
    } else if (main == "Thunderstorm") {
        weatherDesc = "폭풍";
        $("#weatherStorm").show();
    } else if (main == "Snow") {
        weatherDesc = "눈";
        $("#weatherSnow").show();
    } else if (main == "Mist" || main == "Smoke" || main == "Haze" || main == "Fog") {
        weatherDesc = "안개";
        $("#weatherMist").show();
    } else if (main == "Dust" || main == "Sand" || main == "Ash") {
        weatherDesc = "황사";
        $("#weatherDust").show();
    } else if (main == "squall" || main == "Tornado") {
        weatherDesc = "바람";
        $("#weatherWind").show();
    }
    $("#weatherDesc").html(weatherDesc);
}

/**
 * weather types
 * 
 * 1) clear sky (day, night)
 * 2) few clouds (day, night)
 * 3) scattered clouds
 * 4) broken clouds
 * 5) shower rain
 * 6) rain
 * 7) thunderstorm
 * 8) snow
 * 9) mist
 * 10) fog
 * 11) haze
 * 
 */