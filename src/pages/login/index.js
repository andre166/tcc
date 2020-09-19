import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './login.css';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
// import StoreContext from '../../store/context';
import { verificarLogin } from '../../components/services/authService';
import { connect } from 'react-redux';
import { renderNavbar } from '../../components/actions/navbarActions';
import { setNameAndToken } from '../../components/actions/userAction';
import loginSchema from '../../utils/schemas/loginSchema';
import GenerateAlert from '../../components/errorAlert';

import { bindActionCreators } from 'redux';

import { Formik, Field, Form, ErrorMessage } from 'formik';

const useStyles = makeStyles((theme) => ({
    centralizar:{
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '0.5px',
    },
    leftText:{
      padding: 0,
      paddingLeft: 10,
    },
    container: {
        // marginTop: '-40px',
        minWidth: '100% !important',
        height: '100vh !important',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:'#f1f3f8',
        // marginLeft: 125,
    },  
    paper: {
      marginTop: '-200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
      padding: 20,
      borderRadius: 4,
      maxWidth: 440,
      border: '1px solid #d8d3cd',
    //   boxShadow: '2px 2px 2px black'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textField: {
        paddingLeft: 10,
    },
  }));

async function logar (usuario, password ){

  let user = {userName: usuario, senha: password}

  let response = await verificarLogin( user );

  return response;

}

function Login( props ){

    const [ erro, setErro ] = useState({
      erro: false,
      msg: '',
      tipo: ''
    });

    const history = useHistory();

    if( props.navbarState.renderNavBar ){
      props.renderNavbar(false);
    }

    async function onSubmit( values, action ){

      const { nome, senha } = values;

      const login = await logar( nome, senha );

      console.log("aaaa", login)
      if( login.invalidUser ==  'Network Error'){

        setErro({
          erro: true,
          msg: 'Falha ao conectar-se ao servidor, contacte o administrador do sistema',
          tipo: 'warning'
        });

      }else if( login.invalidUser ){

        action.resetForm({});
        setErro({
          erro: true,
          msg: 'Usuário e/ou senha Inválido!',
          tipo: 'error'
        });

      }else{

        let info = {
          name: nome,
          token: login.data.data.token,
          perfil:  login.data.usuario.perfil
        }

        localStorage.setItem("userInfo", JSON.stringify(info)); 
        history.push('/Home');
        props.renderNavbar(true);
      }

    }

    const classes = useStyles();

    function Copyright() {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'André Mesquita e Edivaldo Sobrenome © '}
          <Link color="inherit">
            All Rights Reserved
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }

    const teste = () => {
      setErro(false)
    }
      
    return(

    <Container component="main" maxWidth="xs" className={classes.container}>
    <CssBaseline />
    <Box className={classes.paper} boxShadow={1}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h6" style={{letterSpacing: 0.5}}>
        Sistema de Controle de Efetivo Militar
      </Typography>
      { erro.erro && 
        <GenerateAlert alertConfig={ {msg: erro.msg, tipo: erro.tipo, variant: 'filled'} } />
      }
      <Formik
        validate={teste}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        initialValues={{
          nome: 'CB_MESQUITA',
          senha: '123456'
        }}
        render={( { values, handleChange, handleSubmit, errors }) => (

          <Form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete={false} autocomplete="off">

            <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome de usuario"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  
                name="nome"
                value={values.nome}
                onChange={handleChange}
            />
            {/* <ErrorMessage name="nome"/> */}
                <ErrorMessage name="nome">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }
            </ErrorMessage>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                  <LockIcon />
                  </InputAdornment>
              ),
              }}
              type="password"
              id="password"
              value={values.senha}
              onChange={handleChange}
            />

            <ErrorMessage name="senha">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          
          </Form>
        )}
      />
    </Box>
    <Box mt={8}>
    </Box>
    <Copyright />
  </Container>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, setNameAndToken }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(Login)