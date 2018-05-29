google.charts.load('current', {'packages': ['table']});
google.charts.setOnLoadCallback(drawTable)

function reformatTopicsData(jsonData){
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

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topic');
    data.addColumn('number', 'Count');
    data.addRows(reformatTopicsData(JSON.parse(jsonData)));

    var options = {
        showRowNumber: true,
        width: '100%',
        height: '50%',
        sort: 'disable',
        style: 'font-style:bold; font-size:22px;'};

    var table = new google.visualization.Table(document.getElementById('topics'));

    table.draw(data, options);

}