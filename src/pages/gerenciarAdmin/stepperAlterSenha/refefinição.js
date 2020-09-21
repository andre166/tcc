import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Formik, Form, ErrorMessage } from 'formik';
import loginSchema from '../../../utils/schemas/loginSchema';
import Button from '@material-ui/core/Button';
import GenerateAlert from '../../../components/errorAlert';
import { verificarLogin } from '../../../components/services/authService';


export default function AddressForm( { authOk, setAuthOk, setActiveStep } ) {

  const [ erro, setErro ] = React.useState(false);

  async function onSubmit( values, action ){

    let user = {userName: values.nome, senha: values.senha}

    let response = await verificarLogin( user );

    if( response.invalidUser ){
        setErro(true);
    }else{
        setAuthOk(true);
        setErro(false)
    }

  }

  const teste = () => {
    setErro(false)
  }

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom style={{marginBottom: 10}}>
        <strong>Digite o usuário e a senha de administrador</strong>
      </Typography>

      { erro && 
        <GenerateAlert alertConfig={ {msg: "Usuário e/ou senha Inválido!", tipo: "error", variant: 'filled'} } />
      }

      <Formik
        validate={teste}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        initialValues={{
          nome: '',
          senha: ''
        }}
        render={( { values, handleChange, handleSubmit, errors }) => (

        <Form>

          <Grid container spacing={3} style={{padding: 10}}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Nome de usuario"
              name="nome"
              value={values.nome}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
                  
            />
            <ErrorMessage name="nome">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>
              
            <TextField        
                variant="outlined"
                margin="normal"
                fullWidth
                name="senha"
                label="Senha"
                value={values.senha}
                onChange={handleChange}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <LockIcon />
                    </InputAdornment>
                  )
                }}
                type="password"
            />
            <ErrorMessage name="senha">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>

          </Grid>

          {!authOk && <Grid style={{marginTop: 20}} container direction="column" justify="center" alignItems="center">
            <Button variant="contained" color="default" type="submit">Verificar</Button>
          </Grid>}

        </Form>

        )}
      />

    </React.Fragment>
  );
}