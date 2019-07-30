var currDate = new Date();
var currRelStartY = currDate.getFullYear();
var currRelStartM = currDate.getMonth() + 1;
var currRelStartD = currDate.getDate();
var currEnlistY = currDate.getFullYear();
var currEnlistM = currDate.getMonth() + 1;
var currEnlistD = currDate.getDate();
var branchSelected;
var identitySelected;
var girlfriendSelected;

$("#relStartY").mousedown(relStartYActive);
$("#relStartM").mousedown(relStartMActive);
$("#relStartD").mousedown(relStartDActive);
$("#enlistY").mousedown(enlistYActive);
$("#enlistM").mousedown(enlistMActive);
$("#enlistD").mousedown(enlistDActive);


/* NAME */
function nameCheck() {
    $("#nameIn").show();
    setTimeout(function() {
        $("#nameIn1").fadeOut(1000, function() {
            $("#nameIn2").show();
            setTimeout(function() {
                $("#nameInputField").css("visibility", "visible");
                $("#nameInputField").addClass("animated fadeInUp");
                $("#nameInput").focus();
            }, 700);
        });
    }, 1200);
    $("#nameInput").keyup(onNameEnter);
}
function onNameEnter() {
    $("#nameInRight").show();
    $("#nameInRight").click(onNameInEnd);
    
    if(event.which==13 || event.keycode==13) {
        onNameInEnd();
    }
}
function onNameInEnd() {
    if ($("#nameInput").val() == ""){
        bootbox.alert("이름을 적어주세요");
    }
    else{
        localStorage.setItem("name", $("#nameInput").val());
        
        $("#nameIn").addClass("animated fadeOutLeftInit");
        setTimeout(function() {
            $("#nameIn").hide();
            identityCheck();
        }, 1000);
    }
}

/** IDENTITY */
function identityCheck() {
    $("#identityIn").show();
    setTimeout(function() {
        $("#identityInput").css("visibility", "visible");
        $("#identityInput").addClass("animated fadeInUp");
    }, 700);

    $("#identitySoldierImg").mousedown(function() {
        $("#identityInRight").show();
        $(".identity").removeClass("selected");
        $("#identitySoldierImg").addClass("selected");
        identitySelected = $("#identitySoldierImg").val();
    });
    $("#identityGirlfriendImg").mousedown(function() {
        $("#identityInRight").show();
        $(".identity").removeClass("selected");
        $("#identityGirlfriendImg").addClass("selected");
        identitySelected = $("#identityGirlfriendImg").val();
    });
    $("#identityInRight").click(onIdentitySelect);
    $("#identityInput").keyup(onIdentitySelectKey);
}
function onIdentitySelect() {
    if (identitySelected!=undefined) {
        localStorage.setItem("identity", identitySelected);
    }
    if (!localStorage.identity || localStorage.identity == "") {
        bootbox.alert("신분을 선택해주세요");
    } else {
        onIdentityInEnd();
    }
}
function onIdentitySelectKey() {//enter 눌렀을때 설정 가능, 아무것도 안 눌린상태에서는 enter가 아예 안 먹음 -> alert 필요 없음
    if(event.which==13 || event.keycode==13) {
        onIdentityInEnd();
    }
}
function onIdentityInEnd() {//끝날때 효과 + 로컬에 저장
    localStorage.setItem("identity", identitySelected);

    $("#identityIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#identityIn").hide();
        if (localStorage.identity == "soldier"){
            girlfriendCheck();
        } else {
            loverNameCheck();
        }
    }, 1000);
}

/* GIRLFRIEND if user chooses soldier*/
function girlfriendCheck() {
    $("#girlfriendIn").show();
    setTimeout(function() {
        $("#girlfriendInput").css("visibility", "visible");
        $("#girlfriendInput").addClass("animated fadeInUp");
    }, 700);
    
    //default solo
    $("#solo").css("background-color", "gray");
    $("#withoutGF").css("color", "white");
    $("#withoutGF").css("font-size", "40px");
    $("#withGF").css("color", "gray");
    $("#withGF").css("font-size", "30px");    
    girlfriendSelected = "no";

    $("#girlfriendInRight").show();
    $("#solo").click(function() {
        $("#solo").hide();
        $("#couple").show();
        girlfriendSelected = "yes";
        $("#withGF").css("color", "white");
        $("#withGF").css("font-size", "40px");
        $("#withoutGF").css("color", "gray");
        $("#withoutGF").css("font-size", "30px");
    });
    $("#couple").click(function() {
        $("#couple").hide();
        $("#solo").show();
        girlfriendSelected = "no";
        $("#withoutGF").css("color", "white");
        $("#withoutGF").css("font-size", "40px");
        $("#withGF").css("color", "gray");
        $("#withGF").css("font-size", "30px");
    });

    $("#girlfriendInRight").click(onGirlfriendSelect);
    $("#girlfriendInput").keyup(onGirlfriendSelectKey)
}
function onGirlfriendSelect() {
    if (girlfriendSelected!=undefined) {
        localStorage.setItem("girlfriendYN", girlfriendSelected);
    }
    if (!localStorage.girlfriendYN || localStorage.girlfriendYN == "") {
        bootbox.alert("항목을 선택해주세요");
    } else {
        onGirlfriendInEnd();
    }
}
function onGirlfriendSelectKey() {//enter press
    if (event.which == 13 || event.keycode == 13) {
        onGirlfriendInEnd();
    }
}
function onGirlfriendInEnd() {
    localStorage.setItem("girlfriendYN", girlfriendSelected);

    $("#girlfriendIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#girlfriendIn").hide();
        if (localStorage.girlfriendYN == "yes") {
            loverNameCheck();
        } else {
            branchCheck();
        }
    }, 1000);
}

/* GET LOVER NAME, IF IDENTITY=SOLDIER & GF=YES OR IDENTITY=GF*/
function loverNameCheck() {
    $("#loverNameIn").show();
    setTimeout(function() {
        $("#loverNameInputField").css("visibility", "visible");
        $("#loverNameInputField").addClass("animated fadeInUp");
        $("#loverNameInput").focus();
    }, 700);
    
    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("남자친구의 ");
    }
    else{
        $(".fitQuestion").html("여자친구의 ");
    }
    $("#loverNameInput").keyup(onLoverNameEnter);
}
function onLoverNameEnter() {
    $("#loverNameInRight").show();
    $("#loverNameInRight").click(onLoverNameInEnd);

    if(event.which==13 || event.keycode==13) {
        onLoverNameInEnd();
    }
}
function onLoverNameInEnd() {
    if ($("#loverNameInput").val() == "") {
        bootbox.alert("이름을 적어주세요");
    } else {
        localStorage.setItem("loverName",$("#loverNameInput").val());

        $("#loverNameIn").addClass("animated fadeOutLeftInit");
        setTimeout(function() {
            $("#loverNameIn").hide();
            relStartDateCheck();
        }, 1000);
    }
}

/* relStartDATE */
function relStartDateCheck() {
    $("#relStartDateIn").show();
    setTimeout(function() {
        $("#relStartDateInput").css("visibility", "visible");
        $("#relStartDateInput").addClass("animated fadeInUp");
    }, 700);

    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("남자친구와 ");
    }
    else{
        $(".fitQuestion").html("여자친구와 ");
    }

    $("#relStartDateInRight").show();
    $("#relStartDateInRight").click(onRelStartDateClick);

    //default
    relStartYActive();

    // year update
    $("#relStartYInput").val(currRelStartY);
    $("#relStartY").keydown(function(){
        if (event.which == 38 || event.keycode == 38) {
            $("#relStartYInput").val(++currRelStartY);
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#relStartYInput").val(--currRelStartY);
        }
        else if (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {
            currRelStartY = $("#relStartYInput").val();
            relStartMActive();
            $("#relStartMInput").select();
        }
    });

    // month update
    $("#relStartMInput").val(currRelStartM);
    $("#relStartM").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#relStartMInput").val(++currRelStartM);
            if (currRelStartM > 12){
                currRelStartM = 0;
                $("#relStartMInput").val(++currRelStartM);
            }   
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#relStartMInput").val(--currRelStartM);
            if (currRelStartM <= 0){
                currRelStartM = 13;
                $("#relStartMInput").val(--currRelStartM);
            }
        }
        else if  (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {             
            currRelStartM = $("#relStartMInput").val();
            relStartDActive();
            $("#relStartDInput").select();
        }
        else if(event.which==37 || event.keycode==37) {
            relStartYActive();
            $("#relStartYInput").select();
        }
    });

    // date update
    $("#relStartDInput").val(currRelStartD);
    $("#relStartD").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#relStartDInput").val(++currRelStartD);
            if (currRelStartD > 31){
                currRelStartD = 0;
                $("#relStartDInput").val(++currRelStartD);
            }
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#relStartDInput").val(--currRelStartD);
            if (currRelStartD <= 0){
                currRelStartD = 32;
                $("#relStartDInput").val(--currRelStartD);
            }
        }  
        else if  (event.which==13 || event.keycode==13) {                           
            currRelStartD = $("#relStartDInput").val()           
            onRelStartDateClick();
        }
        else if(event.which==37 || event.keycode==37) {
            relStartMActive();
            $("#relStartMInput").select();
        }
    });
}

function relStartYActive(){
    $("#relStartY").children().prop('disabled', false);    
    $("#relStartY").children().children().prop('disabled', false); 
    $("#relStartM").children().prop('disabled', true);    
    $("#relStartM").children().children().prop('disabled', true);  
    $("#relStartD").children().prop('disabled', true);    
    $("#relStartD").children().children().prop('disabled', true);   
    $("#yearRelStart").css("color", "white");
    $("#monthRelStart").css("color", "gray");
    $("#dayRelStart").css("color", "gray");
    $("#relStartYInput").focus();
}

function relStartMActive(){
    $("#relStartM").children().prop('disabled', false);    
    $("#relStartM").children().children().prop('disabled', false); 
    $("#relStartY").children().prop('disabled', true);    
    $("#relStartY").children().children().prop('disabled', true);  
    $("#relStartD").children().prop('disabled', true);    
    $("#relStartD").children().children().prop('disabled', true);      
    $("#yearRelStart").css("color", "gray");
    $("#monthRelStart").css("color", "white");
    $("#dayRelStart").css("color", "gray");   
    $("#relStartMInput").focus();    
}

function relStartDActive(){
    $("#relStartD").children().prop('disabled', false);    
    $("#relStartD").children().children().prop('disabled', false); 
    $("#relStartY").children().prop('disabled', true);    
    $("#relStartY").children().children().prop('disabled', true);  
    $("#relStartM").children().prop('disabled', true);    
    $("#relStartM").children().children().prop('disabled', true);     
    $("#yearRelStart").css("color", "gray");
    $("#monthRelStart").css("color", "gray"); 
    $("#dayRelStart").css("color", "white");   
    $("#relStartDInput").focus();
}

function onRelStartDateClick() {
    //currRelStartM 에서 -1 해준 이유는, month 시작이 0부터 라고 함. ( 1월이 0, 2월이 1...)
    currRelStartY = relStartYInput.value;
    currRelStartM = relStartMInput.value;
    currRelStartD = relStartDInput.value;

    //맞는 날짜인지 .. & 미래에서 사귈수는 없으니까
    if (!isValidDate(currRelStartY, currRelStartM - 1, currRelStartD) || (currDate < new Date(currRelStartY, currRelStartM - 1, currRelStartD))) {
        bootbox.alert("가능한 날짜가 아닙니다. 다시 적어주세요");
    }
    else{                
        if (currRelStartM < 10) {
            if (currRelStartM.length == 2){
                currRelStartM = currRelStartM;
            }
            else{
                currRelStartM = "0" + currRelStartM;
            }
        }
        if (currRelStartD < 10) {
            if (currRelStartD.length == 2){
                currRelStartD = currRelStartD;
            }
            else{
                currRelStartD = "0" + currRelStartD;
            }
        }
        var relStartDateStr = currRelStartY + "-" + currRelStartM + "-" + currRelStartD;
        onRelStartDateInEnd(relStartDateStr);
    }
}
function onRelStartDateInEnd(relStartDateStr) {
    localStorage.setItem("relStartDate", relStartDateStr);
    localStorage.setItem("switchOnOff", "on");//연인일 경우 우리사이 활성화
    
    $("#relStartDateIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#relStartDateIn").hide();
        branchCheck();
    }, 1000);
}

/* BRANCH */
function branchCheck() {
    $("#branchIn").show();
    setTimeout(function() {
        $("#branchInput").css("visibility", "visible");
        $("#branchInput").addClass("animated fadeInUp");
    }, 700);

    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("남자친구의 ");
    }
    else{
        $(".fitQuestion").html("");
    }
    $("#army").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#army").addClass("selected");
        branchSelected = $("#army").attr("id");
    });
    $("#navy").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#navy").addClass("selected");
        branchSelected = $("#navy").attr("id");
    });
    $("#airForce").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#airForce").addClass("selected");
        branchSelected = $("#airForce").attr("id");
    });
    $("#marine").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#marine").addClass("selected");
        branchSelected = $("#marine").attr("id");
    });
    $("#socialService").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#socialService").addClass("selected");
        branchSelected = $("#socialService").attr("id");
    });
    $("#police").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#police").addClass("selected");
        branchSelected = $("#police").attr("id");
    });

    $("#branchInRight").click(onBranchSelect);
    $("#branchInput").keyup(onBranchSelectKey);
}
function onBranchSelect() {
    if (branchSelected != undefined) {
        localStorage.setItem("branch", branchSelected);
    }
    if (!localStorage.branch || localStorage.branch == "") {
        bootbox.alert("소속을 선택해주세요");
    } else {
        onBranchInEnd();
    }
}
function onBranchSelectKey() {
    if (branchSelected != undefined) {
        localStorage.setItem("branch", branchSelected);
    }
    if  (event.which==13 || event.keycode==13) {
        if (!localStorage.branch || localStorage.branch == "") {
            bootbox.alert("소속을 선택해주세요");
        } else {
            onBranchInEnd();
        }
    }
}
function onBranchInEnd() {
    localStorage.setItem("branch", branchSelected);
    
    $("#branchIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#branchIn").hide();
        enlistDateCheck();
    }, 1000);
}

/* ENLISTDATE */
function enlistDateCheck() {
    $("#enlistDateIn").show();
    setTimeout(function() {
        $("#enlistDateInput").css("visibility", "visible");
        $("#enlistDateInput").addClass("animated fadeInUp");
    }, 700);

    //default
    enlistYActive();   

    $("#enlistDateInRight").show();
    $("#enlistDateInRight").click(onEnlistDateClick);

    // year update
    $("#enlistYInput").val(currEnlistY);
    $("#enlistYInput").select();
    $("#enlistY").keydown(function(){
        if (event.which == 38 || event.keycode == 38) {
            $("#enlistYInput").val(++currEnlistY);
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistYInput").val(--currEnlistY);
        }
        else if (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {
            currEnlistY = $("#enlistYInput").val();
            enlistMActive();
            $("#enlistMInput").select();
        }
    });

    // month update
    $("#enlistMInput").val(currEnlistM);
    $("#enlistM").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#enlistMInput").val(++currEnlistM);
            if (currEnlistM > 12){
                currEnlistM = 0;
                $("#enlistMInput").val(++currEnlistM);
            }   
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistMInput").val(--currEnlistM);
            if (currEnlistM <= 0){
                currEnlistM = 13;
                $("#enlistMInput").val(--currEnlistM);
            }
        }
        else if  (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {             
            currEnlistM = $("#enlistMInput").val();
            enlistDActive();
            $("#enlistDInput").select();
        }
        else if(event.which==37 || event.keycode==37) {
            enlistYActive();
            $("#enlistYInput").select();
        }
    });

    // date update
    $("#enlistDInput").val(currEnlistD);
    $("#enlistD").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#enlistDInput").val(++currEnlistD);
            if (currEnlistD > 31){
                currEnlistD = 0;
                $("#enlistDInput").val(++currEnlistD);
            }
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistDInput").val(--currEnlistD);
            if (currEnlistD <= 0){
                currEnlistD = 32;
                $("#enlistDInput").val(--currEnlistD);
            }
        }  
        else if  (event.which==13 || event.keycode==13) {                           
            currEnlistD = $("#enlistDInput").val()           
            onEnlistDateClick();
        }
        else if(event.which==37 || event.keycode==37) {
            enlistMActive();
            $("#enlistMInput").select();
        }
    });
}

function enlistYActive(){
    $("#enlistY").children().prop('disabled', false);    
    $("#enlistY").children().children().prop('disabled', false); 
    $("#enlistM").children().prop('disabled', true);    
    $("#enlistM").children().children().prop('disabled', true);  
    $("#enlistD").children().prop('disabled', true);    
    $("#enlistD").children().children().prop('disabled', true);   
    $("#yearEnlist").css("color", "white");
    $("#monthEnlist").css("color", "gray");
    $("#dayEnlist").css("color", "gray");
    $("#enlistYInput").focus();
}

function enlistMActive(){
    $("#enlistM").children().prop('disabled', false);    
    $("#enlistM").children().children().prop('disabled', false); 
    $("#enlistY").children().prop('disabled', true);    
    $("#enlistY").children().children().prop('disabled', true);  
    $("#enlistD").children().prop('disabled', true);    
    $("#enlistD").children().children().prop('disabled', true);      
    $("#yearEnlist").css("color", "gray");
    $("#monthEnlist").css("color", "white");
    $("#dayEnlist").css("color", "gray");   
    $("#enlistMInput").focus();    
}

function enlistDActive(){
    $("#enlistD").children().prop('disabled', false);    
    $("#enlistD").children().children().prop('disabled', false); 
    $("#enlistY").children().prop('disabled', true);    
    $("#enlistY").children().children().prop('disabled', true);  
    $("#enlistM").children().prop('disabled', true);    
    $("#enlistM").children().children().prop('disabled', true);     
    $("#yearEnlist").css("color", "gray");
    $("#monthEnlist").css("color", "gray"); 
    $("#dayEnlist").css("color", "white");   
    $("#enlistDInput").focus();
}

function onEnlistDateClick() {
    //currEnlistM 에서 -1 해준 이유는, month 시작이 0부터 라고 함. ( 1월이 0, 2월이 1...)
    currEnlistY = enlistYInput.value;
    currEnlistM = enlistMInput.value;
    currEnlistD = enlistDInput.value;
    if (!isValidDate(currEnlistY, currEnlistM - 1, currEnlistD)){
        bootbox.alert("가능한 날짜가 아닙니다. 다시 적어주세요");
    }
    else{                
        if (currEnlistM < 10) {
            if (currEnlistM.length == 2){
                currEnlistM = currEnlistM;
            }
            else{
                currEnlistM = "0" + currEnlistM;
            }
        }
        if (currEnlistD < 10) {
            if (currEnlistD.length == 2){
                currEnlistD = currEnlistD;
            }
            else{
                currEnlistD = "0" + currEnlistD;
            }
        }
        var enlistDateStr = currEnlistY + "-" + currEnlistM + "-" + currEnlistD;
        onEnlistDateInEnd(enlistDateStr);
    }
}
function onEnlistDateInEnd(enlistDateStr) {
    localStorage.setItem("enlistDate", enlistDateStr);
    
    $("#enlistDateIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#enlistDateIn").hide();
        initDoneDisplay();
    }, 1000);
}

//check whether date input is valid
function isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
        return true;
    }
    return false;
}