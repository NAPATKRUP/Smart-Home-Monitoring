var count_humid = 0;
var now_time;
var now_humidity;
var humid_chart = document.getElementById('humid_chart');
var data = {
    labels: [],
    datasets: [
        {
            label: "Humidity",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [],
        }
    ]
};

var option = {
    showLines: true,
};
var humidChart = Chart.Line(humid_chart,{
	data:data,
    options:option
});

function getTime() {
    var today = new Date();
    now_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

function addHumidChart(){
    if (count_humid != 5) {
        humidChart.data.datasets[0].data[count_humid] = now_humidity;
        humidChart.data.labels[count_humid] = now_time;
        humidChart.update();
        count_humid++;
    } else {
        humidChart.data.datasets[0].data.shift();
        humidChart.data.labels.shift();
        humidChart.data.datasets[0].data[count_humid - 1] = now_humidity;
        humidChart.data.labels[count_humid - 1] = now_time;
        humidChart.update();
    }
}

function getHumidChart() {
    firebase.database().ref("realtime/humidity").on('value', function(snapshot){
        now_humidity = snapshot.val();
        getTime();
        addHumidChart();
      });
    // console.log(now_humidity);
}

function updateHumidChart() {
    getHumidChart();
}