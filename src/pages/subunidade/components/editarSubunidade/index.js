import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import cadastroSu from '../../../../utils/schemas/cadastroSu';
import { Button, Paper } from '@material-ui/core';
import GenerateAlert from '../../../../components/errorAlert';
import { listarSubunidades, editarSubunidade} from '../../../../components/services/subunidadeService';
import { listarOm } from '../../../../components/services/omServices';
import { useParams, useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Modal from '../formulario/testeTableCard/components/modal/modal';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './editSu';
import LoadingPage from '../.../../../../../components/loading';

export default function Om(){
     
    const classes = useStyles();
    let idParams = useParams();
    const history = useHistory();
    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    const { id, idOm } = idParams;

    let [ om, setOm ] = useState("");
    let [ omParaVincular, setOmParaVincular ] = useState("");
    let [loading, setLoading] = useState(true);

    useEffect(() => {


        const getOm = async( id ) => {

            let _om = await listarSubunidades( id );
            let omVinc = await listarOm( idOm );

            setOm(_om);
            setOmParaVincular(omVinc);
            setLoading(false);

        }

        getOm(id);
        
    }, []);

    async function onSubmit( values ){

        values.nomeCompleto = values.nomeCompleto.trim();
        values.nomeSubunidade = values.nomeSubunidade.trim();

        if( values.nomeCompleto == '' || values.nomeSubunidade == ''){
            return;
        }

        let omFinal = Object.assign(values, {om: omParaVincular});
        omFinal =  Object.assign(values, {id: id});
  
        await editarSubunidade(omFinal);

        let info = {
            severityType: 'info',
            type: 'subunidade',
        }
    
        localStorage.setItem("snackBarAlert", JSON.stringify(info));

        let response = JSON.parse(localStorage.getItem("userInfo"));

        let userPerfil = response.perfil;
  
        if( userPerfil == 'ROLE_ADMIN'){
            history.push(`/Subunidade/${idOm}`);
        }else{
            history.push(`/Subunidade`);

        }

  
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

    function generatBackBtn(){

    let response = JSON.parse(localStorage.getItem("userInfo"));

    let userPerfil = response.perfil;

        if( userPerfil == "ROLE_ADMIN"){
            return (
            <Link to={`/Subunidade/${idParams.idOm}`}  style={{textDecoration: 'none'}}>
                <Button
                    size="small"
                    style={{marginTop: '-40px',marginLeft: '-8px', position: "absolute"}}
                    variant="outlined"
                    color="primary"
                    startIcon={<KeyboardReturnIcon />}
                >
                    { !xsDownMedia && 'Voltar'}
                </Button>
            </Link>
            )

        }else{
  
            return (
                <Link to={`/Subunidade`}  style={{textDecoration: 'none'}}>
                    <Button
                        size="small"
                        style={{marginTop: '-40px',marginLeft: '-8px', position: "absolute"}}
                        variant="outlined"
                        color="primary"
                        startIcon={<KeyboardReturnIcon />}
                    >
                        { !xsDownMedia && 'Voltar'}
                    </Button>
                </Link>
            )

        }
    }
  
    if(loading){ return <LoadingPage/>}

    return(
        <Grid container className={classes.containerGeral} direction="row" alignItems="flex-start" justify="center">

            <Grid  className={classes.edtitarOmContainer} direction="column">


                <Grid container direction="row" alignItems="flex-start" justify="center">
                {om &&  <Paper className={classes.paperCadastrarOm} elevation={3}>

                <Grid container direction="row"alignItems="center" justify="flex-start">

                    <Grid item sm={1}>
                        {generatBackBtn()}
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