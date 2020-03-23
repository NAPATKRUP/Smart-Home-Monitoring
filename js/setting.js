// Variables
// General
var refreshTime = document.getElementById("refreshTime");
var loudSound = document.getElementById("loudSound");
var nowSound = document.getElementById("nowSound");
// Line
var token = document.getElementById("token");
var notifyTime = document.getElementById("notifyTime");
var temp_alert = document.getElementById("temp_alert");
var waitTime = document.getElementById("waitTime");
// Temperature Range
var temp_range = document.getElementById("temp_range");
var low_display = document.getElementById("low_display");
var medium_display = document.getElementById("medium_display");
var high_display = document.getElementById("high_display");
// Alert
var notify_enable = document.getElementById("notify_enable");
var notify_disable = document.getElementById("notify_disable");
var temp_enable = document.getElementById("temp_enable");
var temp_disable = document.getElementById("temp_disable");

// AlertStatus
var alertalert = document.getElementById("alertalert");

function saveGeneral() {
    // Send Delay Time
    var updates = {};
    if (refreshTime.value != "") {
        updates["setting/general/delay_time"] = Number(refreshTime.value) * 1000;
        firebase.database().ref().update(updates);
    }
    // Send Max Sound Value
    var updates = {};
    if (loudSound.value != "") {
        updates["setting/general/max_sound"] = Number(loudSound.value);
        firebase.database().ref().update(updates);
    }
    // Send Update Status
    var updates = {};
    if (refreshTime.value != "" || loudSound.value != "") {
        updates["setting/general/update"] = 1;
        firebase.database().ref().update(updates);
    }

    //Alert
    loadAlert("Save", "General");
}

function loadGeneral() {
    // Get Delay Time
    firebase.database().ref("setting/general/delay_time").on('value', function(snapshot){
        refreshTime.value = snapshot.val() / 1000;
      });
    // Get Max Sound
    firebase.database().ref("setting/general/max_sound").on('value', function(snapshot){
        loudSound.value = snapshot.val();
      });

    //Alert
    loadAlert("Load", "General");
}

function saveLineNotify() {
    // Send Token
    var updates = {};
    if (token.value != "") {
        updates["setting/line/token"] = token.value;
        firebase.database().ref().update(updates);
    }
    // Send Loop Time
    var updates = {};
    if (notifyTime.value != "") {
        updates["setting/line/send_time"] = Number(notifyTime.value) * 1000;
        firebase.database().ref().update(updates);
    }
    // Send Temperature Alert
    var updates = {};
    if (temp_alert.value != "") {
        updates["setting/temp/alert"] = Number(temp_alert.value);
        firebase.database().ref().update(updates);
    }
    // Send Temperature wait time
    var updates = {};
    if (waitTime.value != "") {
        updates["setting/alert/delay"] = Number(waitTime.value) * 1000;
        firebase.database().ref().update(updates);
    }
    // Send Update Status
    var updates = {};
    if (token.value != "" || notifyTime.value != "" || temp_alert.value != "") {
        updates["setting/line/update"] = 1;
        firebase.database().ref().update(updates);
    }

    //Alert
    loadAlert("Save", "Line Notify");
}

function loadLineNotify() {
    // Get Loop Time
    firebase.database().ref("setting/line/send_time").on('value', function(snapshot){
        notifyTime.value = snapshot.val() / 1000;
      });
    // Get High Temperature
    firebase.database().ref("setting/temp/alert").on('value', function(snapshot){
        temp_alert.value = snapshot.val();
      });
    // Get Temperature wait time
    firebase.database().ref("setting/alert/delay").on('value', function(snapshot){
        waitTime.value = snapshot.val() / 1000;
      });

    //Alert
    loadAlert("Load", "Line Notify");
}

function tempRangeSave() {
    var mytemp = temp_range.value.split("-");
    // Send Bottom Range
    var updates = {};
    if (temp_range.value != "") {
        console.log(mytemp[0]);
        updates["setting/temp/bottom_range"] = Number(mytemp[0]);
        firebase.database().ref().update(updates);
    }
    // Send Top Range
    var updates = {};
    if (temp_range.value != "") {
        console.log(mytemp[1]);
        updates["setting/temp/top_range"] = Number(mytemp[1]);
        firebase.database().ref().update(updates);
    }
    // Display Values
    low_display.innerText = " Less Than " + mytemp[0] + " °C";
    medium_display.innerText = " " + mytemp[0] + " °C" + "  -  " + mytemp[1] + " °C";
    high_display.innerText = " Over " + mytemp[1] + " °C";

    //Alert
    loadAlert("Save", "Temperature Range");
}

function loadtempRange() {
    // Get Bottom range
    firebase.database().ref("setting/temp/bottom_range").on('value', function(snapshot){
        temp_range.value = snapshot.val() + "-";
      });
    // Get Top Range
    firebase.database().ref("setting/temp/top_range").on('value', function(snapshot){
        temp_range.value += snapshot.val();
      });

    //Alert
    loadAlert("Load", "Temperature Range");
}

function loadNowSound() {
    firebase.database().ref("realtime/sound").on('value', function(snapshot){
        nowSound.value = snapshot.val();
      });
}

function UpdateStatus() {
    loadNowSound();
    // console.log("Updated!")
}

function NotifySettingSave() {
    // Send Notify Setting
    var updates = {};
    if (notify_enable.checked != false || notify_disable.checked != false) {
        if (notify_enable.checked == true) {
            updates["setting/alert/notify"] = 1;
            firebase.database().ref().update(updates);
        } else {
            updates["setting/alert/notify"] = 0;
            firebase.database().ref().update(updates);
        }
    }
    // Send HighTemp Setting
    var updates = {};
    if (temp_enable.checked != false || temp_disable.checked != false) {
        if (temp_enable.checked == true) {
            updates["setting/alert/temp"] = 1;
            firebase.database().ref().update(updates);
        } else {
            updates["setting/alert/temp"] = 0;
            firebase.database().ref().update(updates);
        }
    }
    // Send Update Status
    var updates = {};
    if (notify_enable.checked != false || notify_disable.checked != false || temp_enable.checked != false || temp_disable.checked != false) {
        updates["setting/alert/update"] = 1;
        firebase.database().ref().update(updates);
    }

    //Alert
    loadAlert("Save", "Notify Setting");
}

function NotifySettingLoad() {
    firebase.database().ref("setting/alert/notify").on('value', function(snapshot){
        if (snapshot.val()) {
            notify_enable.checked = true;
        } else {
            notify_disable.checked = true;
        }
      });
    firebase.database().ref("setting/alert/temp").on('value', function(snapshot){
        if (snapshot.val()) {
            temp_enable.checked = true;
        } else {
            temp_disable.checked = true;
        }
      });
    //Alert
    loadAlert("Load", "Notify Setting");
}

// Show Alert Status
function loadAlert(mode, selectbox) {
    var showalert = '<strong>' + mode + ' </strong><u>' + selectbox + '</u> has been successfully to setting.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    var adddiv = document.createElement("div");
    if(mode == "Save") {
        adddiv.className = "alert alert-success alert-dismissible fade show";
    }
    else {
        adddiv.className = "alert alert-primary alert-dismissible fade show";
    }
    adddiv.innerHTML = showalert;
    alertalert.appendChild(adddiv);
}