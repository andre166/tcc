import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import { verificarLogin } from '../../components/services/authService';
import { listUsuarioUnicoComSubunidade } from '../../components/services/usuarioService';
import loginSchema from '../../utils/schemas/loginSchema';
import GenerateAlert from '../../components/errorAlert';
import { useStyles } from './loginStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik, Form, ErrorMessage } from 'formik';
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderNavbar } from '../../components/actions/navbarActions';
import { setNameAndToken, setAuthRoutesErro } from '../../components/actions/userAction';


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

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = React.useState(false);

    const history = useHistory();

    if( props.navbarState.renderNavBar ){
      props.renderNavbar(false);
    }

    async function onSubmit( values, action ){

      props.setAuthRoutesErro(false);

      if (!loading) {
        setSuccess(false);
        setLoading(true);
      }

      const { nome, senha } = values;

      const login = await logar( nome, senha );

      console.log("lo", login)

      if( login.invalidUser ==  'Network Error'){
        console.log("aqui")
        setErro({
          erro: true,
          msg: 'Falha ao conectar-se ao servidor, contacte o administrador do sistema',
          tipo: 'warning'
        });
        setSuccess(true);
        setLoading(false);

      }else if( login.invalidUser ){

        action.resetForm({});
        setErro({
          erro: true,
          msg: 'Usuário e/ou senha Inválido!',
          tipo: 'error'
        });
        setSuccess(true);
        setLoading(false);

      }else{

        let uId = login.data.usuario.id;

        let info = {
          token: login.data.data.token,
        }

        localStorage.setItem("userInfo", JSON.stringify(info)); 
        localStorage.setItem("navBarItem", 1)
        
        let userSu = await listUsuarioUnicoComSubunidade( uId );

        info = {
          name: nome,
          token: login.data.data.token,
          perfil:  login.data.usuario.perfil,
          userId: login.data.usuario.id,
          userSu: userSu[0].idSU,
        }

        localStorage.setItem("userInfo", JSON.stringify(info)); 
        localStorage.setItem("navBarItem", 1)

        if( login.data.usuario.perfil == 'ROLE_ADMIN' ){
          history.push('/AdminHome');
          props.renderNavbar(true);
        }else if( login.data.usuario.perfil == 'ROLE_CHEFE_INFO' ){
          history.push('/ChInfoHome');
          props.renderNavbar(true);
        }else if( login.data.usuario.perfil !== 'ROLE_CHEFE_INFO' && login.data.usuario.perfil !== 'ROLE_ADMIN'){
          history.push('/Efetivo');
        }
        
      }

    }

    const classes = useStyles();

    function Copyright() {
      return (
        <h4 style={{color: '#909090', letterSpacing: 1, fontWeight: 200, margin: 0}}>André Mesquita e Edivaldo Sobrenome © All Rights Reserved {new Date().getFullYear()}.</h4>
      );
    }

    const teste = () => {
      setErro(false)
    }
    return(

    <Container component="main" maxWidth="xs" className={classes.container}>

    <CssBaseline />
    
    <Box className={classes.paper} boxShadow={1}>

      {props.userState.erro && 
        <GenerateAlert alertConfig={ {msg: 'Usuário não autenticado, favor fazer login.', tipo: 'warning', variant: 'filled'} } />
      }

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
          nome: 'SGT_ANDRE_MESQ',
          senha: '12345'
        }}
        render={( { values, handleChange, handleSubmit, errors }) => (

          <Form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete={false} autocomplete="off">

            <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                fullWidth
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
            <ErrorMessage name="nome">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>
            
            <TextField
              variant="outlined"
              margin="normal"
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
              value={values.senha}
              onChange={handleChange}
            />

            <ErrorMessage name="senha">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>

            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Entrar
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
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

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, setNameAndToken, setAuthRoutesErro }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(Login)