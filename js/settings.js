$(window).ready(function(e) {
	
	// store tabs variable
	var myTabs = document.querySelectorAll("div.main > ul.nav-tabs > li > a");
	var mySubTabs = document.querySelectorAll("div.sub > ul.nav-tabs > li > a");
	for (i = 0; i < myTabs.length; i++) {
		$(myTabs[i]).click(myTabClicks);
	}
	for (i = 0; i < mySubTabs.length; i++) {
		$(mySubTabs[i]).click(mySubTabClicks);
	}

    function myTabClicks(tabClickEvent) {
		for (var i = 0; i < myTabs.length; i++) {
			$(myTabs[i]).removeClass("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		$(clickedTab).addClass("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll("div#tabContent > .tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
			$(myContentPanes[i]).removeClass("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		$(activePane).addClass("active");
	}

	function mySubTabClicks(tabClickEvent) {
		for (var i = 0; i < mySubTabs.length; i++) {
			$(mySubTabs[i]).removeClass("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		$(clickedTab).addClass("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll("div#subTabContent > .tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
			$(myContentPanes[i]).removeClass("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		$(activePane).addClass("active");
	}
});