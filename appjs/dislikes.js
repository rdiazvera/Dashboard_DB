google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function reformatDislikesData(jsonData){
    var temp= jsonData.NumberOfDislikes;
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
        url: "http://127.0.0.1:5000/Dashboard_DB/dislikes",
        dataType: "json",
        async: false
    }).responseText;

    console.log("jsonData: " + JSON.parse(jsonData));

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'date');
    data.addColumn('number', 'count');
    data.addRows(reformatDislikesData(JSON.parse(jsonData)));

    var options = {
        width: '1300',
        height: '500',
        bar: {groupWidth: "75%"},
        legend: { position: "none" },
        hAxis: {title: 'Date'},
        vAxis: {title: 'Dislikes Count', minValue: 0}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('dislikes'));

    chart.draw(data, options);
}
