import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import cadastroOmShema from '../../../../utils/schemas/cadastroOmShema';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import GenerateAlert from '../../../../components/errorAlert';
import { editarOm, listarOm } from '../../../../components/services/omServices';
import { useParams, useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Modal from '../modal/modal';
import { Button, Paper } from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#222831",
      color: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 14,
      padding: '8px 12px 8px 12px'
    },
  }))(Tooltip);
  
    const useStyles = makeStyles((theme) => ({
        containerGeral:{
            marginTop: 70,
            padding: 5
        },
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        paperCadastrarOm: {
        width: '100%',
        maxWidth: 600,
        padding: 15
        },
        buttonSuccess: {
        backgroundColor: '#1d3724',
        height: 35,
        margin: '15px 0px 10px 0px',
        '&:hover': {
            background: "#4a5442",
        }
        },
        buttonDanger: {
            backgroundColor: '#ed3237',
            height: 35,
            margin: '15px 0px 10px 0px',
            '&:hover': {
              background: "#7f3436",
           },
          },
        edtitarOmContainer:{
            width: '100%',
            maxWidth: 1100,
        },
        inputTxt:{
            marginTop: 12
        }
    }));
  

export default function Om(){
     
    const classes = useStyles();

    let idParams = useParams();
    const history = useHistory();

    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    const { id } = idParams;

    let [ om, setOm ] = useState("");

    useEffect(() => {

        const getOm = async( id ) => {

            let _om = await listarOm( id )

            setOm(_om)

        }

        getOm(id)
        
    }, []);

    async function onSubmit( values ){

        let omFinal = Object.assign(values, {id: om.id})
  
        await editarOm(omFinal);

        let info = {
            severityType: 'info',
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
        <Grid container className={classes.containerGeral} direction="row" alignItems="flex-start" justify="center">

            <Grid  className={classes.edtitarOmContainer} direction="column">


                <Grid container direction="row" alignItems="flex-start" justify="center">
                {om &&  <Paper className={classes.paperCadastrarOm} elevation={3}>

                <Grid container direction="row"alignItems="center" justify="flex-start">

                    {/* <Grid item sm={1}> */}
                        <Link to={'/Om'}  style={{textDecoration: 'none'}}>
                            <Button
                                size='small'
                                style={{marginTop: '-35px', position: 'absolute'}}
                                variant="outlined"
                                color="primary"
                                startIcon={<KeyboardReturnIcon />}
                            >
                               { !xsDownMedia && 'Voltar'}
                            </Button>
                        </Link>
                    {/* </Grid> */}

                    <Grid item xs>
                        <Grid container alignItems="center" justify="center">
                            <h2> Editar OM</h2>
                        </Grid>
                    </Grid>

                    <Grid item sm={1}></Grid>

                </Grid>

                    <Divider style={{marginBottom: 10}}/>

                    <Formik
                        validationSchema={cadastroOmShema}
                        onSubmit={onSubmit}
                        initialValues={{
                        nomeOm: om.nomeOm,
                        cnpj: om.cnpj,
                        cep: om.cep,
                        nomeAbrev: om.nomeAbrev,
                    }}
                        render={( { values, handleChange, handleSubmit, errors }) => (

                        <Form className={classes.root} noValidate autoComplete="off">
                                <TextField 
                                    className={classes.inputTxt}
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
                                
                                <TextField  
                                    className={classes.inputTxt}
                                    required
                                    label="CNPJ" 
                                    name="cnpj"
                                    value={values.cnpj}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="cnpj">{(msg) => verificarErro(msg) }</ErrorMessage>

                                <TextField  
                                    className={classes.inputTxt}
                                    required
                                    label="CEP" 
                                    name="cep"
                                    value={values.cep}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="cep">{(msg) => verificarErro(msg) }</ErrorMessage>

                                <Grid container direction="row" alignItems="flex-start" justify="center">
                                    <Button type="submit" variant="contained" color="primary" className={classes.buttonSuccess}>
                                        Editar
                                    </Button>
                                    <div style={{width: 10}}></div>
                                    
                                    <Modal om={om} btnModalType={'edit'}/>

                                </Grid>
                        </Form>
                    )}
                    />
                </Paper>}
                </Grid>


            </Grid>
        </Grid>
    );
    
}