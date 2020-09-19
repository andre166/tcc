import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import PieChartIcon from '@material-ui/icons/PieChart';
import Typography from '@material-ui/core/Typography';
import PieChart from "./pieChart";
import Divider from '@material-ui/core/Divider';
import FilterList from '@material-ui/icons/FilterList';
// ======== REDUX ======== //
import { connect } from 'react-redux';
import { setGraphType, isVisiblePieChart } from '../../actions/pieGraphActions';
import { bindActionCreators } from 'redux';
import styles from './dialogStyle';

class pieChartDialog extends React.Component {

  state = {
    showChart: false,
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  changeGraph = async ( value ) => {

    await this.props.isVisiblePieChart( false );

    this.props.setGraphType( value );

    this.props.isVisiblePieChart(true);

  };

  componentDidMount(){
        
    this.props.setGraphType( this.props.relatorioTable.relatorioKeyNames[0].keyOriginalForGraph );

    this.props.isVisiblePieChart( true )

  }

  renderColumnList( relatorioKey, style ){

    if( relatorioKey.renderGraph && this.props.customColumns){
      return(
          <ListItem button onClick={() => this.changeGraph( relatorioKey.keyOriginalForGraph )} >
            
            <ListItemText 
              
              primary={<Typography type="body2" className={ style }>{relatorioKey.title}</Typography>}
            />
  
          </ListItem>
      )

    }else if( this.props.customColumns == undefined){

      return(
        <ListItem button onClick={() => this.changeGraph( relatorioKey.keyOriginalForGraph )} >
            
        <ListItemText 
          
          primary={<Typography type="body2" className={ style }>{relatorioKey.title}</Typography>}
        />

      </ListItem>
      )

    }


  }

  render() {

    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} maxWidth={'lg'} fullWidth={true}>
        <div className={classes.divModal}>

          <div className={classes.root}> {/* renderiza a sidenav da esquerda do dialog  */}
            <List>
              {this.props.relatorioTable.relatorioKeyNames.map( relatorioKey => (

                this.renderColumnList( relatorioKey, classes.listSection)

              ))}
            </List>

          </div>

          <div className={classes.grafico} >
            {this.props.open === false || this.props.pieGraph.graphType == '' || this.props.pieGraph.showChart === false ? '' : 
                <PieChart />
            }
          </div>
          
          {/* renderiza a sidenav da DIREITA do dialog  CASO haja algum filtro*/}
          {this.props.pieGraph.filterListFromTable == '' ? '' : 

            <div style={{
              width: 'max-content',
              minWidth: 150,
              backgroundColor: '#eeeeee',
              position: 'relative',
              overflowX: 'hidden',
              height: '100%',
              
            }}>

              <List>

                <ListItem style={{textAlign: 'center'}}>

                  <ListItemText 
                    primary={
                      <Typography type="body1" style={{
                        letterSpacing: '1.5px',
                        color: '#222831',
                        fontWeight: 'bold',
                      }}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                          Lista de Filtros
                          <FilterList/>
                        </div>
                      </Typography>
                    }
                  />

                </ListItem>

                <Divider />

                {this.props.pieGraph.filterListFromTable.map( filter => (
                  
                  <ListItem>
                    <ListItemText 
                      primary={<Typography type="body1" style={{color: '#323232'}}>{ filter.coluna  + ':'}</Typography>}
                      secondary={ filter.valor }
                    />

                  </ListItem>

                ))}

              </List>
            </div>
          }
        </div>

      </Dialog>
    );
  }
}

pieChartDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const PieChartDialogWrapped = withStyles(styles)(pieChartDialog);

class pieChartDialogDemo extends React.Component {
  state = {
    open: false,
    msgError: false,
  };

  handleClickOpen = (e) => {

    if(this.props.renderBtn === false ){

      this.setState({
        msgError: true,
      });

      return;
    }

    this.setState({
      msgError: false,
    });

    let firstItemColumn = this.props.relatorioTable.relatorioKeyNames.filter( e=> e.renderGraph )[0];

    if( firstItemColumn == undefined ){

      firstItemColumn = this.props.relatorioTable.relatorioKeyNames[0]

    }

    this.props.setGraphType( firstItemColumn.keyOriginalForGraph );


    this.setState({
      open: true,
    });

  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={(e) => this.handleClickOpen(e)}>
            Gráfico
            <PieChartIcon style={{marginLeft: '3px'}}/>
        </Button>

        {this.state.msgError === false ? '' :
        
          <div className={classes.errorDiv}>Relatório em branco</div>
      
        }

          <PieChartDialogWrapped
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
            {...this.props}
          />

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setGraphType, isVisiblePieChart }, dispatch);

const mapStateToProps =  state => state ;

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(pieChartDialogDemo));


