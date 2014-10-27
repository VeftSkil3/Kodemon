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
            tableContent += '<td><a href="#" class="linkshowtimes" title="Show Details">' + this + '</a></td>';
            tableContent += '</tr>';
        });;
        // Inject the whole content string into our existing HTML table
        $('#functionList table tbody').html(tableContent);
    });
};


function showFunctionTimes(event) {
    event.preventDefault();
	// Empty content string
    var tableContent2 = '';
    // jQuery AJAX call for JSON
    $.getJSON( '/functions/times/544aac4c2e79ce831957102b', function( data ) {
        // Stick our function data array into a functionlist variable in the global object
		//functionTimesData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent2 += '<tr>';
            tableContent2 += '<td>' + this.timestamp + '</td>';
            tableContent2 += '<td>' + this.execution_time + '</td>';
            tableContent2 += '<td>' + this.key + '</td>';
            tableContent2 += '</tr>';
        });;
        // Inject the whole content string into our existing HTML table
        $('#functionTimes table tbody').html(tableContent2);
    });
};
