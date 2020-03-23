var card1_status = 0;
var relay1 = document.getElementById("relay1");

function card1Click() {
    if (card1_status == 1) {
        card1_status = 0;
        relay1.innerText = "OFF";
    } else {
        card1_status = 1;
        relay1.innerText = "ON";
    }
}
