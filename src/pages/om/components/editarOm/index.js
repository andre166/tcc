import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import cadastroOmShema from '../../../../utils/schemas/cadastroOmShema';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import LoadingPage from  '../../../../components/loading'
import LightTooltip from '../../../../utils/toolTip';
import { useStyles } from './editarOmStyle';
  
export default function Om(){
     
    const classes = useStyles();

    let idParams = useParams();
    const history = useHistory();

    const theme = useTheme();
    let [loading, setLoading] = useState(true);

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    const { id } = idParams;

    let [ om, setOm ] = useState("");

    useEffect(() => {

        const getOm = async( id ) => {

            let _om = await listarOm( id )

            setOm(_om);
            setLoading(false);
        }

        getOm(id)
        
    }, []);

    async function onSubmit( values ){

        values.nomeAbrev = values.nomeAbrev.trim();
        values.nomeOm = values.nomeOm.trim();

        if( values.nomeOm == '' || values.nomeAbrev == ''){
            return;
          }

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

    if(loading){ return <LoadingPage/>}

    return(
        <Grid container className={classes.containerGeral} direction="row" alignItems="flex-start" justify="center">

            <Grid  className={classes.edtitarOmContainer} direction="column">


                <Grid container direction="row" alignItems="flex-start" justify="center">
                {om &&  <Paper className={classes.paperCadastrarOm} elevation={3}>

                <Grid container direction="row"alignItems="center" justify="flex-start">

                        <Link to={'/Om'}  style={{textDecoration: 'none'}}>
                            <Button
                                size='small'
                                style={{marginTop: '-40px',marginLeft: '-8px', position: 'absolute'}}
                                variant="outlined"
                                color="primary"
                                startIcon={<KeyboardReturnIcon />}
                            >
                               { !xsDownMedia && 'Voltar'}
                            </Button>
                        </Link>

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