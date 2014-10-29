// Functionlist data array for filling in selection box
var functionListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the functionList combo on initial page load
    populateCombo();
});

// Functions =============================================================

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
            option.text = /[^-]*$/.exec(this.Key)[0];
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
    var date1=document.getElementById("from").value;
    var date2=document.getElementById("to").value;

    if(document.getElementById("dates").checked){
        // jQuery AJAX call for JSON
        if (date1 == "" || date2 == ""){
            alert("Það verður að velja dagsetningar");
            $('#functionTimes table tbody').html(tableContent);
            return;
        };

        $.getJSON( '/functions/times/' + key + '/' + date1 + '/' + date2, function( data ) {
            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.DateTime.slice(0, 10) +  "  " + this.DateTime.slice(12, 19) + '</td>';
                tableContent += '<td>' + this.ExecTime.toFixed(4) + '</td>';
                tableContent += '</tr>';
            });;
            // Inject the whole content string into our existing HTML table
            $('#functionTimes table tbody').html(tableContent);
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
            });;
            // Inject the whole content string into our existing HTML table
            $('#functionTimes table tbody').html(tableContent);
        });
    }
};
