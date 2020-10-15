
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    centralizar:{
      padding: 0,
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '0.5px',
    },
}));


export default function GenerateAlert( obj ){

    const classes = useStyles();

    let { msg, tipo, variant, largura, larguraMax, showIcon, pad } = obj.alertConfig;

    if(showIcon === ''){
      showIcon = true
    }

    if( !pad ){
      pad = '0px 8px 0px 8px'
    }

    let alertClass = '';
    let variantTipoGraf = ''

    if( variant ){
      alertClass = classes.centralizar;
      variantTipoGraf = 'subtitle2'
    }else{

      alertClass = classes.leftTextAlert;
      variantTipoGraf = 'caption'

    }

    return (
      <div style={{width: largura || '100%', maxWidth: larguraMax || '100%', padding: 0}}>
        <Alert variant={variant} icon={showIcon} severity={tipo} className={alertClass} style={{padding: pad}}>
          <Typography variant={variantTipoGraf} color="#fff" align="center" >
            {msg}
          </Typography> 
        </Alert>
      </div>
    );

  }