import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';
import { listarTurma, excluirTurma } from '../../../../components/services/turmaService';
import { useStyles } from './excluirTurmaStyle';
import GenerateAlert from '../../../../components/errorAlert';
import { Formik, Form, ErrorMessage } from 'formik';
import Container from '@material-ui/core/Container';
import LoadingPage from  '../../../../components/loading'
import editarTurmaSchema  from  '../../../../utils/schemas/editarTurmaSchema'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ExcluirTurma( props ){
  
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));
  const [date, setDate] = useState(new Date());
  let [error, setError] = useState(false);

  let [loading, setLoading] = useState(true);
  let [listaTurma, setListaTurma] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  useEffect(() => {

    const loadPage = async() => {

      let response = await listarTurma();
  
      response.sort(function(a, b) {
        return b.turma - a.turma;
      });

      setListaTurma(response);
      setLoading(false);

    }

    loadPage();

  }, []);

  useEffect(() => {

    let existeTurma = false;

    let ano = new Date(date).getFullYear().toString();

    listaTurma.map( t => {
      if(t.turma == ano){
        existeTurma = true;
        setError(true);
      }
    });

    if( !existeTurma ){
      setError(false);

    }

  }, [ date ]);

  async function onSubmit( values ){  
    return;
  }

  const excluir = async ( turma ) => {

    let id = turma.id;

    await excluirTurma( id );

    let info = {
      severityType: 'error',
      type: 'Turma', 
    }

    localStorage.setItem("snackBarAlert", JSON.stringify(info));
    history.push('/Efetivo');

  }
              
  if(loading){ return <LoadingPage/>}

    return(
      <Container component="main" maxWidth="xs" style={{padding: 5}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '100%', heigth: '100%'}}>

      <Paper className={classes.paper}>

        <Grid container direction="row" justify="space-between" alignItems="center">

              <Link to={'/Efetivo'}  style={{textDecoration: 'none'}}>
                  <Button
                      size="small"
                      style={{marginTop: '-38px',marginLeft: '-16px', position: 'absolute'}}
                      variant="outlined"
                      color="primary"
                      startIcon={<KeyboardReturnIcon />}
                  >
                      {!xsDownMedia && 'Voltar'}
                  </Button>
              </Link>

              <Grid item xs>
                  <Grid container alignItems="center" justify="center">
                    <h2>Excluir Efetivo</h2>
                  </Grid>
              </Grid>

            </Grid>

          {error && <Alert style={{marginBottom: 10}} severity="error">Efetivo referente ao ano de <strong>{new Date(date).getFullYear().toString()}</strong> já existe!</Alert>}

          <Formik
            validationSchema={editarTurmaSchema}
            onSubmit={onSubmit}
            initialValues={{
              turma: '',
            }}
          render={( { values, handleChange, handleSubmit, errors, touched }) => (

          <Form className={classes.form} autoComplete="off">
            <Grid container spacing={2}>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Selecione a turma"
                  name="turma"
                  value={values.turma}
                  onChange={handleChange}
                  select
                >

                  {listaTurma.map( (t, i) => (

                    <MenuItem key={i} value={ t } className="option">
                        {t.turma}
                    </MenuItem>

                  ))}

                </TextField>

                <ErrorMessage name="subunidade">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>

            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container direction="row" justify="center" alignItems="center">

                <Button
                  disabled={ values.turma === '' ? true : false}
                  fullWidth
                  style={{margin: '15px 0px'}}
                  variant="contained"
                  color="primary"
                  className={classes.buttonDanger}
                  onClick={ handleClickOpen }
                >
                  excluir
                </Button>

              </Grid>

            </Grid>

            {values.turma && 
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{overflow: 'hidden'}}
              >
                <>

                <DialogTitle id="alert-dialog-title"> Deseja excluir o efetivo de <strong>{values.turma.turma}</strong> e todos os militares vinculados ao mesmo? </DialogTitle>
                  
                  <Divider style={{marginBottom: 10}}/>
                
                  <DialogActions style={{justifyContent: 'center', marginBottom: 5}}>
                    <Button className={classes.buttonSuccess} color="primary" variant="contained" onClick={() => excluir( values.turma )}>
                      Sim
                    </Button>
                    <Button className={classes.buttonDanger} onClick={handleClose} color="primary" variant="contained" autoFocus>
                      não
                    </Button>
                  </DialogActions>
                  
                </>
              </Dialog>
            }

          </Form>
          )}
        />
      </Paper>
      </MuiPickersUtilsProvider>


    </Container>
    );
    
}

  
  

