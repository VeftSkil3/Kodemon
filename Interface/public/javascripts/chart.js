//Skilgreini global chart object
var chart; 

$(document).ready(function() {
    // Dom element sem hýsir chart
    var chartContainer = document.getElementById("container");
    // Frumstilli chart
    var options = {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            renderTo: chartContainer,
            events: {
                load: getNewChartData
            }
        },
        title: {
            text: 'Function execution time - live'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Execution time'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Execution time',
            data: []
        }]
    };

    chart = new Highcharts.Chart(options);

});

function graf(data){
    var dtmp = [];
    $.each(data, function(){
        var xasis = new Date(this.DateTime).getTime();
        var yasis = this.ExecTime;
        var tmp = [eval(xasis), eval(yasis)];
        dtmp.push(tmp); 
    });

    if (dtmp.length !== 0 ){
        var series = chart.series[0];
        while(series.data.length > dtmp.length)//Henda út þar til fyrri lengd er jöfn núverandi lengd
        {
            series.data.pop();
        }
        //var shift = series.data.length >= dtmp.length; // ef series er stærri en 10 stök klippi af (serian sem er að koma inn)
        for(var i = 0; i<dtmp.length; i++){
            series.data.pop();
            series.addPoint(dtmp[i], true, false);
        }
    }
}

// Fall sem sækir ný gögn í chart á 5 sekúnda fresti 
function getNewChartData() {
    //var counter = 1;
    //var mf = moment().subtract(1, 'day');
    //var dateFrom = mf.startOf('day'); 
    var dateTo = new Date();
    var dateFrom = new Date();
    dateFrom.setHours(dateTo.getHours()-24);

    var query = key + '/' + dateFrom.toISOString() + '/' + dateTo.toISOString();
    
    $.getJSON( '/functions/times/' + query, function( data ) {
        graf(data);
    });

    setInterval(function () {
        //Hækka dags fyrir næsta kall
        var dateTo = new Date();
        var dateFrom = new Date();
        dateFrom.setHours(dateTo.getHours()-24);
        var query = key + '/' + dateFrom.toISOString() + '/' + dateTo.toISOString();
        $.getJSON( '/functions/times/' + query, function( data ) {

            graf(data);
        });
    }, 5000);
}

