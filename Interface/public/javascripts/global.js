// Functionlist data array for filling in selection box
var functionListData = [];


// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the functionList table on initial page load
    //populateTable();
    
    populateCombo();
    
    // function link click
    $('#functionList table tbody').on('click', 'td a.linkshowtimes', showFunctionTimes);


});


// Functions =============================================================

//Check for valid dates
function isValidDate(s) {
  var bits = s.split('-');
  var d = new Date(bits[0], bits[1] - 1, bits[2]);
  return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[2]);
}

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

// Fill combo with data
function populateCombo() {
    // Empty content string
    var comboContent = '';
    var select = document.getElementById("thekeys");
    // jQuery AJAX call for JSON
    $.getJSON( '/functions/functionlist', function( data ) {
		// Stick our function data array into a functionlist variable in the global object
		functionListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
			var option = document.createElement('option');
			option.text = /[^/]*$/.exec(this.Key)[0];
			option.value=this.Id;
			select.add(option, 0);
        });;
    });
};


function showFunctionTimes(key) {
    //event.preventDefault();
	// Empty content string
	document.getElementById("error").innerHTML="";
    var tableContent = '';
    if(document.getElementById("dates").checked){
		var date1=document.getElementById("from").value;
		var date2=document.getElementById("to").value;
		//Check for valid dates
		if(!isValidDate(date1) || !isValidDate(date2)){
			document.getElementById("error").innerHTML="Limit by dates is selected and date value is not correct!";
			return;
		}
        // jQuery AJAX call for JSON
        $.getJSON( '/functions/times/' + key + '/' + date1 + '/' + date2, function( data ) {
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
        $.getJSON( '/functions/times/' + key, function( data ) {
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
