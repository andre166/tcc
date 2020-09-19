import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import cadastroSu from '../../../../utils/schemas/cadastroSu';
import { Button, Paper } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import GenerateAlert from '../../../../components/errorAlert';
import { listarSubunidades, editarSubunidade} from '../../../../components/services/subunidadeService';
import { listarOm } from '../../../../components/services/omServices';
import { useParams, useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Modal from '../formulario/testeTableCard/components/modal/modal';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

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
            marginTop: 70
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

    const { id, idOm } = idParams;

    let [ om, setOm ] = useState("");
    let [ omParaVincular, setOmParaVincular ] = useState("");

    useEffect(() => {


        const getOm = async( id ) => {

            let _om = await listarSubunidades( id );
            let omVinc = await listarOm( idOm );

            setOm(_om)
            setOmParaVincular(omVinc)

        }

        getOm(id)
        
    }, []);

    async function onSubmit( values ){

        let omFinal = Object.assign(values, {om: omParaVincular});
        omFinal =  Object.assign(values, {id: id});
  
        await editarSubunidade(omFinal);

        let info = {
            severityType: 'info',
            msg: 'om',
        }
    
        localStorage.setItem("snackBarAlert", JSON.stringify(info));

        history.push(`/Subunidade/${idOm}`);
  
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

                    <Grid item sm={1}>
                        <Link to={`/Subunidade/${idOm}`}  style={{textDecoration: 'none'}}>
                            <Button
                                style={{marginTop: '-30px'}}
                                variant="outlined"
                                color="primary"
                                startIcon={<KeyboardReturnIcon />}
                            >
                                Voltar
                            </Button>
                        </Link>
                    </Grid>

                    <Grid item xs>
                        <Grid container alignItems="center" justify="center">
                            <h2> Editar Subunidade</h2>
                        </Grid>
                    </Grid>

                    <Grid item sm={1}></Grid>

                </Grid>

                    <Divider style={{marginBottom: 10}}/>

                    <Formik
                        validationSchema={cadastroSu}
                        onSubmit={onSubmit}
                        initialValues={{
                        nomeCompleto: om.nomeCompleto,
                        nomeSubunidade: om.nomeSubunidade,
                    }}
                        render={( { values, handleChange, handleSubmit, errors }) => (

                        <Form className={classes.root} noValidate autoComplete="off">
                            <TextField 
                                className={classes.inputTxt}
                                required 
                                label="Nome Completo" 
                                name="nomeCompleto"
                                value={values.nomeCompleto}
                                onChange={handleChange}
                            />
                            <ErrorMessage name="nomeCompleto">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>
                            
                            <TextField  
                                className={classes.inputTxt}
                                required
                                label="Nome abreviado" 
                                name="nomeSubunidade"
                                value={values.nomeSubunidade}
                                onChange={handleChange}
                            />
                            <ErrorMessage name="nomeSubunidade">{(msg) => verificarErro(msg) }</ErrorMessage>

                            <Grid container direction="row" alignItems="flex-start" justify="center">
                                    <Button type="submit" variant="contained" color="primary" className={classes.buttonSuccess}>
                                        Editar
                                    </Button>
                                    <div style={{width: 10}}></div>
                                    
                                    <Modal om={om} btnModalType={'edit'} omParaVincular={omParaVincular} />

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