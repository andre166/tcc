import React, { Component } from 'react';
import { styles } from './relatorioStyles';
// ======== Material table ========= //
import MaterialTable, { MTableBody } from 'material-table';
import tableIcons from './tableIcons';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import PieChartDialog from '../pieGraph/pieChartDialog';
// ======== REDUX ========= //
import { connect } from 'react-redux';

import { 
    showTable, 
    generateError, 
    generateRelatorioKeyNames, 
    generateRelatorioFiltro 
} from '../../actions/relatorioTableActions';

import { setFilteredData, filterListFromTable } from '../../actions/pieGraphActions';
import { bindActionCreators } from 'redux';

class BasicFiltering extends Component{

    constructor( props ){
        
        super( props );

        this.state = { renderBtn: true }
        
        this.tableRef = React.createRef();
    }

    generateDate = ( props = this.props ) => {

        let relaKey = [];

        if( !props.relatorio ){

            this.props.generateError(true);
            return;

        }
        
        if( props.customColumns ){

            props.customColumns.map( coluna => {


                let formatKey = coluna.title.trim().replace(/_/g, ' ')
                formatKey = formatKey.substring( 0, 1 ).toUpperCase() + formatKey.substring( 1 );

                let graphKey = { keyOriginalForGraph: coluna.title };

                coluna.title = formatKey;

                relaKey.push( Object.assign( coluna, graphKey ) );

            });

            this.renderRelatorio( relaKey, props.relatorio);
            
        }else if( !props.customColumns ){ // cria um array com as keys do obj relatório, 

            Object.keys( props.relatorio[0] ).forEach(key => {

                let formatKey = key.trim().replace(/_/g, ' ')
                formatKey = formatKey.substring( 0, 1 ).toUpperCase() + formatKey.substring( 1 )
        
                if( key !== 'tableData'){
                    relaKey.push({ 
                        title: formatKey, 
                        field: key, 
                        type: typeof props.relatorio[0][key],
                        keyOriginalForGraph: key,
                        
                    })
                }
        
            });

            this.renderRelatorio( relaKey, props.relatorio);

        }

    }

    renderRelatorio( relaKey, relatorio){

        this.props.generateError( false );
        this.props.showTable( true );
        this.props.generateRelatorioKeyNames( relaKey );
        this.props.generateRelatorioFiltro( relatorio );

    }

    componentDidMount(){

        this.generateDate( this.props );

    }

    generateInputReforGraph(){

        const relatorioKey = this.props.relatorioKeyNames
        let inputList = []

        if(this.tableRef.current){

            if( this.tableRef.current.dataManager.filteredData.length == 0 && this.state.renderBtn){

                this.setState({renderBtn: false})

            }else if( this.tableRef.current.dataManager.filteredData.length > 0 && !this.state.renderBtn ){
                this.setState({renderBtn: true})

            }


            var inputRef = this.tableRef.current.dataManager.columns;
       
            for (let indice = 0; indice < inputRef.length; indice++) {

                if( inputRef[indice].tableData.filterValue !== undefined && inputRef[indice].tableData.filterValue !== ''){

                    let columnName = relatorioKey[indice].title;
                    let columnValor = inputRef[indice].tableData.filterValue;

                    if( Array.isArray( columnValor ) ){
                        
                        columnValor = columnValor.map( column => {

                            if( column == ''){
                                return 'Indefinido'
                            }else{
                                return column;
                            }

                        })

                        columnValor = columnValor.join(',');

                    }

                    if( columnValor.length !== 0){

                        inputList.push( {coluna: columnName , valor: columnValor } )  
                    }
                }
                
                this.props.filterListFromTable(inputList);

            }
        }
    
    }

    render(){

        const { classes, ...other } = this.props;

        return (
            <div style={{height: '800px', maxWidth: '90vw'}}>

                { this.props.showError === false ? '' : 
                    <span className={classes.warning}>
                        <WarningIcon className={classes.iconVariant}/>
                        Erro - relatorio vazio, Entre em contato com o administrador do sistema.
                    </span>
                
                }
                
                {this.props.isVisibleTable === true && this.props.showError === false? 
                    <MaterialTable  tableRef={ this.tableRef }
                    
                        icons={tableIcons}
                        title={
                            <PieChartDialog 
                                relatorioKeyNames={this.props.relatorioKeyNames}
                                relatorioFiltro={this.props.relatorioFiltro}  
                                renderBtn={this.state.renderBtn}
                                customColumns={this.props.customColumns}
                            /> 
                        }
                        columns={this.props.relatorioKeyNames}
                        data={this.props.relatorioFiltro}    
                        options={{
                            filtering: true,
                            paging: true,
                            draggable: false,
                            toolbar: true,
                            columnsButton: true,
                            headerStyle: {
                                textAlign: 'center',
                                position: 'sticky', top: 0
                            },
                            maxBodyWidth: '90vh',
                        }}
                        components={{
                            Body: (props) => {

                                if( this.tableRef.current !== null){
                                    this.props.setFilteredData( this.tableRef.current.dataManager.filteredData )
                                }                 
                               
                                const myRenderData = props.renderData;  

                                this.generateInputReforGraph();
                                
                                return (
                                    <>
                                        <MTableBody {...props} renderData={myRenderData} />
                                    </>
                                )
                            },

                        }}
                    
                    />
                
                : '' }

            </div>

        )
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({ 
    generateError, showTable, generateRelatorioKeyNames, generateRelatorioFiltro,
    setFilteredData, filterListFromTable
}, dispatch)

const mapStateToProps =  state => state.relatorioTable;


export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(BasicFiltering))
