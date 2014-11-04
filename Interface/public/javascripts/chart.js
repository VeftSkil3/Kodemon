var chart; 

$(document).ready(function() {

    var chartContainer = document.getElementById("container");

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

function getNewChartData() {
    var counter = 1;
    var mf = moment().subtract(1, 'day');
    var dateFrom = mf.startOf('day'); 
    var dateTo = moment(); 

    var query = key + '/' + dateFrom.format("YYYY-MM-DD hh:mm:ss") + '/' + dateTo.format("YYYY-MM-DD hh:mm:ss");

    setInterval(function () {
        $.getJSON( '/functions/times/' + query, function( data ) {

            var dtmp = [];
            $.each(data, function(){
                var xasis = new Date(this.DateTime).getTime();
                var yasis = this.ExecTime;
                var tmp = [eval(xasis), eval(yasis)];
                dtmp.push(tmp); 
            });

            if (dtmp.length !== 0 ){
                var series = chart.series[0];
                var shift = series.data.length > 10; // shift if the series is 
                                                     // longer than 10
                for(var i = 0; i<dtmp.length; i++){
                    series.addPoint(dtmp[i], true, shift);
                }
            }
            
            dateFrom = moment(dateTo._d);
            dateTo = moment(); 

            query = key + '/' + dateFrom.format("YYYY-MM-DD hh:mm:ss") + '/' + dateTo.format("YYYY-MM-DD hh:mm:ss");
        });
    }, 5000);
}

