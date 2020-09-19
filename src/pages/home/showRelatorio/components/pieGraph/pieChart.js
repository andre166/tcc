import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { withStyles } from '@material-ui/core/styles';
// ======== REDUX
import { connect } from 'react-redux';
import { setOptions } from '../../actions/pieGraphActions';
import { bindActionCreators } from 'redux';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });

class RenderPizzaChart extends Component {

    constructor( props ){
        
        super( props );

        this.pieRef = React.createRef();

    }

    filterParam = ( lista, objRelatorio ) => {

        var  objeto = objRelatorio;
        var especialChar = '';
        
        if( objeto == '' || objeto == null || objeto.lenght == 0 ||  objeto === undefined){

            objeto = 'indefinido'

        }
        
        if( typeof objeto === 'string'){
            
            especialChar = objeto.trim().toLowerCase()
            especialChar = especialChar.replace(/[áàãâä]/g, 'a')
            .replace(/[éèêë]/g, 'e')
            .replace(/[íìîï]/g, 'i')
            .replace(/[óòõôö]/g, 'o')
            .replace(/[úùûü]/g, 'u')
            .replace(/[ç]/g, 'c')
        }else{
            especialChar =  objeto
        }

        let varItem = null;
        let index = null;

        lista.map((info, i) => { 
    
            if(info.objRelatorio == especialChar){

                index = i;
                varItem = info.objRelatorio;
        
            }
            
        })
        
        if (varItem == null){
            lista.push({objRelatorio:especialChar, quantidade: 1});
        }else{
           
            lista[index].quantidade++;
        }
    
    }

    componentDidMount( ){

        const gerarGraph = ( ) => {

            let list = [];
            let formatedList = [];
            
            const relatorioParaGerarGrafico = this.props.pieGraph.filteredData || this.props.relatorioTable.relatorioFiltro

            relatorioParaGerarGrafico.map( objRelatorio => {
    
                this.filterParam( list, objRelatorio[this.props.pieGraph.graphType], this.props.pieGraph.graphType )        
                
            });
    
            list.map((info) => ( 
                formatedList.push({ name:info.objRelatorio, y: info.quantidade }) 
            ))

            let formatKey = this.props.pieGraph.graphType.trim().replace(/_/g, ' ');
            formatKey = formatKey.substring( 0, 1 ).toUpperCase() + formatKey.substring( 1 );

            this.props.setOptions(

                {
                    title: {
                        text: formatKey
                    },
                    series: [{
                        data: formatedList
                    }]
                }
            )

        }

        gerarGraph( );

    }

    render(){

        const { classes } = this.props;

        return(
                
            <HighchartsReact highcharts={Highcharts} options={this.props.pieGraph.chartOptions} ref={this.pieRef}/>

        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setOptions }, dispatch)

const mapStateToProps =  state => state ;

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(RenderPizzaChart))