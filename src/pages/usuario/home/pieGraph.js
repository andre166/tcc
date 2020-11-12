import React from 'react';
import ReactDom from 'react-dom';
import Highcharts, { Legend } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// The wrapper exports only a default component class that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props). All other
// interfaces like Options come from the Highcharts module itself.

export default function PieGraph( props ) {

    const options = {
        series: [
            {
                data: [
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    {
                        x: 'Chrome', y:58.9,
                    },
                    
                    {
                        x: 'Firefox', y:13.29
                    }
                ],

            },
        ],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',     
            height: 300
        },
        title: {
            enabled: false,
            style: {
                display: 'none'
            }
        },
        tooltip: {
            formatter: function ( ) {
                return this.point.x + ':' + this.y;
            }
        },
        legend: {
            enabled: true,
            labelFormatter: function () {
                return this.x + ': ' + this.y;
            },
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 10,
            navigation: {
                activeColor: '#3E576F',
                animation: true,
                arrowSize: 12,
                inactiveColor: '#CCC',
                style: {
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '12px'
                }
            }
        },
        plotOptions: {
            pie: {
                // size: '60%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,               
                },
                showInLegend: true,
               
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