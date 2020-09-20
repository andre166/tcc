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
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { withStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { listarTurma, cadastrarTurma } from '../../../components/services/turmaService';
import { listarSubunidades } from '../../../components/services/subunidadeService';
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
import { Formik, Field, Form, ErrorMessage } from 'formik';
import GenerateAlert from '../../../components/errorAlert';
import DatePickerCustom from './datePickerCustom';
import Alert from '@material-ui/lab/Alert';

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
    root: {
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        
    },
    containerGeral:{
        marginTop: 80
    },
    paperCadastrarOm: {
        width: '100%',
        maxWidth: 500,
        padding: 15
      },

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
    datePicker: {
        // border: '1px solid red',
        position: 'relative',
        width: '100%',
        maxWidth: 320,
    },
    buttonSuccess: {
        backgroundColor: '#1d3724',
        height: 35,
        margin: '15px 0px 10px 0px',
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
    },
    inputTxt:{
        marginTop: 8
    },
  }));

  
  export default function CadastrarTurma( props ){
    
    const classes = useStyles();

    let [loading, setLoading] = useState(false);
    const [date, changeDate] = useState(new Date());

    let [error, setError] = useState(false);



    useEffect(() => {
    }, []);

    const history = useHistory();

    async function onSubmit( e ){

        e.preventDefault();
        setError(false);

        let cadastrar = true;

        let turmas = await listarTurma();
        
        let ano = new Date(date).getFullYear().toString();

        turmas.map( t => {
            if(t.turma == ano){
                setError(true)
                cadastrar = false
            }
        });

        if(cadastrar){
            let su = await listarSubunidades(188);
            
            
            let turmaFinal = {
                turma: ano,
                subunidade: su
            }

            await cadastrarTurma(turmaFinal);
        }


      
    }

    const verificarErro = ( msg ) => {

      let tipo = 'warning';

      if( msg == 'Não é um CNPJ válido.' || msg == 'Não é um CEP válido.' ){
        tipo = 'error'
      }

      return(
          <GenerateAlert alertConfig={ {msg: msg, tipo: tipo} } />
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
        <Grid className={classes.containerGeral} container direction="column" alignItems="center" justify="center">
        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '100%', heigth: '100%'}}>

        <Paper className={classes.paperCadastrarOm} elevation={3}>

        <Grid container direction="row" alignItems="center" justify="center">
            <Grid item sm={1}>
                <Link to={'/Efetivo'}  style={{textDecoration: 'none'}}>
                    <Button
                        style={{marginTop: '-70px'}}
                        variant="outlined"
                        color="primary"
                        startIcon={<KeyboardReturnIcon />}
                    >
                        Voltar
                    </Button>
                </Link>
            </Grid>

            <Grid item xs>
                <Grid container alignItems="center" justify="center">
                    <h2> Cadastrar Efetivo</h2>
                    {/* <Alert style={{marginBottom: 10}} icon={false} severity="warning"> */}
                        <strong style={{marginBottom: 10}}>Gera um efetivo vazio referente ao ano selecionado.</strong>
                    {/* </Alert> */}
                </Grid>
            </Grid>
        </Grid>
        <Divider style={{marginBottom: 10}}/>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
        {error && <Alert style={{marginBottom: 10}} severity="error">Efetivo referente ao ano de <strong>{new Date(date).getFullYear().toString()}</strong> já existe!</Alert>}

            <div className={classes.datePicker}>
                <DatePickerCustom date={date} changeDate={changeDate}/>
            <Divider style={{margin: '10px 0x'}}/>
            </div>

            <Button type="submit" variant="contained" color="primary" className={classes.buttonSuccess}>
                Cadastrar
            </Button>
        </form>

  </Paper>
  </MuiPickersUtilsProvider>
  </Grid>
    );
    
}

  
  

