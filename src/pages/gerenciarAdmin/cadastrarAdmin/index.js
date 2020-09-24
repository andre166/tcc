import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { listarOm } from '../../../components/services/omServices';
import { addUser } from '../../../components/services/usuarioService';
import { listarSubunidades } from '../../../components/services/subunidadeService';
import { perfilList } from '../../../utils/perfilList';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import cadastroAdminAchema from '../../../utils/schemas/cadastroAdminAchema';
import { Paper } from '@material-ui/core';
import GenerateAlert from '../../../components/errorAlert';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import withWidth from '@material-ui/core/withWidth';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './cadAdminStyle';
import LoadingPage from '../../../components/loading';

function CadastrarAdmin2(){

  const classes = useStyles();

    let [listaDeOm, setListaDeOm] = useState("");
    let [listaDePerfis, setListaDePerfis] = useState("");
    let [loading, setLoading] = useState(true);
    let [om, setOm] = useState([]);
    const [ showPassword, setShowPassword ] = useState({
      eye1: false,
      eye2: false
    });

    const history = useHistory();

    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {

      const inicializarForm = async () => {

        let omList = await listarOm( );

        setListaDeOm(omList);

        let listaSu = await listarSubunidades( om );

        setListaDePerfis(perfilList);
        setLoading(false);

      }

      inicializarForm();
    }, []);

    async function onSubmit( values, action ){

      let info = {
        severityType: 'success',
        type: 'user', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      await addUser( values );
      
      history.push('/GerenciarAdmin');



    }

    const verificarErro = ( msg ) => {

      let tipo = 'warning';

      if( msg == 'Não é um CPF válido.' ){
        tipo = 'error'
      }

      return(
        <GenerateAlert alertConfig={ {msg: msg, tipo: tipo} } />
      )

    }


    if(loading){ return <LoadingPage/>}

    return(

      <Container component="main" maxWidth="sm" style={{padding: 5}}>
      <CssBaseline />
      <Paper className={classes.paper}>

      <Grid container direction="row" justify="space-between" alignItems="center">
                  <Link to={'/GerenciarAdmin'}  style={{textDecoration: 'none'}}>
                      <Button
                          size='small'
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
                  <h2>Cadastrar Usuário</h2>
                </Grid>
            </Grid>

          </Grid>

        <Formik
        validationSchema={cadastroAdminAchema}
        onSubmit={onSubmit}
        initialValues={{
          nome: '',
          cpf: '',
          om: '',
          perfil: '',
          userName: '',
          senha:''
        }}
        render={( { values, handleChange, handleSubmit, errors, touched }) => (

        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                fullWidth
                label="Nome Completo"
                name="nome"
                value={values.nome}
                onChange={handleChange}
              />
        <ErrorMessage name="nome">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>
           
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                fullWidth
                label="Cpf"
                name="cpf"
                value={values.cpf}
                onChange={handleChange}
              />
              <ErrorMessage name="cpf">{(msg) =>  verificarErro(msg) }</ErrorMessage>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                autoComplete="off"
                fullWidth
                label="Perfil"
                name="perfil"
                value={values.perfil}
                onChange={handleChange}
                select
              >
               {perfilList.map( (p, i) => (

                <MenuItem key={i} value={ p.perfilSpring } className="option">
                    {p.perfil}
                </MenuItem>

                ))}

              </TextField>
              <ErrorMessage name="perfil">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                select
                autoComplete="off"
                fullWidth
                label="Om"
                name="om"
                value={values.om}
                onChange={handleChange}
              >
                {listaDeOm.map( ( o, i) => (

                  <MenuItem key={i} value={ o } className="option">
                      { o.nomeAbrev}
                  </MenuItem>

                ))}

              </TextField>
              <ErrorMessage name="om">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

            <Grid item xs={12} sm={6}>

            <FormControl style={{width:'100%'}}>
              <InputLabel htmlFor="input-with-icon-adornment">Nome de usuário</InputLabel>
              <Input
                autoComplete="off"
                fullWidth
                name="userName"
                value={values.userName}
                onChange={handleChange}
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <ErrorMessage name="userName">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

            <Grid item xs={12} sm={6}>

            <FormControl style={{width: '100%'}}>
              <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showPassword.eye2 ? 'text' : 'password'}
                onChange={handleChange}
                value={values.senha}
                name="senha"
                endAdornment={
                  <>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword({
                        eye1: showPassword.eye1,
                        eye2: !showPassword.eye2,

                      })}

                    >
                      {showPassword.eye2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  
                </>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                
              />
            </FormControl>

        <ErrorMessage name="senha">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

          </Grid>

          <Grid item xs={12} sm={12}>
            <Grid container direction="column" justify="center" alignItems="center">
              <Button
                style={{margin: '20px 0px 15px 0px'}}
                type="submit"
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.buttonSuccess}
              >
                cadastrar
              </Button>
            </Grid>
          </Grid>

        </Form>
        )}
      />
      </Paper>
      
    </Container>
    
    );
    
}

export default withWidth()(CadastrarAdmin2)
