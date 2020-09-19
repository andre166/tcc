import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import { makeStyles, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams, useHistory} from 'react-router-dom';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { listarCidadaoPorTurma } from '../../components/services/cidadaoService';
import ShowRelatorio from '@lestetelecom/showrelatorio';
import { colunaCidadao } from '../../utils/customColumns';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { withStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { listarTurma } from '../../components/services/turmaService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HelpIcon from '@material-ui/icons/Help';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#222831",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px 8px 12px'
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    containerPrincipal: {
        width: '100%',
        height: 'calc(90vh - 80px) !important',
    },
    containerPrincipal2Paper: {
        marginTop: 65,
        width: '100%',
        minHeight: 'calc(100vh - 65px) !important',
    },
    datepickerPaper: {
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 15
    },
    btnLinkContainer:{
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSuccess: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       }
    },
    buttonDanger: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#ed3237',
        '&:hover': {
          background: "#7f3436",
       },
      },
    
      buttonInfo: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#0064a6',
        '&:hover': {
          background: "#195493",
       },
      },

    buttonSuccessSm: {
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       }
    },
    selecionarEfetivoContainer: {
        width: '100%',
        maxWidth: 420,
        marginTop: 20,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px 5px 10px'
    },
    nenhumEfetivoContainer: {
        marginTop: 30,
        width: '100%',
        maxWidth: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
  }));

  
  export default function Efetivo( props ){
    
    const classes = useStyles();

    const [selectedDate, handleDateChange] = useState(new Date());
    let [loading, setLoading] = useState(false);

    let [ showTable, setShowTable] = useState(false);

    let [listaTurma, setListaTurma] = useState([]);
    let [turma, setTurma] = useState('');

    let [ nenhumCadastroMsg, setNenhumCadastroMsg] = useState(false);


    useEffect(() => {
        loadPage();
    }, []);

    const loadPage = async ( data ) =>{

        // handleDateChange(new Date());
        // let response = await listarCidadaoPorTurma( '2012' );

        // handleDateChange(data);
        let response = await listarTurma( );

        
        
        if(response.length > 0){
            
            response.sort()
            setTurma(response[response.length - 1])
            setListaTurma(response);
            setNenhumCadastroMsg(false)

        }else{
            setNenhumCadastroMsg(true)
        }
        

    }

    function gerarActionsButtons(){

        if(colunaCidadao[0].title != 'Ações'){
          let btns = { 
            title: 'Ações',
            render: rowData => <ActionBtns rowData={rowData}/>
          }
   
          colunaCidadao.unshift(btns);
        }
 
 
       }
 
       const ActionBtns = ( {rowData} ) => {
       
            return (
                <div className="actionBtns" >
            
                    <Link to={{pathname: `/EditarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
                        <LightTooltip title="Editar" size="small">
                        <IconButton color="primary" aria-label="upload picture" component="span"> 
                            <EditIcon size="small" className={classes.buttonInfoIcon}/> 
                        </IconButton>
                        </LightTooltip>
                    </Link>
                
                    {/* <Modal om={ rowData } btnTable={true}/> */}
            
                    <Link to={{pathname: `/VerificarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
                        <LightTooltip title="Detalhar militar">
                            <IconButton size="small" aria-label="delete" ><FindInPageIcon/></IconButton>
                        </LightTooltip>
                    </Link>
        
                </div>
            )
       }

    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="lc">
            <h1>
              Carregando.
            </h1>
          </div>
        )
      }

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '100%', heigth: '100%'}}>
            <div className={classes.containerPrincipal}>
                    <Grid container direction="column" justify="center" alignItems="center">
                            <Paper  className={classes.containerPrincipal2Paper}>

                                { !showTable && listaTurma.length > 0 && <Grid container direction="column" justify="center" alignItems="center">
                                    <Paper className={classes.selecionarEfetivoContainer}>

                                        <h3 style={{marginBottom: -8}}>Efetivo: </h3>

                                        <FormControl className={classes.formControl}>
                                            <InputLabel style={{textAlign: 'center'}}>Ano</InputLabel>
                                            <Select
                                                value={turma}
                                                onChange={(e) => setTurma(e.target.value)} 
                                            >
                                            {listaTurma && listaTurma.map( t =>(
                                               
                                                <MenuItem value={t}>{t.turma}</MenuItem>
                                            ))}
                                           
                                            </Select>
                                        </FormControl>

                                        <Button 
                                            className={classes.buttonSuccessSm}  
                                            size="small" style={{marginBottom: -13}} 
                                            variant="contained" color="primary"
                                            onClick={() => setShowTable(true)}
                                        >
                                            Selecionar
                                        </Button>
                                    
                                    </Paper>

                                    <Paper className={classes.datepickerPaper}>
                                        <Link to={{pathname: `/cadastrarTurma`}} className={classes.btnLinkContainer} style={{textDecoration: 'none'}}>
                                            <Button variant="contained" color="primary" className={classes.buttonSuccess}>
                                                <div className={classes.helpContainer}>
                                                    <AddBoxIcon style={{marginRight: 5, marginTop: -2}}/>
                                                    <h4>Cadastrar Efetivo</h4> 
                                                </div>
                                            </Button>
                                        </Link>
                                    </Paper>

                                    <Paper className={classes.datepickerPaper}>
                                        <Link to={{pathname: `/EditarTurma`}} className={classes.btnLinkContainer} style={{textDecoration: 'none'}}>
                                            <Button variant="contained" color="primary" className={classes.buttonInfo}>
                                                <div className={classes.helpContainer}>
                                                    <EditIcon style={{marginRight: 7, marginTop: -2}}/>
                                                    <h4>Editar efetivo </h4> 
                                                </div>
                                            </Button>
                                        </Link>
                                    </Paper>

                                    <Paper className={classes.datepickerPaper}>
                                        <Link to={{pathname: `/ExcluirTurma`}} className={classes.btnLinkContainer} style={{textDecoration: 'none'}}>
                                            <Button variant="contained" color="primary" className={classes.buttonDanger}>
                                                <div className={classes.helpContainer}>
                                                    <RemoveCircleIcon style={{marginRight: 7, marginTop: -2}}/>
                                                    <h4>Excluir efetivo </h4> 
                                                </div>
                                            </Button>
                                        </Link>
                                    </Paper>

                                    <Paper className={classes.datepickerPaper}>
                                        <Button variant="outlined" color="primary">
                                            <div className={classes.helpContainer}>
                                                <HelpIcon style={{marginRight: 7, marginTop: -2}}/>
                                                <h4>Ajuda</h4> 
                                            </div>
                                        </Button>
                                    </Paper>

                                </Grid>}

                                {nenhumCadastroMsg == true && showTable && <Grid container direction="row" justify="center" alignItems="center" style={{heigth: 'calc(100% - 80px)'}}>
                                    <Paper className={classes.nenhumEfetivoContainer}>
                                        <div style={{padding: 15}}>
                                            <strong >Nenhum efetivo em {selectedDate && selectedDate.getFullYear()}</strong>
                                            <Button
                                                style={{marginLeft: 10}}
                                                onClick={() => window.location.reload()}
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<KeyboardReturnIcon />}
                                            >
                                                Voltar
                                            </Button>
                                        </div>
                                    </Paper> 
                                </Grid>}

                                {showTable && <Paper  style={{padding: 10, marginTop: 90}}>
                                <Grid item style={{maxWidth: 'calc(100vw - 260px)'}}>
                                    <ShowRelatorio TableDimension={ { tWidth: '100%', tHeight: 400 } } relatorio={turma.cidadao} customColumns={colunaCidadao}/>
                                </Grid>

                                </Paper>}
                            </Paper>

                    </Grid>
            </div>
        </MuiPickersUtilsProvider>
    );
    
}

  
  

