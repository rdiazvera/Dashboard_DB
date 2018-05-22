// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages': ['corechart', 'table']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawLikesChart);

google.charts.setOnLoadCallback(drawTopicsTable);

function reformatTopicData(jsonData){
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

function reformatCountData(jsonData){
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

function reformatUsersData(jsonData){
    var temp= jsonData.NumberOfLikes;
    console.log("temp: " + JSON.stringify(temp));
    var result = [];
    var i;
    var row;
    for (i=0; i < temp.length; ++i){
        row= temp[i];
        dataElement = [];
        dataElement.push(row.username);
        dataElement.push(row.message_count);
        dataElement.push(row.replies_count);
        dataElement.push(row.total_actions);
        result.push(dataElement);
    }
    console.log("Data: " + JSON.stringify(result));
    return result;
}

function drawTopicsTable() {
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
    data.addRows(reformatTopicData(JSON.parse(jsonData)));

    var table = new google.visualization.Table(document.getElementById('topics'));

    table.draw(data, {title: 'Trending Topics', showRowNumber: true, width: '50%'});

}

function drawLikesChart() {
    var jsonData = $.ajax({
        url: "http://127.0.0.1:5000/Dashboard_DB/likes",
        dataType: "json",
        async: false
    }).responseText;

    console.log("jsonData: " + JSON.parse(jsonData));

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'date');
    data.addColumn('number', 'count');
    data.addRows(reformatCountData(JSON.parse(jsonData)));

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
