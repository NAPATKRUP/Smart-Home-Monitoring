var temp_chart = document.getElementById('temp_chart');
var data = {
    labels: ["12:10:05", "12:11:05", "12:12:05", "12:13:05", "12:14:05"],
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
            data: ["25.45", "25.4", "25.25", "25.3", "25.6"],
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