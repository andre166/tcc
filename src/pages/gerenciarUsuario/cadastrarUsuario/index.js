import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, fade } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { listarOm } from '../../../components/services/omServices';
import { addUser } from '../../../components/services/usuarioService';
import { listarSubunidades } from '../../../components/services/subunidadeService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { perfilListUser } from '../../../utils/perfilList';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import cadastroUsuarioSchema from '../../../utils/schemas/cadastrarUsuario';
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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px 20px',
    marginTop: 70,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 380
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      '&:hover': {
        background: "#4a5442",
     },
    },
    buttonInfo: {
      backgroundColor: '#0064a6',
      '&:hover': {
        background: "#195493",
     },
    },
}))

function CadastrarAdmin2(){

    const classes = useStyles();

    const history = useHistory();

    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    async function onSubmit( values, action ){

      let info = {
        severityType: 'success',
        type: 'user', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      await addUser( values );
      
      history.push('/GerenciarAdmin');

    }

    return(

      <Container component="main" maxWidth="xs" style={{padding: 5}}>
        <CssBaseline />
        <Paper className={classes.paper}>

          <Grid container direction="row" justify="space-between" alignItems="center">
            
            <Link to={'/GerenciarUsuario'}  style={{textDecoration: 'none'}}>
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
          validationSchema={cadastroUsuarioSchema}
          onSubmit={onSubmit}
          initialValues={{
            nome: '',
            cpf: '',
            perfil: '',
            userName: '',
            senha:''
          }}
          render={( { values, handleChange, handleSubmit, errors, touched }) => (

          <Form onSubmit={handleSubmit}>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  
                  fullWidth
                  label="Nome Completo"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                />
                <ErrorMessage name="nome">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>
           
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Cpf"
                  name="cpf"
                  value={values.cpf}
                  onChange={handleChange}
                />
                <ErrorMessage name="cpf">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  
                  fullWidth
                  label="Perfil"
                  name="perfil"
                  value={values.perfil}
                  onChange={handleChange}
                  select
                >
                  {perfilListUser.map( (p, i) => (

                    <MenuItem key={i} value={ p.perfilSpring } className="option">
                        {p.perfil}
                    </MenuItem>

                  ))}

                </TextField>
                <ErrorMessage name="perfil">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>

              <Grid item xs={12} sm={12}>

                <FormControl style={{width:'100%'}}>
                  <InputLabel htmlFor="input-with-icon-adornment">Nome de usuário</InputLabel>
                  <Input
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

            <Grid item xs={12} sm={12}>

              <FormControl style={{width:'100%'}}>
                <InputLabel htmlFor="input-with-icon-adornment">Senha</InputLabel>
                <Input
                  fullWidth
                  name="senha"
                  value={values.senha}
                  onChange={handleChange}
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                type="password"
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
