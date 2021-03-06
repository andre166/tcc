import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import cadastroOmShema from '../../../../utils/schemas/cadastroOmShema';
import { Button, Paper } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
import GenerateAlert from '../../../../components/errorAlert';
import { cadastrarOm } from '../../../../components/services/omServices';
import { useHistory}  from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './cadOmStyle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import LightTooltip from '../../../../utils/toolTip';
import {  cnpjMasck } from "../../../../components/masks/cnpjMask";
import {  cepMasck } from "../../../../components/masks/cepMask";
import InputLabel from '@material-ui/core/InputLabel';
import { retirarMasckCnpj } from '../../../../utils/maskAndValidators/cnpj';
import { retirarMaskCep } from '../../../../utils/maskAndValidators/cep';
import verifyUserAuth from  '../../../../utils/verificarUsuarioAuth';

export default function FormCadastro(){
     
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    async function isAutenticated(){

      let autenticated = await verifyUserAuth();
  
      if( !autenticated ){
          history.push('/')
      }else{
        
        return;

      }
  
    } 
  
    isAutenticated();

    async function onSubmit( values ){

      values.cnpj = retirarMasckCnpj( values.cnpj );
      values.cep = retirarMaskCep( values.cep );

      values.nomeAbrev = values.nomeAbrev.trim();
      values.nomeOm = values.nomeOm.trim();

      if( values.nomeOm == '' || values.nomeAbrev == ''){
        return;
      }

      await cadastrarOm(values);

      let info = {
        severityType: 'success',
        type: 'om', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      history.push('/Om');
      
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

    return(
        <Grid className={classes.containerGeral} container direction="column" alignItems="center" justify="center">

          <Paper className={classes.paperCadastrarOm} elevation={3}>

            <Grid container direction="row" alignItems="center" justify="center">

                <Grid item xs>
                    <Grid container alignItems="center" justify="center">
                      <h2>Cadastrar OM</h2>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{marginBottom: 10}}/>

            <Formik
              validationSchema={cadastroOmShema}
              onSubmit={onSubmit}
              initialValues={{
                nomeOm: '',
                cnpj: '',
                cep: '',
                nomeAbrev: '',
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
                  <FormControl className={classes.inputTxt} required>

                    <InputLabel htmlFor="my-input">CNPJ</InputLabel>

                    <Input
                    
                      name="cnpj"
                      value={values.cnpj}
                      inputComponent={cnpjMasck}
                      onChange={handleChange}
                      
                    />

                  </FormControl>
                <ErrorMessage name="cnpj">{(msg) => verificarErro(msg) }</ErrorMessage>

                <FormControl className={classes.inputTxt} required>

                  <InputLabel htmlFor="my-input">CEP</InputLabel>

                  <Input
                    name="cep"
                    value={values.cep}
                    inputComponent={cepMasck}
                    onChange={handleChange}
                  />

                </FormControl>

                <ErrorMessage name="cep">{(msg) => verificarErro(msg) }</ErrorMessage>

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