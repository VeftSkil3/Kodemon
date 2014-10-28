// Functionlist data array for filling in selection box
var functionListData = [];


// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the functionList table on initial page load
    populateTable();
    
    // function link click
    $('#functionList table tbody').on('click', 'td a.linkshowtimes', showFunctionTimes);

	//var nowTime = new Date();
    //nowTime.setHours(8);
    //nowTime.setMinutes(50);
    //alert(nowTime.toLocaleString());
    //$("#Date1").datebox('setTheDate', nowTime).trigger('datebox', {'method':'doset'});
    //$("#Date2").datebox('setTheDate', nowTime).trigger('datebox', {'method':'doset'});
    //var dateObject = $('#Date1').datebox('getTheDate'),
    //theDate =  $('#Date1').datebox('callFormat', '%d/%m/%Y', dateObject);
	//alert(theDate);
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
            tableContent += '<td><a href="#" class="linkshowtimes" rel="' + this.Id + ' "title="Show Details">' + /[^-]*$/.exec(this.Key)[0] + '</a></td>';
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
    $.getJSON( '/functions/times/' + $(this).attr('rel'), function( data ) {
        // Stick our function data array into a functionlist variable in the global object
		//functionTimesData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent2 += '<tr>';
            tableContent2 += '<td>' + this.DateTime + '</td>';
            tableContent2 += '<td>' + this.ExecTime + '</td>';
            tableContent2 += '</tr>';
        });;
        // Inject the whole content string into our existing HTML table
        $('#functionTimes table tbody').html(tableContent2);
    });
};
