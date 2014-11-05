// DOM Ready =============================================================
$(document).ready(function() {
    // Sæki einkvæman lista af föllum í combo 
    populateCombo();

    document.onkeypress = keyPress;

    // Ef notandi ýtir á enter þá eru sótt gögn
    function keyPress(e){
        var x = e || window.event;
        var key = (x.keyCode || x.which);
        if(key == 13 || key == 3){
            showFunctionTimes(); 
        }
    };
});

// Functions =============================================================

function showChart(){
    window.open('/chart/'+$('#combo').val()+'/'+$('#combo option:selected').text(), '_blank');
}

// Þurka út villuskilaboð
function OnChangeCheckbox () {
	if (document.getElementById("error").innerHTML != "") {
		document.getElementById("error").innerHTML = "";
	}
}
// Er dagsetning lögleg
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

// Sæki gögn í combo 
function populateCombo() {
    var combo = document.getElementById("combo");
    
    $.getJSON( '/functions/functionlist', function( data ) {

        // Fyrir hverja færslu í JSON, bætum við í combo 
        $.each(data, function(){
            var option = document.createElement("option");
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

// Sækir gögn yfir keyrslutíma aðgerðar
function showFunctionTimes() {
    var tableContent = '';
    var tableSum = '';
    var execTimes = [];
    var counter = 1;
    var query = "";

    document.getElementById("error").innerHTML = "";
    var key = document.getElementById("combo").value; 

    // Smíða query eftir því hvort á að nota dagsetningar eða ekki 
    if(document.getElementById("dates").checked === true){
        var date1=document.getElementById("from").value;
        var date2=document.getElementById("to").value;

        //Eru dagsetningar löglegar
        if(!isValidDate(date1) || !isValidDate(date2)){
            document.getElementById("error").innerHTML = "Search by dates is selected and date value is not correct!";
            return;
        }
        query = key + '/' + date1 + '/' + date2 + ' 23:59:59';
    }
    else
    {
        query = key;
    } 
        
    $.getJSON( '/functions/times/' + query, function( data ) {
        // Fyrir hverja færslu í JSON búum til HTML töflu
        $.each(data, function(){
            if (counter % 2) {
                tableContent += '<tr>';}
            else {
                tableContent += '<tr class="alt">';}
            tableContent += '<td>' + counter + '</td>';
            tableContent += '<td>' + this.DateTime.slice(0, 10) +  "  " + this.DateTime.slice(12, 19) + '</td>';
            tableContent += '<td>' + this.ExecTime.toFixed(4) + '</td>';
            tableContent += '</tr>';
            execTimes.push(this.ExecTime);
            counter += 1;
        });

        tableSum += '<tr>';
        tableSum += '<td>' + getAverageTime(execTimes).toFixed(4) + '</td>';
        tableSum += '<td>' + getMaxTime(execTimes).toFixed(4) + '</td>';
        tableSum += '<td>' + getMinTime(execTimes).toFixed(4) + '</td>';
        tableSum += '</tr>';

        // Skilum gögnum í viðmótið
        $('#functionTimes table tbody').html(tableContent);
        $('#functionSummary table tbody').html(tableSum);
    });    
};
