import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function GenerateAlert( {bg}){

    
    const useStyles = makeStyles((theme) => ({
        centralizar:{
            marginTop: 65,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.5px',
            height: '100%',
        },
    }));
    
    const classes = useStyles();

    return (
      <div className={classes.centralizar} style={{background: bg || '#eeeeeee'}}>
        <CircularProgress size={60}/>
      </div>
    );

  }