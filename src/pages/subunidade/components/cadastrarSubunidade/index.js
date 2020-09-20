import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import cadastroSu from '../../../../utils/schemas/cadastroSu';
import { Button, Paper } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import GenerateAlert from '../../../../components/errorAlert';
import { cadastrarSubunidade } from '../../../../components/services/subunidadeService';
import { listarOm } from '../../../../components/services/omServices';
import { useParams, useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
        display: 'flex',
        flexDirection: 'column',
    },
    paperCadastrarOm: {
      width: '100%',
      maxWidth: 500,
      padding: 15
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      height: 35,
      margin: '15px 0px 10px 0px',
      '&:hover': {
        background: "#4a5442",
     }
    },
    inputTxt:{
      marginTop: 8
  },
  containerGeral:{
    marginTop: 63,
    padding: 5,
    [theme.breakpoints.down('xs')]: {
        marginTop: 55,
    },
  },
  }));

export default function FormCadastro(){
     
    const classes = useStyles();
    const history = useHistory();
    let idParams = useParams();
    const theme = useTheme();
    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    let [om, setOm] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {

      const getOm = async ( ) => {

        let id = idParams.id;

        let response = await listarOm( id );
      
        setOm(response);
        setLoading(false);

      };

      getOm();

    }, []);


    async function onSubmit( values, action ){

      let omObj = { 
          om: om,
      }

      
      Object.assign(values, omObj)
      
      console.log("aaa",values)
      await cadastrarSubunidade(values);

      let info = {
        severityType: 'success',
        type: 'om', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      history.push(`/Subunidade/${idParams.id}`);
      
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

        <Paper className={classes.paperCadastrarOm} elevation={3}>

            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item sm={1}>
                    <Link to={`/Subunidade/${idParams.id}`}  style={{textDecoration: 'none'}}>
                        <Button
                            size="small"
                            style={{marginTop: '-40px',marginLeft: '-8px', position: "absolute"}}
                            variant="outlined"
                            color="primary"
                            startIcon={<KeyboardReturnIcon />}
                        >
                          { !xsDownMedia && 'Voltar'}
                        </Button>
                    </Link>
                </Grid>

                <Grid item xs>
                    <Grid container alignItems="center" justify="center">
                        <h2> Cadastrar Subunidade</h2>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{marginBottom: 10}}/>

          <Formik
            validationSchema={cadastroSu}
            onSubmit={onSubmit}
            initialValues={{
              nomeSubunidade: '',
              nomeCompleto: '',
          }}
            render={( { values, handleChange, handleSubmit, errors }) => (

              <Form className={classes.root} noValidate autoComplete="off">

                      <TextField 
                        required 
                        label="Nome Completo" 
                        name="nomeCompleto"
                        value={values.nomeCompleto}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="nomeCompleto">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>
                      
                      <TextField  
                        className={classes.inputTxt}
                        required
                        label="Nome abreviado" 
                        name="nomeSubunidade"
                        value={values.nomeSubunidade}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="nomeSubunidade">{(msg) => verificarErro(msg) }</ErrorMessage>

                  <Button type="submit" variant="contained" color="primary" className={classes.buttonSuccess}>
                    Cadastrar
                  </Button>
              </Form>
          )}
        />
      </Paper>
            
        </Grid>
    );
    
}