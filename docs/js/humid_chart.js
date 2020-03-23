var humid_chart = document.getElementById('humid_chart');
var data = {
    labels: ["12:10:05", "12:11:05", "12:12:05", "12:13:05", "12:14:05"],
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
            data: ["51.45", "51.4", "51.25", "51.3", "51.2"],
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