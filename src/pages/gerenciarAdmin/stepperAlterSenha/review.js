import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Formik, Form, ErrorMessage } from 'formik';
import redefinirSenhaSchema from '../../../utils/schemas/redefinirSenha';
import Button from '@material-ui/core/Button';
import GenerateAlert from '../../../components/errorAlert';
import TextField from '@material-ui/core/TextField';
import { alterUserPassword } from '../../../components/services/usuarioService';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttonSuccess: {
    backgroundColor: '#1d3724',
    '&:hover': {
      background: "#4a5442",
   },
  },

}));



export default function Review( {handleNext, rowInfo}) {

  const classes = useStyles();
  const [ erro, setErro ] = useState(false);

  const [ showPassword, setShowPassword ] = useState({
    eye1: false,
    eye2: false
  });




  async function onSubmit( values, action ){

    const {senha1, senha2} = values;

    const userId = rowInfo.id;

    if( senha1 != senha2 ){
      setErro(true)
    }else if( senha1 == senha2 ){

      let user = { id: userId, senha: senha1}

      await alterUserPassword(user);
      setErro(false);
      handleNext();
    }
  
  }
  

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        Digite a <strong>nova senha</strong> uma vez em cada campo, 
        se ambas estiverem iguais a senha do usuário será redefinida.
      </Typography>

      { erro && 
        <GenerateAlert alertConfig={ {msg: "Senha não confere, por favor digite a mesma senha em ambos os campos!", tipo: "warning"} } />
      }
      
      <Formik
        validationSchema={redefinirSenhaSchema}
        onSubmit={onSubmit}
        initialValues={{
          senha1: '',
          senha2: ''
        }}
        render={( { values, handleChange, handleSubmit, errors }) => (

        <Form>

        <Grid container spacing={3} style={{padding: 10}}>
        <FormControl style={{width: '100%'}}>
              <InputLabel htmlFor="standard-adornment-password">Repita a nova senha</InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showPassword.eye1 ? 'text' : 'password'}
                onChange={handleChange}
                value={values.senha1}
                name="senha1"
                endAdornment={
                  <>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword({
                        eye1: !showPassword.eye1,
                        eye2: showPassword.eye2,

                      })}
                    >
                      {showPassword.eye1 ? <Visibility /> : <VisibilityOff />}
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

            <ErrorMessage name="senha1">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>
            
            <FormControl style={{width: '100%'}}>
              <InputLabel htmlFor="standard-adornment-password">Repita a nova senha</InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showPassword.eye2 ? 'text' : 'password'}
                onChange={handleChange}
                value={values.senha2}
                name="senha2"
                endAdornment={
                  <>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword({
                        eye1: showPassword.eye1,
                        eye2: !showPassword.eye2,

                      })}
                      // onMouseDown={handleMouseDownPassword}
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

            <ErrorMessage name="senha2">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>

        </Grid>

        {/* <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl> */}

        <Grid style={{marginTop: 20}} container direction="column" justify="center" alignItems="center">
            <Button color="primary" className={classes.buttonSuccess} variant="contained" type="submit">Redefinir</Button>
        </Grid>


        </Form>

        )}
      />
    </React.Fragment>
  );
}