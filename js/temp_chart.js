var count_temp = 0;
var now_time;
var now_temperature;
var temp_chart = document.getElementById('temp_chart');
var data = {
    labels: [],
    datasets: [
        {
            label: "Temperature",
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
var tempChart = Chart.Line(temp_chart,{
	data:data,
    options:option
});

function getTime() {
    var today = new Date();
    now_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

function addTempChart(){
    if (count_temp != 5) {
        tempChart.data.datasets[0].data[count_temp] = now_temperature;
        tempChart.data.labels[count_temp] = now_time;
        tempChart.update();
        count_temp++;
    } else {
        tempChart.data.datasets[0].data.shift();
        tempChart.data.labels.shift();
        tempChart.data.datasets[0].data[count_temp - 1] = now_temperature;
        tempChart.data.labels[count_temp - 1] = now_time;
        tempChart.update();
    }
}

function getTempChart() {
    firebase.database().ref("realtime/temperature").on('value', function(snapshot){
        now_temperature = snapshot.val();
        getTime();
        addTempChart();
      });
    // console.log(now_temperature);
}

function updateTempChart() {
    getTempChart();
}