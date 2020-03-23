// Variables
// General
var refreshTime = document.getElementById("refreshTime");
var loudSound = document.getElementById("loudSound");
var nowSound = document.getElementById("nowSound");
var refreshTime_var = 60;
var loudSound_var = 150;
var nowSound_var = 200;
// Line
var token = document.getElementById("token");
var notifyTime = document.getElementById("notifyTime");
var temp_alert = document.getElementById("temp_alert");
var waitTime = document.getElementById("waitTime");
var notifyTime_var = 3600;
var temp_alert_var = 30;
var waitTime_var = 3600;
// Temperature Range
var temp_range = document.getElementById("temp_range");
var low_display = document.getElementById("low_display");
var medium_display = document.getElementById("medium_display");
var high_display = document.getElementById("high_display");
var temp_range_var = ["25", "27"];
// Alert
var notify_enable = document.getElementById("notify_enable");
var notify_disable = document.getElementById("notify_disable");
var temp_enable = document.getElementById("temp_enable");
var temp_disable = document.getElementById("temp_disable");
var notify_var = 1;
var temp_var = 0;

// AlertStatus
var alertalert = document.getElementById("alertalert");

function saveGeneral() {
    // refresh time
    refreshTime_var = refreshTime.value; 
    // loud value
    loudSound_var = loudSound.value;
    // Alert
    loadAlert("Save", "General");
}

function loadGeneral() {
    // refresh time
    refreshTime.value = refreshTime_var; 
    // loud value
    loudSound.value = loudSound_var;
    // Alert
    loadAlert("Load", "General");
}

function saveLineNotify() {
    // Loop Time
    notifyTime_var = notifyTime.value;
    // High Temperature
    temp_alert_var = temp_alert.value;
    // Get Temperature wait time
    waitTime_var = waitTime.value;
    //Alert
    loadAlert("Save", "Line Notify");
}

function loadLineNotify() {
    // Loop Time
    notifyTime.value = notifyTime_var;
    // High Temperature
    temp_alert.value = temp_alert_var;
    // Get Temperature wait time
    waitTime.value = waitTime_var;
    //Alert
    loadAlert("Load", "Line Notify");
}

function tempRangeSave() {
    temp_range_var = temp_range.value.split("-");
    // Display Values
    low_display.innerText = " Less Than " + temp_range_var[0] + " °C";
    medium_display.innerText = " " + temp_range_var[0] + " °C" + "  -  " + temp_range_var[1] + " °C";
    high_display.innerText = " Over " + temp_range_var[1] + " °C";

    //Alert
    loadAlert("Save", "Temperature Range");
}

function loadtempRange() {
    // Get Bottom range
    temp_range.value = temp_range_var[0] + "-" + temp_range_var[1];
    //Alert
    loadAlert("Load", "Temperature Range");
}

function loadNowSound() {
    nowSound.value = 200;
}

function UpdateStatus() {
    loadNowSound();
    // console.log("Updated!")
}

function NotifySettingSave() {
    // Send Notify Setting
    if (notify_enable.checked != false || notify_disable.checked != false) {
        if (notify_enable.checked == true) {
            notify_var = 1;
        } else {
            notify_var = 0;
        }
    }
    // Send HighTemp Setting
    if (temp_enable.checked != false || temp_disable.checked != false) {
        if (temp_enable.checked == true) {
            temp_var = 1;
        } else {
            temp_var = 0;
        }
    }

    //Alert
    loadAlert("Save", "Notify Setting");
}

function NotifySettingLoad() {
    if (notify_var) {
        notify_enable.checked = true;
    } else {
        notify_disable.checked = true;
        }
    if (temp_var) {
        temp_enable.checked = true;
    } else {
        temp_disable.checked = true;
    }

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