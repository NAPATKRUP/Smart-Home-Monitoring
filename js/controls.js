var card1_status;
var relay1 = document.getElementById("relay1");

firebase.database().ref("relay/relay1").on('value', function(snapshot){
    card1_status = snapshot.val();
    if (card1_status == 1) {
        relay1.innerText = "ON";
    } else {
        relay1.innerText = "OFF";
    }
  });

function card1Click() {
    if (card1_status == 1) {
        var updates = {};
        updates["relay/relay1"] = 0;
        firebase.database().ref().update(updates);
    } else {
        var updates = {};
        updates["relay/relay1"] = 1;
        firebase.database().ref().update(updates);
    }
}
