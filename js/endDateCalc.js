function calculateEndDate() {
    branchVal = localStorage.branch;
    var dutyLength = getDutyLength(branchVal);
    var standardDate;
    var exceptionDate1 = null;
    var exceptionDate2 = null;

    var todayObj = new Date();
    var todayObj = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());

    var enlistDateStr = localStorage.enlistDate;
    var enterDateObj = new Date(enlistDateStr.slice(0,4), enlistDateStr.slice(5,7) - 1, enlistDateStr.slice(8));

    /**
     * 특수케이스
     * 육군(18) - 17/08/01, 19/01/01
     * 해군(20) - 17/06/01, 18/11/01
     * 사회복무(21) - x
     * 공군(22) - x (60일만 단축)
     */

    //do the math
    var endDateObj = new Date(enterDateObj);
    var maxReduced = new Date(enterDateObj);

    var suppposedEndDate = enterDateObj.getDate() - 1;
    var supposedEndMonth = (enterDateObj.getMonth() + (12 - (24 - dutyLength))) % 12;
    var suppposedEndYear = enterDateObj.getFullYear() + Math.floor((enterDateObj.getMonth() + dutyLength) / 12);

    if (isValidDate(suppposedEndYear, supposedEndMonth, suppposedEndDate)) {
        endDateObj = new Date(suppposedEndYear, supposedEndMonth, suppposedEndDate);
    } else {
        endDateObj = new Date(suppposedEndYear, supposedEndMonth, suppposedEndDate);
    }
    var realEndDate = new Date(endDateObj);//단축 전 기존 전역일

    //입대일 기준으로 전역일 계산, 예외케이스 삽입
    if (branchVal == "army" || branchVal == "marine" || branchVal == "police") {
        standardDate = new Date(2017, 0, 3);
        exceptionDate1 = new Date(2017, 7, 1);
        exceptionDate2 = new Date(2019, 0, 1);

    } else if (branchVal == "navy") {
        standardDate = new Date(2016, 10, 03);
        exceptionDate1 = new Date(2017, 5, 1);
        exceptionDate2 = new Date(2019, 10, 1);
    } else if (branchVal == "airForce" || branchVal == "socialService") {
        standardDate = new Date(2016, 9, 3);
    }
    var daysReduced = Math.floor((enterDateObj - standardDate) / (1000 * 3600 * 24) / 14) + 1; //2
    if ((exceptionDate1 != null && exceptionDate2 != null) && (enterDateObj - exceptionDate1 == 0 || enterDateObj - exceptionDate2 == 0)) {
        daysReduced--;
    }

    if (daysReduced > 0) {
        //복무단축 계산
        endDateObj.setDate(endDateObj.getDate() - daysReduced);

        //maxReduced구하는거 기존 전역일 구하는거처럼 바꿈
        var suppposedEndDateM = enterDateObj.getDate() - 1;
        var supposedEndMonthM = (enterDateObj.getMonth() + (12 - (24 - (dutyLength - 3)))) % 12;
        var suppposedEndYearM = enterDateObj.getFullYear() + Math.floor((enterDateObj.getMonth() + dutyLength - 3) / 12);
        if (branchVal == "airForce") {//공군만 2개월 단축
            supposedEndMonthM = (enterDateObj.getMonth() + (12 - (24 - (dutyLength - 2)))) % 12;
            suppposedEndYearM = enterDateObj.getFullYear() + Math.floor((enterDateObj.getMonth() + dutyLength - 2) / 12);
        }
    
        if (isValidDate(suppposedEndYearM, supposedEndMonthM, suppposedEndDateM)) {
            maxReduced = new Date(suppposedEndYearM, supposedEndMonthM, suppposedEndDateM);
        } else {
            maxReduced = new Date(suppposedEndYearM, supposedEndMonthM, suppposedEndDateM);
        }

        // 최고 단축일보다 많이 줄수 없음
        if (endDateObj - maxReduced < 0) {
            localStorage.setItem("wholeDays",Math.floor((maxReduced - enterDateObj) / (1000 * 60 * 60 * 24)));
            localStorage.setItem("todoDays",Math.floor((maxReduced - todayObj) / (1000 * 60 * 60 * 24)));
            localStorage.setItem("reducedDays", Math.floor((realEndDate - maxReduced) / (1000 * 60 * 60 * 24)));

            localStorage.setItem("endDateYear", maxReduced.getFullYear());
            localStorage.setItem("endDateMonth", maxReduced.getMonth() + 1);
            localStorage.setItem("endDateDate", maxReduced.getDate());
            return maxReduced;
        }
        localStorage.setItem("reducedDays", daysReduced);
    } else {//기존전역일 18년 10월 2일 전은 복무단축 없음
        localStorage.setItem("reducedDays", 0);
    }

    localStorage.setItem("wholeDays", Math.floor((endDateObj - enterDateObj) / (1000 * 60 * 60 * 24)));
    localStorage.setItem("todoDays", Math.floor((endDateObj - todayObj) / (1000 * 60 * 60 * 24)));
    localStorage.setItem("endDateYear", endDateObj.getFullYear());
    localStorage.setItem("endDateMonth", endDateObj.getMonth() + 1);
    localStorage.setItem("endDateDate", endDateObj.getDate());

    var progressBarWidth = Math.floor((1 - localStorage.getItem("todoDays") / localStorage.getItem("wholeDays")) * 1000) / 10;
    if(!isNaN(progressBarWidth)){
        localStorage.setItem("progressBar", progressBarWidth);
    }

    return endDateObj;
}

function getDutyLength(branchVal) {
    switch (branchVal) {
    case "army":
        return 21;
    case "navy":
        return 23;
    case "airForce":
        return 24;
    case "marine":
        return 21;
    case "socialService":
        return 24;
    case "police":
        return 21;
    }
}