import React, { useState, useEffect } from 'react';
import verifyUserAuth from '../../../utils/verificarUsuarioAuth';
import { useHistory } from 'react-router-dom';
import { useStyles } from './style';
import Divider from '@material-ui/core/Divider';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Button, Paper } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import GenerateAlert from '../../../components/errorAlert';
import LightTooltip from '../../../utils/toolTip';
import LoadingPage from  '../../../components/loading';

export default function Status( ){
    
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  let [loading, setLoading] = useState(false);

  const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        async function isAutenticated(){

            let autenticated = await verifyUserAuth();
        
            if( !autenticated ){
              history.push('/')
            }else{
              loadPage();
            }
        
          } 
        
          isAutenticated();
    }, []);

    const loadPage = async ( ) =>{

    }

    const onSubmit = ( values ) => {
        console.log("values", values)
    }

    if(loading){ return <LoadingPage bg={"#bdbfc1"}/>}

    return(
        <Grid className={classes.containerGeral} container direction="column" alignItems="center" justify="center">

          <Paper className={classes.paperCadastrarOm} elevation={3}>

            <Grid container direction="row" alignItems="center" justify="center">
                <div>
                    <Button 
                        size='small'
                        style={{marginTop: '-40px',marginLeft: '-8px', position: 'absolute'}}
                        variant="outlined"
                        color="primary"
                        startIcon={<KeyboardReturnIcon />}
                        onClick={ () => history.goBack()}
                    >
                        {!xsDownMedia && 'Voltar'}
                    </Button>

                </div>

                <Grid item xs>
                    <Grid container alignItems="center" justify="center">
                      <h2>Cadastrar OM</h2>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{marginBottom: 10}}/>

            <Formik
            //   validationSchema={cadastroOmShema}
              onSubmit={onSubmit}
              initialValues={{
                nomeOm: 'teste tt tt tt t',
                cnpj: '54510344000170',
                cep: '24325240',
                nomeAbrev: 'teste',
            }}
            render={( { values, handleChange, handleSubmit, errors }) => (

              <Form className={classes.root} noValidate autoComplete="off">

                <TextField 
                  required 
                  label="Nome Completo" 
                  name="nomeOm"
                  value={values.nomeOm}
                  onChange={handleChange}
                />
                <ErrorMessage name="nomeOm">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>
                      
                <TextField
                  className={classes.inputTxt}
                  required
                  label="Nome Abreviado"
                  type="text"
                  name="nomeAbrev"
                  value={values.nomeAbrev}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <LightTooltip title={"Exemplo: 1ºDE"}>
                        <InputAdornment position="start">
                          <HelpIcon />
                        </InputAdornment>
                      </LightTooltip>
                    ),
                  }}
                />
                <ErrorMessage name="nomeAbrev">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>
                  <FormControl className={classes.inputTxt}>

                    <InputLabel htmlFor="my-input">CNPJ</InputLabel>

                    <Input
                      name="cnpj"
                      value={values.cnpj}
                    //   inputComponent={cnpjMasck}
                      onChange={handleChange}
                    />

                  </FormControl>

                <FormControl className={classes.inputTxt}>

                  <InputLabel htmlFor="my-input">CEP</InputLabel>

                  <Input
                    name="cep"
                    value={values.cep}
                    // inputComponent={cepMasck}
                    onChange={handleChange}
                  />

                </FormControl>

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

