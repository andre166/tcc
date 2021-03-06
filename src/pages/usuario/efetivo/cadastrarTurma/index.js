import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useHistory} from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';
import { listarTurmaPorSu, cadastrarTurma } from '../../../../components/services/turmaService';
import { listarSubunidades } from '../../../../components/services/subunidadeService';
import { getUserSu } from '../../../../components/services/localStorgeService';
import DatePickerCustom from './datePickerCustom';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from './turmaStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import LoadingPage from  '../../../../components/loading';
//redux
import { connect } from 'react-redux';
import { 
    renderNavbar, renderLeftDrawner
} from '../../../../components/actions/navbarActions';
import verifyUserAuth from '../../../../utils/verificarUsuarioAuth';

import { bindActionCreators } from 'redux';
  
function CadastrarTurma( props ){
  
  props.renderNavbar(false);

  async function isAutenticated(){

    let autenticated = await verifyUserAuth();
    if( !autenticated ){
      history.push('/')
    }

  } 

  isAutenticated();
    
  const classes = useStyles();
  const history = useHistory();

  let [loading, setLoading] = useState(false);
  const [date, changeDate] = useState(new Date());
  let [error, setError] = useState(false);

  const theme = useTheme();
  const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
  }, []);


  async function onSubmit( e ){

    e.preventDefault();
    setError(false);
    
    let idSu = getUserSu();

    let cadastrar = true;

    let turmas = await listarTurmaPorSu(idSu);
    
    let ano = new Date(date).getFullYear().toString();

    turmas.map( t => {
      if(t.turma == ano){
        setError(true)
        cadastrar = false
      }
    });

    if(cadastrar){

      let su = await listarSubunidades(idSu);

      let turmaFinal = {
          turma: ano,
          subunidade: su
      }

      let info = {
        severityType: 'success',
        type: 'Turma', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      await cadastrarTurma(turmaFinal);

      history.push('/Efetivo');
    }


      
    }
    
    if(loading){ return <LoadingPage/>}

    return(
        <Grid className={classes.containerGeral} container direction="column" alignItems="center" justify="center">
        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '100%', heigth: '100%'}}>

        <Paper className={classes.paperCadastrarOm} elevation={3}>

        <Grid container direction="row" alignItems="center" justify="center">

          <Grid item xs>
              <Grid container alignItems="center" justify="center" direction="column">
                  <h2> Cadastrar Efetivo</h2>
                  <strong style={{marginBottom: 10}}>Selecione um ano para gerar um ano válido para que possa alocar militares ao mesmo.</strong>
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

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )( CadastrarTurma )
  
  

