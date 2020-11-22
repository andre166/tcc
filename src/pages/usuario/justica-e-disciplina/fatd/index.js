import React, { useState, useEffect } from 'react';
import verifyUserAuth from '../../../../utils/verificarUsuarioAuth';
import { useHistory } from 'react-router-dom';
import { useStyles } from './style';
import Divider from '@material-ui/core/Divider';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Button, Paper } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form } from 'formik';
import LoadingPage from  '../../../../components/loading';
import { listarCidadaoPorTurma  } from '../../../../components/services/cidadaoService';
import { getTurma  } from '../../../../components/services/localStorgeService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tabelinha from './tabelinha';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {  postGradList } from '../../../../utils/PostGradList';

export default function Saude( ){
    
    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    let [loading, setLoading] = useState(true);
    let [militarList, setMilitarList] = useState([]);

    let [ arrolado, setArrolado] = useState([]);
    let [ participante, setParticipante] = useState([]);

    let [ relatoDofato, setRelatoDofato] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const turma = getTurma();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    
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

        const turmaId = turma.id;

        let cidadaoList = await listarCidadaoPorTurma( turmaId );
        console.log(cidadaoList)
        setMilitarList(cidadaoList);
        setLoading(false);
    }

    const onSubmit = ( ) => {
        
        let postGradArrolado = arrolado.postGrad;
        let postGradParticipante = participante.postGrad;

        let value1 = 0;
        let value2 = 0;

        postGradList.map( ( g, i )=> {

            if( g == postGradArrolado){
                value1 = i;
            }

            if( postGradParticipante == g){
                value2 = i;
            }

        })

        if( value1 < value2 ){
            handleClick();
            return;
        }
        
    }

    if(loading){ return <LoadingPage bg={"#bdbfc1"}/>}


    return(
        <Grid className={classes.containerGeral} container direction="column" alignItems="center" >

          <Paper className={classes.paperParteDeAcidente} elevation={1}>

            <Grid container direction="row" alignItems="center" justify="center">

                <Grid item xs>
                    <Grid container alignItems="center" justify="center">
                      <h2>Gerar FATD</h2>
                    </Grid>
                </Grid>
            </Grid>

            <Divider style={{marginBottom: 10}}/>

            <div style={{ width: 300 }}>
                <Autocomplete
                    disableClearable
                    noOptionsText="Nenhum resultado"
                    onChange={(event, newValue) => {
                        setArrolado(newValue)
                    }}

                    getOptionLabel={(o, value) => {
                        return o.nomeDeGuerra
                    }}

                    options={militarList.map((option) => option)}
                    renderInput={(params) => (

                        <TextField
                            required
                            variant="outlined"
                            {...params}
                            label="Militar Arrolado"
                            margin="normal"
                            InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              )
                            }}
                        />

                    )}
                />
            </div>

            {arrolado.length === undefined && <Tabelinha chosenOne={arrolado} classes={classes}/>}

            <div style={{ width: 300 }}>
                <Autocomplete
                    
                    disableClearable
                    noOptionsText="Nenhum resultado"
                    onChange={(event, newValue) => {
                        setParticipante(newValue)
                    }}

                    getOptionLabel={(o, value) => {
                        return o.nomeDeGuerra
                    }}

                    options={militarList.map((option) => option)}
                    renderInput={(params) => (

                        <TextField
                        required
                            variant="outlined"
                            {...params}
                            label="Participante"
                            margin="normal"
                            InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              )
                            }}
                        />

                    )}
                />
            </div>

            {participante.length === undefined && <Tabelinha chosenOne={participante} classes={classes}/>}

            {/* { participante.length === undefined && arrolado.length === undefined &&  */}
                <Grid  container direction="column" alignItems="center">

                <Grid container direction="row" alignItems="center">
                    <h4 style={{marginBottom: -10, zIndex: 10, background: '#fff', marginLeft: 10, padding: '0px 2px'}}>Relato do fato *</h4>
                    <textarea className={classes.textAreaCustom} 
                        value={relatoDofato}
                        onChange={(e) => setRelatoDofato(e.target.value)}
                        placeholder="Exemplo: Por faltar a formatura matinal no dia 09 de Janeiro de 2019"
                    ></textarea>
                </Grid>

                <Button style={{margin: '10px 0px'}} onClick={onSubmit} variant="contained" color="primary" className={classes.buttonSuccess}>
                    Gerar FATD
                </Button>

            </Grid>

            {/* } */}

            <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Note archived"
        >
            <Alert onClose={handleClose} severity="error">
                O militar mais moderno não pode participar o mais antigo.
            </Alert>
        </Snackbar>

 
        </Paper>   
      </Grid>
    );
}

