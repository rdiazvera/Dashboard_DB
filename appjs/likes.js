google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function reformatData(jsonData){
    var temp= jsonData.NumberOfLikes;
    console.log("temp: " + JSON.stringify(temp));
    var result = [];
    var i;
    var row;
    for (i=0; i < temp.length; ++i){
        row= temp[i];
        dataElement = [];
        dataElement.push(row.date.substr(5,12));
        dataElement.push(row.count);
        result.push(dataElement);
    }
    console.log("Data: " + JSON.stringify(result));
    return result;
}

function drawChart() {
    var jsonData = $.ajax({
        url: "http://127.0.0.1:5000/Dashboard_DB/likes",
        dataType: "json",
        async: false
    }).responseText;

    console.log("jsonData: " + JSON.parse(jsonData));

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'date');
    data.addColumn('number', 'count');
    data.addRows(reformatData(JSON.parse(jsonData)));

    var options = {
        title: 'Likes per Day',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Count',
            minValue: 0
        },
        vAxis: {
            title: 'Date'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('num_likes'));

    chart.draw(data, options);
}
