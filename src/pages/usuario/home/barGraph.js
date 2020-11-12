import React from 'react';
import ReactDom from 'react-dom';
import Highcharts, { Legend } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from "highcharts/modules/drilldown.js";

drilldown(Highcharts);

export default function PieGraph( props ) {

    const options = {
        series: [
            {
                data: [
                    {
                        name: 'Total', 
                        y: 10,
                        drilldown: true
                    },
                    {
                        name: 'Chrome', y:2,
                        drilldown: true
                    },
                    
                    {
                        name: 'Firefox', y:4
                    },
                    {
                        name: 'Firefox2', y:4
                    },
                    {
                        name: 'Firefox3', y:4
                    },
                    {
                        name: 'Firefox4', y:4
                    },
                    {
                        name: 'Firefox5', y:4
                    },
                    {
                        name: 'Firefox6', y:4
                    },
                    {
                        name: 'Firefox7', y:4
                    },
                    {
                        name: 'Firefox8', y:4
                    },
                    {
                        name: 'Firefox9', y:4
                    },
                    {
                        name: 'Firefox0', y:4
                    },
                    {
                        name: 'Firefox11', y:4
                    },
                    {
                        name: 'Firefox12', y:4
                    },
                    {
                        name: 'Firefox13', y:4
                    },

                ],
            },
            
        ],
        chart: {
            type: "column",
            events: {
              drilldown: function(e) {
                  if (!e.seriesOptions) {
                    console.log("Drilldown" + e.point.name);
                  var chart = this;
                  if (e.point.name === "Total") {
                    chart.addSingleSeriesAsDrilldown(e.point, {
                      name: "New",
                      color: "green",
                      data: [["Mary", 34], ["Peter", 22]]
                    });
                  }
                  chart.applyDrilldown();
                }
              }
            }
          },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            }
    
        },
        title: {
            text: 'Mapa da força'
        },
        subtitle: {
            text: 'Status de todo o efetivo'
        },
        tooltip: {
            formatter: function ( ) {
                return this.point.name + ':' + this.y;
            }
        },
        plotOptions: {
            series: {
                colorByPoint: true,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                },
            },
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
    }

    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            {...props}
        />

    )
}