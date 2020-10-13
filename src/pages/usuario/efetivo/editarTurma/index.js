import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
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
import { listarCidadaoPorTurma } from '../../../../components/services/cidadaoService';
import ShowRelatorio from '@lestetelecom/showrelatorio';
import { colunaCidadao } from '../../../../utils/columns/colunaCidadao';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { withStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { listarTurma, editarTurma } from '../../../../components/services/turmaService';
import { getUserSu } from '../../../../components/services/localStorgeService';
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
import { useStyles } from './editarTurmaStyle';
import GenerateAlert from '../../../../components/errorAlert';
import { Formik, Form, ErrorMessage } from 'formik';
import Container from '@material-ui/core/Container';
import LoadingPage from  '../../../../components/loading'
import editarTurmaSchema  from  '../../../../utils/schemas/editarTurmaSchema'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Alert from '@material-ui/lab/Alert';

export default function EditarTurma( props ){
  
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));
  const [date, setDate] = useState(new Date());
  let [error, setError] = useState(false);

  let [loading, setLoading] = useState(true);
  let [listaTurma, setListaTurma] = useState([]);

  useEffect(() => {

    const loadPage = async() => {

      let response = await listarTurma();
  
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
    
    let cadastrar = true;

    let ano = new Date(date).getFullYear().toString();

    let response = await listarTurma();

    response.map( t => {
      if(t.turma == ano){
        cadastrar = false;
      }
    });


    if( cadastrar ){

      values.turma.turma = ano;
      let userSu = getUserSu();

      let turmaComSu = {
        turma: values.turma,
        su: userSu,
      }

      let info = {
        severityType: 'info',
        type: 'Turma', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      await editarTurma( turmaComSu );

      history.push('/Efetivo')

    }else{
      setError(true);

    }

  }
              
  if(loading){ return <LoadingPage/>}

    return(
      <Container component="main" maxWidth="xs" style={{padding: 5}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '100%', heigth: '100%'}}>

      <Paper className={classes.paper}>

        <Grid container direction="row" justify="space-between" alignItems="center">

              <Link to={'/GerenciarUsuario'}  style={{textDecoration: 'none'}}>
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
                    <h2>Editar Turma</h2>
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

              <Grid item xs={12}>

                {values.turma && 
                  <DatePicker
                    fullWidth
                    style={{textAlign: 'center'}}
                    views={["year"]}
                    label="Nova turma"
                    value={date}
                    onChange={setDate}
                  />
                }

                <ErrorMessage name="nome">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>

            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Button
                  style={{margin: '20px 0px 15px 0px'}}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttonSuccess}
                >
                  Editar
                </Button>

                <div style={{width: 15}}></div>

                <Button
                  style={{margin: '20px 0px 15px 0px'}}
                  variant="contained"
                  color="primary"
                  className={classes.buttonDanger}
                >
                  excluir
                </Button>

              </Grid>

            </Grid>

          </Form>
          )}
        />
      </Paper>
      </MuiPickersUtilsProvider>
    </Container>
    );
    
}

  
  

