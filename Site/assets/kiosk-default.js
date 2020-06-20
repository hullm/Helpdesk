function storeSettings(){
	$('#myModal').modal('hide');
	settingTestMode();
	settingShowPeriodInfo();
	settingShowUserPicture();
	settingSampleCard();
	settingWidget();
	settingClock();
	settingDayType();
	if (openTickets && document.getElementById("testMode").checked == false){
		$('#full-weather').hide();
		$('#bandwidth-info').hide();
		$('#sample-card').hide();
	}
}

function settingTestMode(){
	if (document.getElementById("testMode").checked){
		localStorage.setItem("testMode", "true");
		$('.ticket').hide();
	} else {
		localStorage.setItem("testMode", "false");
		$('.ticket').show();
	}
}
function settingShowPeriodInfo(){
	if (document.getElementById("showPeriod").checked){
		localStorage.setItem("displayPeriod", "true");
		$('.information').show();
	} else {
		localStorage.setItem("displayPeriod", "false");
		$('.information').hide();
	}
}

function settingShowUserPicture(){
	if (document.getElementById("showPicture").checked){
		localStorage.setItem("displayPicture", "true");
		$('.picture').show();
	} else {
		localStorage.setItem("displayPicture", "false");
		$('.picture').hide();
	}
}

function settingSampleCard(){
	if (document.getElementById("showSampleCard").checked){
		localStorage.setItem("displaySampleCard", "true");
		$('#full-weather').hide();
		$('#bandwidth-info').hide();
		$('#sample-card').show();
	} else {
		localStorage.setItem("displaySampleCard", "false");
		$('#full-weather').show();
		$('#bandwidth-info').hide();
		$('#sample-card').hide();
	}
}

function settingWidget(){
	if (document.getElementById("widget").value == "None"){
		localStorage.setItem("widget", "None");
		$('#full-weather').hide();
		$('#bandwidth-info').hide();
	} else if (document.getElementById("widget").value == "Weather") {
		localStorage.setItem("widget", "Weather");
		$('#full-weather').show();
		$('#bandwidth-info').hide();
		$('#sample-card').hide();
	} else if (document.getElementById("widget").value == "Bandwidth"){
		localStorage.setItem("widget", "Bandwidth");
		$('#full-weather').hide();
		$('#bandwidth-info').show();
		$('#sample-card').hide();
	}
}

function settingClock(){
	if (document.getElementById("ShowClock").value == "NoClock"){
		localStorage.setItem("ShowClock", "NoClock");
		$('#TopClock').hide();
		$('#BottomClock').hide();
	} else if (document.getElementById("ShowClock").value == "ClockAtBottom") {
		localStorage.setItem("ShowClock", "ClockAtBottom");
		$('#TopClock').hide();
		$('#BottomClock').show();
	} else if (document.getElementById("ShowClock").value == "ClockAtTop"){
		localStorage.setItem("ShowClock", "ClockAtTop");
		$('#TopClock').show();
		$('#BottomClock').hide();
	}
}

function settingDayType(){
	if (document.getElementById("DayType").value == "Regular"){
		localStorage.setItem("DayType", "Regular");

	} else if (document.getElementById("DayType").value == "Extended"){
		localStorage.setItem("DayType", "Extended");

	} else if (document.getElementById("DayType").value == "Half"){
		localStorage.setItem("DayType", "Half");

	} else if (document.getElementById("DayType").value == "OneHourDelay"){
		localStorage.setItem("DayType", "OneHourDelay");

	} else if (document.getElementById("DayType").value == "TwoHourDelay"){
		localStorage.setItem("DayType", "TwoHourDelay");

	} else if (document.getElementById("DayType").value == "AMAssembly"){
		localStorage.setItem("DayType", "AMAssembly");

	} else if (document.getElementById("DayType").value == "PMAssembly"){
		localStorage.setItem("DayType", "PMAssembly");
	}
}

function testMode(){
	var testMode = document.getElementById("testMode");
	if (localStorage.getItem("testMode") == "true"){
		testMode.checked = true;
		$('.ticket').hide();
	} else {
		testMode.checked = false;
		$('.ticket').show();
	}
}

function currentPeriod(){
	var showPeriod = document.getElementById("showPeriod");
	if (localStorage.getItem("displayPeriod") == "true"){
		showPeriod.checked = true;
		$('.information').show();
	} else {
		showPeriod.checked = false;
		$('.information').hide();
	}
}

function userPicture(){
	var showPicture = document.getElementById("showPicture");
	if (localStorage.getItem("displayPicture") == "true"){
		showPicture.checked = true;
		$('.picture').show();
	} else {
		$('.picture').hide();
	}
}

function sampleCard(){
	var showSampleCard = document.getElementById("showSampleCard");
	if (localStorage.getItem("testMode") == "false"){
		$('#sampleCardOption').hide();
		$('#sample-card').hide();
	} if (localStorage.getItem("displaySampleCard") == "true"){
		showSampleCard.checked = true;
		$('#full-weather').hide();
		$('#sample-card').show();
	} else{
		showSampleCard.checked = false;
		$('#full-weather').show();
		$('#sample-card').hide();
	}
}

function widget(){
	var showWidget = document.getElementById("widget");
	if (localStorage.getItem("widget") == "None"){
		showWidget.value = "None";
		$('#full-weather').hide();
		$('#bandwidth-info').hide();
	} else if (localStorage.getItem("widget") == "Weather") {
		showWidget.value = "Weather";
		$('#full-weather').show();
		$('#bandwidth-info').hide();
		$('#sample-card').hide();
	} else if (localStorage.getItem("widget") == "Bandwidth") {
		showWidget.value = "Bandwidth";
		$('#full-weather').hide();
		$('#bandwidth-info').show();
		$('#sample-card').hide();
	}
}

function setClockLocation(){
	var ShowClock = document.getElementById("ShowClock");
	if (localStorage.getItem("ShowClock") == "NoClock"){
		ShowClock.value = "NoClock";
		$('#TopClock').hide();
		$('#BottomClock').hide();
	} else if (localStorage.getItem("ShowClock") == "ClockAtBottom") {
		ShowClock.value = "ClockAtBottom";
		$('#TopClock').hide();
		$('#BottomClock').show();
	} else if (localStorage.getItem("ShowClock") == "ClockAtTop") {
		ShowClock.value = "ClockAtTop";
		$('#TopClock').show();
		$('#BottomClock').hide();
	} else {
		localStorage.setItem("ShowClock", "ClockAtBottom");
		$('#TopClock').hide();
		$('#BottomClock').show();
	}
}

function setDayType(){
	var DayType = document.getElementById("DayType");
	if (localStorage.getItem("DayType") == "Regular"){
		DayType.value = "Regular";

	} else if (localStorage.getItem("DayType") == "Extended"){
		DayType.value = "Extended";

	} else if (localStorage.getItem("DayType") == "OneHourDelay"){
		DayType.value = "OneHourDelay";

	} else if (localStorage.getItem("DayType") == "TwoHourDelay"){
		DayType.value = "TwoHourDelay";

	} else if (localStorage.getItem("DayType") == "Half"){
		DayType.value = "Half";

	} else if (localStorage.getItem("DayType") == "PMAssembly"){
		DayType.value = "PMAssembly";
	}
}


function testModeSwitch(){
	var sampCard = document.getElementById("sampCard");
	if (document.getElementById("testMode").checked == false){
		$('#sampleCardOption').fadeOut();
	} else {
		$('#sampleCardOption').fadeIn();
	}
}

function onStart(){
	currentPeriod();
	userPicture();
	sampleCard();
	widget();
	setClockLocation();
	testMode();
	setDayType();
	if (openTickets && document.getElementById("testMode").checked == false){
		$('#full-weather').hide();
		$('#bandwidth-info').hide();
		$('#sample-card').hide();
	} if (!openTickets && document.getElementById("testMode").checked == false){
		// $('#full-weather').hide();
		// $('#bandwidth-info').hide();
		$('#sample-card').hide();
		localStorage.setItem("displaySampleCard", "false");
	}
}

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
	document.body.style.backgroundColor = "white";
}

function getCurrentPeriod(timeOffset, dayType) {

  var showPeriod = document.getElementById("currentPeriod");
  var date = new Date();
  date.setSeconds(date.getSeconds() + timeOffset);
  var time=date.toLocaleTimeString();
  var periodInformation = "";

	switch(dayType){
		case "Regular":
			if (compareTimes(time,"7:30:00 AM") && compareTimes("8:00:00 AM", time)){
				periodInformation="Guide Room will begin in " + remainingTime(time,"8:00:00 AM");

			} else if (compareTimes(time,"8:00:00 AM") && compareTimes("8:06:00 AM",time)) {
				periodInformation="Guide Room - 8:00 AM to 8:06 AM <br />" + remainingTime(time,"8:06:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:06:00 AM") && compareTimes("8:08:00 AM",time)) {
				periodInformation="Between Guide Room and 1st Period - 8:06 AM to 8:08 AM <br />" + remainingTime(time,"8:08:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:08:00 AM") && compareTimes("8:48:00 AM",time)) {
				periodInformation="1st Period - 8:08 AM to 8:48 AM <br />" + remainingTime(time,"8:48:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:48:00 AM") && compareTimes("8:51:00 AM",time)) {
				periodInformation="Between 1st and 2nd Period - 8:48 AM to 8:51 AM <br />" + remainingTime(time,"8:51:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:51:00 AM") && compareTimes("9:31:00 AM",time)) {
				periodInformation="2nd Period - 8:51 AM to 9:31 AM <br />" + remainingTime(time,"9:31:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:31:00 AM") && compareTimes("9:34:00 AM",time)) {
				periodInformation="Between 2nd and 3rd Period - 9:31 AM to 9:34 AM <br />" + remainingTime(time,"9:34:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:34:00 AM") && compareTimes("10:14:00 AM",time)) {
				periodInformation="3rd Period - 9:34 AM to 10:14 AM <br />" + remainingTime(time,"10:14:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:14:00 AM") && compareTimes("10:17:00 AM",time)) {
				periodInformation="Between 3rd and 4th Period - 10:14 AM to 10:17 AM <br />" + remainingTime(time,"10:17:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:17:00 AM") && compareTimes("10:57:00 AM",time)) {
				periodInformation="4th Period - 10:17 AM to 10:57 AM <br />" + remainingTime(time,"10:57:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:57:00 AM") && compareTimes("11:00 AM",time)) {
				periodInformation="Between 4th and 5th Period - 10:57 AM to 11:00 AM <br />" + remainingTime(time,"11:00:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:00:00 AM") && compareTimes("11:40:00 AM",time)) {
				periodInformation="5th Period - 11:00 AM to 11:40 AM <br />" + remainingTime(time,"11:40:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:40:00 AM") && compareTimes("11:43 AM",time)) {
				periodInformation="Between 5th and 6th Period - 11:40 AM to 11:43 AM <br />" + remainingTime(time,"11:43:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:43:00 AM") && compareTimes("12:23:00 PM",time)) {
				periodInformation="6th Period - 11:43 AM to 12:23 PM <br />" + remainingTime(time,"12:23:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:23:00 PM") && compareTimes("12:26 PM",time)) {
				periodInformation="Between 6th and 7th Period - 12:23 PM to 12:26 PM <br />" + remainingTime(time,"12:26:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:26:00 PM") && compareTimes("1:06:00 PM",time)) {
				periodInformation="7th Period - 12:26 PM to 1:06 PM <br />" + remainingTime(time,"1:06:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:06:00 PM") && compareTimes("1:09 PM",time)) {
				periodInformation="Between 7th and 8th Period - 1:06 PM to 1:09 PM <br />" + remainingTime(time,"1:09:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:09:00 PM") && compareTimes("1:49:00 PM",time)) {
				periodInformation="8th Period - 1:09 PM to 1:49 PM <br />" + remainingTime(time,"1:49:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:49:00 PM") && compareTimes("1:52 PM",time)) {
				periodInformation="Between 8th and 9th Period - 1:49 PM to 1:52 PM <br />" + remainingTime(time,"1:52:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:52:00 PM") && compareTimes("2:33:00 PM",time)) {
				periodInformation="9th Period - 1:52 PM to 2:33 PM <br />" + remainingTime(time,"2:33:00 PM") + " Remaining";
			} else if (compareTimes(time,"2:33:00 PM") && compareTimes("2:35 PM",time)) {
				periodInformation="Between 9th and 10th Period - 2:33 PM to 2:35 PM <br />" + remainingTime(time,"2:35:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"2:35:00 PM") && compareTimes("3:15:00 PM",time)) {
				periodInformation="10th Period - 2:35 PM to 3:15 PM <br />" + remainingTime(time,"3:15:00 PM") + " Remaining";
			} else if (compareTimes(time,"3:15:00 PM") && compareTimes("3:30:00 PM",time)) {
				periodInformation="School's Over<br />" + remainingTime(time,"3:30:00 PM") + " Remaining";
			}
			break;

		case "Extended":
			if (compareTimes(time,"7:30:00 AM") && compareTimes("8:00:00 AM", time)){
				periodInformation="Extended Guide Room will begin in " + remainingTime(time,"8:00:00 AM");

			} else if (compareTimes(time,"8:00:00 AM") && compareTimes("8:25:00 AM",time)) {
				periodInformation="Extended Guide Room - 8:00 AM to 8:25 AM <br />" + remainingTime(time,"8:25:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:25:00 AM") && compareTimes("8:27:00 AM",time)) {
				periodInformation="Between Guide Room and 1st Period - 8:25 AM to 8:27 AM <br />" + remainingTime(time,"8:27:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:27:00 AM") && compareTimes("9:05:00 AM",time)) {
				periodInformation="1st Period - 8:27 AM to 9:05 AM <br />" + remainingTime(time,"9:05:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:05:00 AM") && compareTimes("9:08:00 AM",time)) {
				periodInformation="Between 1st and 2nd Period - 9:05 AM to 9:08 AM <br />" + remainingTime(time,"9:08:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:08:00 AM") && compareTimes("9:46:00 AM",time)) {
				periodInformation="2nd Period - 9:08 AM to 9:46 AM <br />" + remainingTime(time,"9:46:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:46:00 AM") && compareTimes("9:49:00 AM",time)) {
				periodInformation="Between 2nd and 3rd Period - 9:46 AM to 9:49 AM <br />" + remainingTime(time,"9:49:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:49:00 AM") && compareTimes("10:27:00 AM",time)) {
				periodInformation="3rd Period - 9:49 AM to 10:27 AM <br />" + remainingTime(time,"10:27:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:27:00 AM") && compareTimes("10:30 AM",time)) {
				periodInformation="Between 3rd and 4th Period - 10:27 AM to 10:30 AM <br />" + remainingTime(time,"10:30:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:30:00 AM") && compareTimes("11:08:00 AM",time)) {
				periodInformation="4th Period - 10:30 AM to 11:08 AM <br />" + remainingTime(time,"11:08:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:08:00 AM") && compareTimes("11:11 AM",time)) {
				periodInformation="Between 4th and 5th Period - 11:08 AM to 11:11 AM <br />" + remainingTime(time,"11:11:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:11:00 AM") && compareTimes("11:49:00 AM",time)) {
				periodInformation="5th Period - 11:11 AM to 11:49 AM <br />" + remainingTime(time,"11:49:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:49:00 AM") && compareTimes("11:52 AM",time)) {
				periodInformation="Between 5th and 6th Period - 11:49 AM to 11:52 AM <br />" + remainingTime(time,"11:52:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:52:00 AM") && compareTimes("12:30:00 PM",time)) {
				periodInformation="6th Period - 11:52 AM to 12:30 PM <br />" + remainingTime(time,"12:30:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:30:00 PM") && compareTimes("12:33 PM",time)) {
				periodInformation="Between 6th and 7th Period - 12:30 PM to 12:33 PM <br />" + remainingTime(time,"12:33:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:33:00 PM") && compareTimes("1:11:00 PM",time)) {
				periodInformation="7th Period - 12:30 PM to 1:11 PM <br />" + remainingTime(time,"1:11:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:11:00 PM") && compareTimes("1:14 PM",time)) {
				periodInformation="Between 7th and 8th Period - 1:11 PM to 1:14 PM <br />" + remainingTime(time,"1:14:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:14:00 PM") && compareTimes("1:52:00 PM",time)) {
				periodInformation="8th Period - 1:14 PM to 1:52 PM <br />" + remainingTime(time,"1:52:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:52:00 PM") && compareTimes("1:55 PM",time)) {
				periodInformation="Between 8th and 9th Period - 1:52 PM to 1:55 PM <br />" + remainingTime(time,"1:55:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:55:00 PM") && compareTimes("2:33:00 PM",time)) {
				periodInformation="9th Period - 1:55 PM to 2:33 PM <br />" + remainingTime(time,"2:33:00 PM") + " Remaining";
			} else if (compareTimes(time,"2:33:00 PM") && compareTimes("2:35 PM",time)) {
				periodInformation="Between 9th and 10th Period - 2:33 PM to 2:35 PM <br />" + remainingTime(time,"2:35:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"2:35:00 PM") && compareTimes("3:15:00 PM",time)) {
				periodInformation="10th Period - 2:35 PM to 3:15 PM <br />" + remainingTime(time,"3:15:00 PM") + " Remaining";
			} else if (compareTimes(time,"3:15:00 PM") && compareTimes("3:30:00 PM",time)) {
				periodInformation="School's Over<br />" + remainingTime(time,"3:30:00 PM") + " Remaining";
			}
			break;

		case "Half":
			if (compareTimes(time,"8:00:00 AM") && compareTimes("8:06:00 AM",time)) {
				periodInformation="Guide Room - 8:00 AM to 8:06 AM <br />" + remainingTime(time,"8:06:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:06:00 AM") && compareTimes("8:08:00 AM",time)) {
				periodInformation="Between Guide Room and 1st Period - 8:06 AM to 8:08 AM <br />" + remainingTime(time,"8:08:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:08:00 AM") && compareTimes("8:31:00 AM",time)) {
				periodInformation="1st Period - 8:08 AM to 8:31 AM <br />" + remainingTime(time,"8:31:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:31:00 AM") && compareTimes("8:34:00 AM",time)) {
				periodInformation="Between 1st and 2nd Period - 8:31 AM to 8:34 AM <br />" + remainingTime(time,"8:34:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:34:00 AM") && compareTimes("8:57:00 AM",time)) {
				periodInformation="2nd Period - 8:34 AM to 8:57 AM <br />" + remainingTime(time,"8:57:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:57:00 AM") && compareTimes("9:00:00 AM",time)) {
				periodInformation="Between 2nd and 3rd Period - 8:57 AM to 9:00 AM <br />" + remainingTime(time,"9:00:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:00:00 AM") && compareTimes("9:23:00 AM",time)) {
				periodInformation="3rd Period - 9:00 AM to 9:23 AM <br />" + remainingTime(time,"9:23:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:23:00 AM") && compareTimes("9:26:00 AM",time)) {
				periodInformation="Between 3rd and 4th Period - 9:23 AM to 9:26 AM <br />" + remainingTime(time,"9:26:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:26:00 AM") && compareTimes("9:49:00 AM",time)) {
				periodInformation="4th Period - 9:26 AM to 9:49 AM <br />" + remainingTime(time,"9:49:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:49:00 AM") && compareTimes("9:52 AM",time)) {
				periodInformation="Between 4th and 5th Period - 9:49 AM to 9:52 AM <br />" + remainingTime(time,"9:52:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:52:00 AM") && compareTimes("10:15:00 AM",time)) {
				periodInformation="5th Period - 9:52 AM to 10:15 AM <br />" + remainingTime(time,"10:15:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:15:00 AM") && compareTimes("10:18 AM",time)) {
				periodInformation="Between 5th and 6th Period - 10:15 AM to 10:18 AM <br />" + remainingTime(time,"10:18:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:18:00 AM") && compareTimes("10:41:00 PM",time)) {
				periodInformation="6th Period - 10:18 AM to 10:41 PM <br />" + remainingTime(time,"10:41:00 PM") + " Remaining";
			} else if (compareTimes(time,"10:41:00 AM") && compareTimes("10:44 AM",time)) {
				periodInformation="Between 6th and 7th Period - 10:41 PM to 10:44 AM <br />" + remainingTime(time,"10:44:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:44:00 AM") && compareTimes("11:07:00 AM",time)) {
				periodInformation="7th Period - 10:44 AM to 11:07 AM <br />" + remainingTime(time,"11:07:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:07:00 AM") && compareTimes("11:10 AM",time)) {
				periodInformation="Between 7th and 8th Period - 11:07 AM to 11:10 AM <br />" + remainingTime(time,"11:10:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:10:00 AM") && compareTimes("11:33:00 AM",time)) {
				periodInformation="8th Period - 11:10 AM to 11:33 AM <br />" + remainingTime(time,"11:33:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:33:00 AM") && compareTimes("11:36 AM",time)) {
				periodInformation="Between 8th and 9th Period - 11:33 AM to 11:36 AM <br />" + remainingTime(time,"11:36:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:36:00 AM") && compareTimes("12:00:00 PM",time)) {
				periodInformation="9th Period - 11:36 AM to 12:00 AM <br />" + remainingTime(time,"12:00:00 PM") + " Remaining";
			}
			break;

		case "OneHourDelay":
			if (compareTimes(time,"9:00:00 AM") && compareTimes("9:06:00 AM",time)) {
				periodInformation="Guide Room - 9:00 AM to 9:06 AM <br />" + remainingTime(time,"9:06:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:06:00 AM") && compareTimes("9:08:00 AM",time)) {
				periodInformation="Between Guide Room and 1st Period - 9:06 AM to 9:08 AM <br />" + remainingTime(time,"9:08:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:08:00 AM") && compareTimes("9:41:00 AM",time)) {
				periodInformation="1st Period - 9:08 AM to 9:41 AM <br />" + remainingTime(time,"9:41:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:08:00 AM") && compareTimes("9:41:00 AM",time)) {
				periodInformation="Between 1st and 2nd Period - 9:08 AM to 9:41 AM <br />" + remainingTime(time,"9:41:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:44:00 AM") && compareTimes("10:17:00 AM",time)) {
				periodInformation="2nd Period - 9:44 AM to 10:17 AM <br />" + remainingTime(time,"10:17:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:17:00 AM") && compareTimes("10:20:00 AM",time)) {
				periodInformation="Between 2nd and 3rd Period - 10:17 AM to 10:20 AM <br />" + remainingTime(time,"10:20:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:20:00 AM") && compareTimes("10:53:00 AM",time)) {
				periodInformation="3rd Period - 10:20 AM to 10:53 AM <br />" + remainingTime(time,"10:53:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:53:00 AM") && compareTimes("10:56:00 AM",time)) {
				periodInformation="Between 3rd and 4th Period - 10:53 AM to 10:56 AM <br />" + remainingTime(time,"10:56:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:56:00 AM") && compareTimes("11:29:00 AM",time)) {
				periodInformation="4th Period - 10:56 AM to 11:29 AM <br />" + remainingTime(time,"11:29:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:29:00 AM") && compareTimes("11:32 AM",time)) {
				periodInformation="Between 4th and 5th Period - 11:29 AM to 11:32 AM <br />" + remainingTime(time,"11:32:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:32:00 AM") && compareTimes("12:05:00 PM",time)) {
				periodInformation="5th Period - 11:32 AM to 12:05 PM <br />" + remainingTime(time,"12:05:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:05:00 PM") && compareTimes("12:08 PM",time)) {
				periodInformation="Between 5th and 6th Period - 12:05 PM to 12:08 PM <br />" + remainingTime(time,"12:08:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:08:00 PM") && compareTimes("12:41:00 PM",time)) {
				periodInformation="6th Period - 12:01 AM to 12:41 PM <br />" + remainingTime(time,"12:41:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:41:00 PM") && compareTimes("12:44 PM",time)) {
				periodInformation="Between 6th and 7th Period - 12:41 PM to 12:44 PM <br />" + remainingTime(time,"12:44:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:44:00 PM") && compareTimes("1:18:00 PM",time)) {
				periodInformation="7th Period - 12:44 PM to 1:18 PM <br />" + remainingTime(time,"1:18:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:44:00 PM") && compareTimes("1:18 PM",time)) {
				periodInformation="Between 7th and 8th Period - 1:18 PM to 1:21 PM <br />" + remainingTime(time,"1:21:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:21:00 PM") && compareTimes("1:55:00 PM",time)) {
				periodInformation="8th Period - 1:21 PM to 1:55 PM <br />" + remainingTime(time,"1:55:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:55:00 PM") && compareTimes("1:58 PM",time)) {
				periodInformation="Between 8th and 9th Period - 1:55 PM to 1:58 PM <br />" + remainingTime(time,"1:58:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:58:00 PM") && compareTimes("2:33:00 PM",time)) {
				periodInformation="9th Period - 1:58 PM to 2:33 PM <br />" + remainingTime(time,"2:33:00 PM") + " Remaining";
			} else if (compareTimes(time,"2:33:00 PM") && compareTimes("2:35 PM",time)) {
				periodInformation="Between 9th and 10th Period - 2:33 PM to 2:35 PM <br />" + remainingTime(time,"2:35:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"2:35:00 PM") && compareTimes("3:15:00 PM",time)) {
				periodInformation="10th Period - 2:35 PM to 3:15 PM <br />" + remainingTime(time,"3:15:00 PM") + " Remaining";
			} else if (compareTimes(time,"3:15:00 PM") && compareTimes("3:30:00 PM",time)) {
				periodInformation="School's Over<br />" + remainingTime(time,"3:30:00 PM") + " Remaining";
			}
			break;

		case "TwoHourDelay":

			if (compareTimes(time,"9:30:00 AM") && compareTimes("10:00:00 AM", time)){
				periodInformation="Guide Room will begin in " + remainingTime(time,"10:00:00 AM");

			} else if (compareTimes(time,"10:00:00 AM") && compareTimes("10:06:00 AM",time)) {
				periodInformation="Guide Room - 10:00 AM to 10:06 AM <br />" + remainingTime(time,"10:06:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:06:00 AM") && compareTimes("10:08:00 AM",time)) {
				periodInformation="Between Guide Room and 1st Period - 10:06 AM to 10:08 AM <br />" + remainingTime(time,"10:08:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:08:00 AM") && compareTimes("10:34:00 AM",time)) {
				periodInformation="1st Period - 10:08 AM to 10:34 AM <br />" + remainingTime(time,"10:34:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:34:00 AM") && compareTimes("10:37:00 AM",time)) {
				periodInformation="Between 1st and 2nd Period - 10:34 AM to 10:37 AM <br />" + remainingTime(time,"10:37:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:37:00 AM") && compareTimes("11:03:00 AM",time)) {
				periodInformation="2nd Period - 10:37 AM to 11:03 AM <br />" + remainingTime(time,"11:03:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:03:00 AM") && compareTimes("11:06:00 AM",time)) {
				periodInformation="Between 2nd and 3rd Period - 11:03 AM to 11:06 AM <br />" + remainingTime(time,"11:06:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:06:00 AM") && compareTimes("11:32:00 AM",time)) {
				periodInformation="3rd Period - 11:06 AM to 11:32 AM <br />" + remainingTime(time,"11:32:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:32:00 AM") && compareTimes("11:35:00 AM",time)) {
				periodInformation="Between 3rd and 4th Period - 11:32 AM to 11:35 AM <br />" + remainingTime(time,"11:35:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:35:00 AM") && compareTimes("12:01:00 PM",time)) {
				periodInformation="4th Period - 11:35 AM to 12:01 PM <br />" + remainingTime(time,"12:01:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:01:00 PM") && compareTimes("12:04:00 PM",time)) {
				periodInformation="Between 4th and 5th Period - 12:01 PM to 12:04 PM <br />" + remainingTime(time,"12:04:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:04:00 PM") && compareTimes("12:31:00 PM",time)) {
				periodInformation="5th Period - 12:04 PM to 12:31 PM <br />" + remainingTime(time,"12:31:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:31:00 PM") && compareTimes("12:34 PM",time)) {
				periodInformation="Between 5th and 6th Period - 12:32 PM to 12:34 PM <br />" + remainingTime(time,"12:34:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:34:00 PM") && compareTimes("1:01:00 PM",time)) {
				periodInformation="6th Period - 12:34 PM to 1:01 PM <br />" + remainingTime(time,"1:01:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:01:00 PM") && compareTimes("1:04 PM",time)) {
				periodInformation="Between 6th and 7th Period - 1:01 PM to 1:04 PM <br />" + remainingTime(time,"1:04:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:04:00 PM") && compareTimes("1:31:00 PM",time)) {
				periodInformation="7th Period - 1:04 AM to 1:31 PM <br />" + remainingTime(time,"1:31:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:31:00 PM") && compareTimes("1:34 PM",time)) {
				periodInformation="Between 7th and 8th Period - 1:31 PM to 1:34 PM <br />" + remainingTime(time,"1:34:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:34:00 PM") && compareTimes("2:01:00 PM",time)) {
				periodInformation="8th Period - 1:34 PM to 2:01 PM <br />" + remainingTime(time,"2:01:00 PM") + " Remaining";
			} else if (compareTimes(time,"2:01:00 PM") && compareTimes("2:04 PM",time)) {
				periodInformation="Between 8th and 9th Period - 2:01 PM to 2:04 PM <br />" + remainingTime(time,"2:04:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"2:04:00 PM") && compareTimes("2:33:00 PM",time)) {
				periodInformation="9th Period - 2:04 PM to 2:33 PM <br />" + remainingTime(time,"2:33:00 PM") + " Remaining";
			} else if (compareTimes(time,"2:33:00 PM") && compareTimes("2:35 PM",time)) {
				periodInformation="Between 9th and 10th Period - 2:33 PM to 2:35 PM <br />" + remainingTime(time,"2:35:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"2:35:00 PM") && compareTimes("3:15:00 PM",time)) {
				periodInformation="10th Period - 2:35 PM to 3:15 PM <br />" + remainingTime(time,"3:15:00 PM") + " Remaining";
			} else if (compareTimes(time,"3:15:00 PM") && compareTimes("3:30:00 PM",time)) {
				periodInformation="School's Over<br />" + remainingTime(time,"3:30:00 PM") + " Remaining";
			}
			break;

		case "PMAssembly":
			if (compareTimes(time,"8:00:00 AM") && compareTimes("8:06:00 AM",time)) {
				periodInformation="Guide Room - 8:00 AM to 8:06 AM <br />" + remainingTime(time,"8:06:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:06:00 AM") && compareTimes("9:08:00 AM",time)) {
				periodInformation="Between Guide Room and 1st Period - 9:06 AM to 9:08 AM <br />" + remainingTime(time,"9:08:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:08:00 AM") && compareTimes("8:43:00 AM",time)) {
				periodInformation="1st Period - 8:08 AM to 10:43 AM <br />" + remainingTime(time,"8:43:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:43:00 AM") && compareTimes("8:46:00 AM",time)) {
				periodInformation="Between 1st and 2nd Period - 8:43 AM to 8:46 AM <br />" + remainingTime(time,"8:46:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:46:00 AM") && compareTimes("9:21:00 AM",time)) {
				periodInformation="2nd Period - 8:46 AM to 9:21 AM <br />" + remainingTime(time,"9:21:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:21:00 AM") && compareTimes("9:24:00 AM",time)) {
				periodInformation="Between 2nd and 3rd Period - 9:21 AM to 9:24 AM <br />" + remainingTime(time,"9:24:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:24:00 AM") && compareTimes("9:59:00 AM",time)) {
				periodInformation="3rd Period - 9:24 AM to 9:59 AM <br />" + remainingTime(time,"9:59:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:59:00 AM") && compareTimes("10:02:00 AM",time)) {
				periodInformation="Between 3rd and 4th Period - 9:59 AM to 10:02 AM <br />" + remainingTime(time,"10:02:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:02:00 AM") && compareTimes("10:37:00 PM",time)) {
				periodInformation="4th Period - 10:02 AM to 10:37 PM <br />" + remainingTime(time,"10:37:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:37:00 AM") && compareTimes("10:40:00 AM",time)) {
				periodInformation="Between 4th and 5th Period - 10:37 AM to 10:40 AM <br />" + remainingTime(time,"10:40:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:40:00 AM") && compareTimes("11:15:00 AM",time)) {
				periodInformation="5th Period - 10:40 AM to 11:15 PM <br />" + remainingTime(time,"11:15:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:15:00 AM") && compareTimes("11:18 AM",time)) {
				periodInformation="Between 5th and 6th Period - 11:15 AM to 11:18 AM <br />" + remainingTime(time,"11:18:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:18:00 AM") && compareTimes("11:53:00 AM",time)) {
				periodInformation="6th Period - 11:18 AM to 11:53 AM <br />" + remainingTime(time,"11:53:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:53:00 AM") && compareTimes("11:56 AM",time)) {
				periodInformation="Between 6th and 7th Period - 11:53 AM to 11:56 AM <br />" + remainingTime(time,"11:56:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:56:00 AM") && compareTimes("12:31:00 PM",time)) {
				periodInformation="7th Period - 11:56 AM to 12:31 PM <br />" + remainingTime(time,"12:31:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:31:00 PM") && compareTimes("12:34 PM",time)) {
				periodInformation="Between 7th and 8th Period - 12:31 PM to 12:34 PM <br />" + remainingTime(time,"12:34:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:34:00 PM") && compareTimes("1:09:00 PM",time)) {
				periodInformation="8th Period - 12:34 PM to 1:09 PM <br />" + remainingTime(time,"1:09:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:09:00 PM") && compareTimes("1:12 PM",time)) {
				periodInformation="Between 8th and 9th Period - 1:09 PM to 1:12 PM <br />" + remainingTime(time,"1:12:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:12:00 PM") && compareTimes("1:47:00 PM",time)) {
				periodInformation="9th Period - 1:12 PM to 1:47 PM <br />" + remainingTime(time,"1:47:00 PM") + " Remaining";

			} else if (compareTimes(time,"1:47:00 PM") && compareTimes("2:33 PM",time)) {
				periodInformation="Assembly - 1:47 PM to 2:33 PM <br />" + remainingTime(time,"2:33:00 PM") + " Minute(s) Remaining";
			} else if (compareTimes(time,"2:33:00 PM") && compareTimes("2:35:00 PM",time)) {
				periodInformation="Between Assembly and 10th Period - 2:33 PM to 2:35 PM <br />" + remainingTime(time,"2:35:00 PM") + " Remaining";

			} else if (compareTimes(time,"2:35:00 PM") && compareTimes("3:15:00 PM",time)) {
				periodInformation="10th Period - 2:35 PM to 3:15 PM";
			} else if (compareTimes(time,"3:15:00 PM") && compareTimes("3:30:00 PM",time)) {
					periodInformation="School's Over<br />" + remainingTime(time,"3:30:00 PM") + " Remaining";
			}
			break;


		default:
			if (compareTimes(time,"7:30:00 AM") && compareTimes("8:00:00 AM", time)){
				periodInformation="Guide Room will begin in " + remainingTime(time,"8:00:00 AM");
			} else if (compareTimes(time,"8:00:00 AM") && compareTimes("8:06:00 AM",time)) {
				periodInformation="Guide Room - 8:00 AM to 8:06 AM <br />" + remainingTime(time,"8:06:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:06:00 AM") && compareTimes("8:08:00 AM",time)) {
				periodInformation="Between Guide Room and 1st Period - 8:06 AM to 8:08 AM <br />" + remainingTime(time,"8:08:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:08:00 AM") && compareTimes("8:48:00 AM",time)) {
				periodInformation="1st Period - 8:08 AM to 8:48 AM <br />" + remainingTime(time,"8:48:00 AM") + " Remaining";
			} else if (compareTimes(time,"8:48:00 AM") && compareTimes("8:51:00 AM",time)) {
				periodInformation="Between 1st and 2nd Period - 8:48 AM to 8:51 AM <br />" + remainingTime(time,"8:51:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"8:51:00 AM") && compareTimes("9:31:00 AM",time)) {
				periodInformation="2nd Period - 8:51 AM to 9:31 AM <br />" + remainingTime(time,"9:31:00 AM") + " Remaining";
			} else if (compareTimes(time,"9:31:00 AM") && compareTimes("9:34:00 AM",time)) {
				periodInformation="Between 2nd and 3rd Period - 9:31 AM to 9:34 AM <br />" + remainingTime(time,"9:34:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"9:34:00 AM") && compareTimes("10:14:00 AM",time)) {
				periodInformation="3rd Period - 9:34 AM to 10:14 AM <br />" + remainingTime(time,"10:14:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:14:00 AM") && compareTimes("10:17:00 AM",time)) {
				periodInformation="Between 3rd and 4th Period - 10:14 AM to 10:17 AM <br />" + remainingTime(time,"10:17:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"10:17:00 AM") && compareTimes("10:57:00 AM",time)) {
				periodInformation="4th Period - 10:17 AM to 10:57 AM <br />" + remainingTime(time,"10:57:00 AM") + " Remaining";
			} else if (compareTimes(time,"10:57:00 AM") && compareTimes("11:00 AM",time)) {
				periodInformation="Between 4th and 5th Period - 10:57 AM to 11:00 AM <br />" + remainingTime(time,"11:00:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:00:00 AM") && compareTimes("11:40:00 AM",time)) {
				periodInformation="5th Period - 11:00 AM to 11:40 AM <br />" + remainingTime(time,"11:40:00 AM") + " Remaining";
			} else if (compareTimes(time,"11:40:00 AM") && compareTimes("11:43 AM",time)) {
				periodInformation="Between 5th and 6th Period - 11:40 AM to 11:43 AM <br />" + remainingTime(time,"11:43:00 AM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"11:43:00 AM") && compareTimes("12:23:00 PM",time)) {
				periodInformation="6th Period - 11:43 AM to 12:23 PM <br />" + remainingTime(time,"12:23:00 PM") + " Remaining";
			} else if (compareTimes(time,"12:23:00 PM") && compareTimes("12:26 PM",time)) {
				periodInformation="Between 6th and 7th Period - 12:23 PM to 12:26 PM <br />" + remainingTime(time,"12:26:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"12:26:00 PM") && compareTimes("1:06:00 PM",time)) {
				periodInformation="7th Period - 12:26 PM to 1:06 PM <br />" + remainingTime(time,"1:06:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:06:00 PM") && compareTimes("1:09 PM",time)) {
				periodInformation="Between 7th and 8th Period - 1:06 PM to 1:09 PM <br />" + remainingTime(time,"1:09:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:09:00 PM") && compareTimes("1:49:00 PM",time)) {
				periodInformation="8th Period - 1:09 PM to 1:49 PM <br />" + remainingTime(time,"1:49:00 PM") + " Remaining";
			} else if (compareTimes(time,"1:49:00 PM") && compareTimes("1:52 PM",time)) {
				periodInformation="Between 8th and 9th Period - 1:49 PM to 1:52 PM <br />" + remainingTime(time,"1:52:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"1:52:00 PM") && compareTimes("2:33:00 PM",time)) {
				periodInformation="9th Period - 1:52 PM to 2:33 PM <br />" + remainingTime(time,"2:33:00 PM") + " Remaining";
			} else if (compareTimes(time,"2:33:00 PM") && compareTimes("2:35 PM",time)) {
				periodInformation="Between 9th and 10th Period - 2:33 PM to 2:35 PM <br />" + remainingTime(time,"2:35:00 PM") + " Minute(s) Remaining";

			} else if (compareTimes(time,"2:35:00 PM") && compareTimes("3:15:00 PM",time)) {
				periodInformation="10th Period - 2:35 PM to 3:15 PM <br />" + remainingTime(time,"3:15:00 PM") + " Remaining";
			} else if (compareTimes(time,"3:15:00 PM") && compareTimes("3:30:00 PM",time)) {
				periodInformation="School's Over<br />" + remainingTime(time,"3:30:00 PM") + " Remaining";
			}
			break;
		}

	showPeriod.innerHTML=periodInformation
}

function compareTimes(firstTime,secondTime) {

	var adjustedFirst=Date.parse('16 Jun 1978 '+firstTime);
	var adjustedSecond=Date.parse('16 Jun 1978 '+secondTime);

	if (adjustedFirst>adjustedSecond) {
		return true;
	} else {
		return false;
	}
}

function remainingMinutes(firstTime,secondTime) {

	var adjustedFirst=Date.parse('16 Jun 1978 '+firstTime);
	var adjustedSecond=Date.parse('16 Jun 1978 '+secondTime);

	return parseInt(((adjustedSecond - adjustedFirst)/1000)/60) +  1
}

function remainingTime(firstTime,secondTime) {

	var adjustedFirst=Date.parse('16 Jun 1978 '+firstTime);
	var adjustedSecond=Date.parse('16 Jun 1978 '+secondTime);

	minutesLeft = parseInt(((adjustedSecond - adjustedFirst)/1000)/60)
	secondsLeft = parseInt(((adjustedSecond - adjustedFirst)/1000)%60)
	secondsLeft = ("0" + secondsLeft).slice(-2)

	return minutesLeft + ":" + secondsLeft
}
