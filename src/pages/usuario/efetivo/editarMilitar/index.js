import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams, useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { Button, Paper } from '@material-ui/core';
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

    export default function EditarOm(){
     
        const classes = useStyles();
    
        let idParams = useParams();
        const history = useHistory();
    
        const { id } = idParams;
    
        let [ om, setOm ] = useState("");
    
        useEffect(() => {
    
            
        }, []);
    
        async function onSubmit( values ){
    
            // let omFinal = Object.assign(values, {id: om.id})
      
            // await editarOm(omFinal);
    
            // let info = {
            //     severityType: 'info',
            //     type: 'om',
            // }
        
            // localStorage.setItem("snackBarAlert", JSON.stringify(info));
    
            // history.push('/Om');
      
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
}