$("#iframe").on("load",function() {
    var iframeContent = $("#iframe").contents();

    //iframe내 클릭으로 searchUI close
    iframeContent.find("body").click(function(){
        searchUIClose();
    });

    //iframe내 rankSettingButton 클릭으로 settingsModal
    iframeContent.find(".rankSettings").click(function() {
        presetSettings();
        $("#rankArrow").show();
        $("#settingsModal").modal("show");
        setDefaultSettingsTab(2);
        $("#saveSettings").show();
    });

    //iframe내 좌우키로 clickLeft, clickRight
    iframeContent.find("body").keydown(function(e){
        pressLeftRight(e);
    });

    iframeContent.find("#anniversaryDate").mouseover(function() {   
        $("mainMiddle").css("background-image", "url(/img/firework.png)");
    });
});
