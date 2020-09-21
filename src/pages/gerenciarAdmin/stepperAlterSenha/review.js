import React from 'react';
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



export default function Review( {handleNext}) {

  const classes = useStyles();
  const [ erro, setErro ] = React.useState(false);

  async function onSubmit( values, action ){

    const {senha1, senha2} = values;

    if( senha1 != senha2 ){
      setErro(true)
    }else if( senha1 == senha2 ){
      setErro(false);
      handleNext();
    }
  
  }
  
  const teste = () => {
    setErro(false)
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
            <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Nova senha"
                name="senha1"
                value={values.senha1}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  
            />
            <ErrorMessage name="senha1">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>
            
            <TextField        
                margin="normal"
                fullWidth
                name="senha2"
                label="Repita a nova senha"
                value={values.senha2}
                onChange={handleChange}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <LockIcon />
                    </InputAdornment>
                ),
                }}
                type="password"
            />
            <ErrorMessage name="senha2">{(msg) => <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } />}</ErrorMessage>

        </Grid>

        <Grid style={{marginTop: 20}} container direction="column" justify="center" alignItems="center">
            <Button color="primary" className={classes.buttonSuccess} variant="contained" type="submit">Redefinir</Button>
        </Grid>


        </Form>

        )}
      />
    </React.Fragment>
  );
}