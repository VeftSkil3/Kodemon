// Functionlist data array for filling in selection box
var functionListData = [];


// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the functionList table on initial page load
    populateTable();
    
    // function link click
    $('#functionList table tbody').on('click', 'td a.linkshowtimes', showFunctionTimes);


});


// Functions =============================================================


// Fill table with data
function populateTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON( '/functions/functionlist', function( data ) {
		// Stick our function data array into a functionlist variable in the global object
		functionListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowtimes" rel="' + this.Id + '" title="Show Details">' + /[^-]*$/.exec(this.Key)[0] + '</a></td>';
            tableContent += '</tr>';
        });;
        // Inject the whole content string into our existing HTML table
        $('#functionList table tbody').html(tableContent);
    });
};


function showFunctionTimes(event) {
    event.preventDefault();
	// Empty content string
    var tableContent = '';
    var date1=document.getElementById("from").value;
    var date2=document.getElementById("to").value;
    if(document.getElementById("dates").checked){
        // jQuery AJAX call for JSON
        $.getJSON( '/functions/times/' + $(this).attr('rel') + '/' + date1 + '/' + date2, function( data ) {
            // Stick our function data array into a functionlist variable in the global object
            //functionTimesData = data;

            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.DateTime + '</td>';
                tableContent += '<td>' + this.ExecTime + '</td>';
                tableContent += '</tr>';
            });;
            // Inject the whole content string into our existing HTML table
            $('#functionTimes table tbody').html(tableContent);
        });
    }
    else {
        // jQuery AJAX call for JSON
        $.getJSON( '/functions/times/' + $(this).attr('rel'), function( data ) {
            // Stick our function data array into a functionlist variable in the global object
            //functionTimesData = data;

            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.DateTime + '</td>';
                tableContent += '<td>' + this.ExecTime + '</td>';
                tableContent += '</tr>';
            });;
            // Inject the whole content string into our existing HTML table
            $('#functionTimes table tbody').html(tableContent);
        });
    }
};
