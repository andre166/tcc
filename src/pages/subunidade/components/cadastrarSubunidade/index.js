import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import cadastroSu from '../../../../utils/schemas/cadastroSu';
import { Button, Paper } from '@material-ui/core';
import GenerateAlert from '../../../../components/errorAlert';
import { cadastrarSubunidade } from '../../../../components/services/subunidadeService';
import { listarOm } from '../../../../components/services/omServices';
import { useParams, useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './cadSuStyle';

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

    function generatBackBtn(){

      let response = JSON.parse(localStorage.getItem("userInfo"));

      let userPerfil = response.perfil;

      if( userPerfil == "ROLE_ADMIN"){
        return (
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
        )

      }else{

        return (
          <Link to={`/Subunidade`}  style={{textDecoration: 'none'}}>
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
        )

      }
    }

    async function onSubmit( values, action ){

      let omObj = { 
          om: om,
      }

      
      Object.assign(values, omObj)
      
      values.nomeCompleto = values.nomeCompleto.trim();
      values.nomeSubunidade = values.nomeSubunidade.trim();

      if( values.nomeCompleto == '' || values.nomeSubunidade == ''){
        return;
      }

      await cadastrarSubunidade(values);

      let info = {
        severityType: 'success',
        type: 'subunidade', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      let response = JSON.parse(localStorage.getItem("userInfo"));

      let userPerfil = response.perfil;

      if( userPerfil == 'ROLE_ADMIN'){
        history.push(`/Subunidade/${idParams.id}`);
      }else{
        history.push(`/Subunidade`);

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
        <Paper className={classes.paperCadastrarOm} elevation={3}>

          <Grid container direction="row" alignItems="center" justify="center">
              <Grid item sm={1}>
                  {generatBackBtn()}
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