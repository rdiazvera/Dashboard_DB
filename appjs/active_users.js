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
        dataElement.push(row.username);
        dataElement.push(row.message_count);
        dataElement.push(row.replies_count);
        dataElement.push(row.total_actions);
        result.push(dataElement);
    }
    console.log("Data: " + JSON.stringify(result));
    return result;
}