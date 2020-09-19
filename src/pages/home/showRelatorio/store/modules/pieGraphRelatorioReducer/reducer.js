const INITIAL_STATE =  { 

    filterListFromTable: '',

    filteredData: '',

    graphType: '',

    showChart: false,

    chartOptions: {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',         
            width: 800,
        },
        title: {
            text: 'Chart'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            },
            
        },
        plotOptions: {
            pie: {
                size: '60%',
                allowPointSelect: true,
                cursor: 'pointer',

                dataLabels: {
                    enabled: true,
                    format: '<span style="font-weight: 200">{point.name}</span>: <span style="font-weight: 200; color: #0f4c75">{point.percentage:.1f} %<span>',
                    connectorColor: 'silver',  
                    overflow: 'allow'                         
                },
                
            }
        },
        series: [{
            data: [1],
            name: 'Quantidade',
            turboThreshold:10000
        }]
    }
    
}

export default function reserve( state = INITIAL_STATE , action ){
    
    switch( action.type ){
        
        case 'SET_OPTIONS':

            let dataFormatada = action.payLoad.series[0].data.map( e => {
                if( e.name == '' || e.name == null){
                    return {name: "Indefinido", y: e.y}
                }else{
                    return e;
                }

            })
            
        
            return { ...state,
                chartOptions:{
                    ...state.chartOptions,
                        plotOptions: {
                            ...state.chartOptions.plotOptions,

                            pie: {
                                ...state.chartOptions.plotOptions.pie,

                                dataLabels: {
                                    ...state.chartOptions.plotOptions.pie.dataLabels,
                                    enabled: true,
                                },
                                
                            }
                        },
                        title: {
                            text: action.payLoad.title.text
                        },
                        series: [{
                            data: dataFormatada,
                            name: action.payLoad.name || 'Quantidade',
                            turboThreshold: action.payLoad.turboThreshold || 10000
                        }]
                }
            }
        
        case 'SET_GRAPH_TYPE':

            return { ...state,
                graphType : action.payLoad
            }
        case 'SET_SHOW_CHART':

            return { ...state,
                showChart : action.payLoad
            }
        case 'SET_FILTERED_DATA':
        
            return { ...state,
                filteredData : action.payLoad
            }
        case 'SET_FILTERED_LIST_FROM_TABLE':
        
            return { ...state,
                filterListFromTable : action.payLoad
            }

        default:
            return state;
    }
  
  }
  
  
 