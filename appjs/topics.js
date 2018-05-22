google.charts.load('current', {'packages': ['table']});
google.charts.setOnLoadCallback(drawTable)

function reformatData(jsonData){
    var temp= jsonData.Topics;
    console.log("temp: " + JSON.stringify(temp));
    var result = [];
    var i;
    var row;
    for (i=0; i < temp.length; ++i){
        row= temp[i];
        dataElement = [];
        dataElement.push('#' + row.topic);
        dataElement.push(row.count);
        result.push(dataElement);
    }
    console.log("Data: " + JSON.stringify(result));
    return result;
}

function drawTable() {
    var jsonData = $.ajax({
        url: "http://127.0.0.1:5000/Dashboard_DB/topics",
        dataType: "json",
        async: false
    }).responseText;

    console.log("jsonData: " + JSON.parse(jsonData));

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topic');
    data.addColumn('number', 'Count');
    data.addRows(reformatData(JSON.parse(jsonData)));

    var table = new google.visualization.Table(document.getElementById('topics'));

    table.draw(data, {title: 'Trending Topics', showRowNumber: true, width: '50%'});

}