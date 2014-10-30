// Functionlist data array for filling in selection box
var functionListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the functionList combo on initial page load
    populateCombo();
});

// Functions =============================================================
//Check for valid dates
function isValidDate(s) {
    var bits = s.split('-');
    var d = new Date(bits[0], bits[1] - 1, bits[2]);
    return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[2]);
};

function getMinTime( array ){
    return Math.min.apply( Math, array );
};

function getMaxTime( array ){
    return Math.max.apply( Math, array );
};

function getAverageTime( array ){
    var sum = 0;
    for( var i = 0; i < array.length; i++ ){
        sum += parseFloat(array[i]); 
    };
    return sum / array.length;    
};

// Fill table with data
function populateCombo() {
    // Get the combo
    var combo = document.getElementById("combo");
    // jQuery AJAX call for JSON
    $.getJSON( '/functions/functionlist', function( data ) {
        // Stick our function data array into a functionlist variable in the global object
        functionListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            var option = document.createElement("option");
            //option.text = /[^-]*$/.exec(this.Key)[0];
            option.text = /[^/]*$/.exec(this.Key)[0];
            option.value = this.Id;
            try {
                combo.add(option, null); //Standard 
            }catch(error) {
                combo.add(option); // IE only
            }
        });;
    });
};

function showFunctionTimes(key) {
	// Empty content string
    var tableContent = '';
    var tableSum = '';
    var execTimes = [];

    document.getElementById("error").innerHTML = "";

    if(document.getElementById("dates").checked === true){

        var date1=document.getElementById("from").value;
        var date2=document.getElementById("to").value;

        //Check for valid dates
        if(!isValidDate(date1) || !isValidDate(date2)){
            document.getElementById("error").innerHTML = "Search by dates is selected and date value is not correct!";
            return;
        }
        
        // jQuery AJAX call for JSON
        $.getJSON( '/functions/times/' + key + '/' + date1 + '/' + date2, function( data ) {
            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.DateTime.slice(0, 10) +  "  " + this.DateTime.slice(12, 19) + '</td>';
                tableContent += '<td>' + this.ExecTime.toFixed(4) + '</td>';
                tableContent += '</tr>';
                execTimes.push(this.ExecTime);
            });;

            tableSum += '<tr>';
            tableSum += '<td>' + getAverageTime(execTimes).toFixed(4) + '</td>';
            tableSum += '<td>' + getMaxTime(execTimes).toFixed(4) + '</td>';
            tableSum += '<td>' + getMinTime(execTimes).toFixed(4) + '</td>';
            tableSum += '</tr>';

            // Inject the whole content string into our existing HTML table
            $('#functionTimes table tbody').html(tableContent);
            $('#functionSummary table tbody').html(tableSum);
        });
    }
    else {
        // jQuery AJAX call for JSON
        $.getJSON( '/functions/times/' + key, function( data ) {
            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.DateTime.slice(0, 10) + "  " + this.DateTime.slice(12, 19) + '</td>';
                tableContent += '<td>' + this.ExecTime.toFixed(4) + '</td>';
                tableContent += '</tr>';
                execTimes.push(this.ExecTime);
            });

            tableSum += '<tr>';
            tableSum += '<td>' + getAverageTime(execTimes).toFixed(4) + '</td>';
            tableSum += '<td>' + getMaxTime(execTimes).toFixed(4) + '</td>';
            tableSum += '<td>' + getMinTime(execTimes).toFixed(4) + '</td>';
            tableSum += '</tr>';

            // Inject the whole content string into our existing HTML table
            $('#functionTimes table tbody').html(tableContent);
            $('#functionSummary table tbody').html(tableSum);
        });
    }
};
