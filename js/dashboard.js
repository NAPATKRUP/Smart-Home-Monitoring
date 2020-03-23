// Variables
var temperature = document.getElementById("temperature");
var humidity = document.getElementById("humidity");
var light = document.getElementById("light");
var loud = document.getElementById("loud");

function loadTemperature() {
    firebase.database().ref("realtime/temperature").on('value', function(snapshot){
        temperature.innerText = snapshot.val();
      });
}

function loadHumidity() {
    firebase.database().ref("realtime/humidity").on('value', function(snapshot){
        humidity.innerText = snapshot.val();
      });
}

function loadLight() {
    firebase.database().ref("realtime/light").on('value', function(snapshot){
        if (snapshot.val()) {
            light.innerText = "Bright";
        } else {
            light.innerText = "Dark";
        }
      });
}

function loadLoud() {
    firebase.database().ref("realtime/loud").on('value', function(snapshot){
        if (snapshot.val()) {
            loud.innerText = "Loud";
        } else {
            loud.innerText = "Silent";
        }
      });
}

function UpdateStatus() {
    loadTemperature();
    loadHumidity();
    loadLight();
    loadLoud();
    // console.log("Updated!")
}
