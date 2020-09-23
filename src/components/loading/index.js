import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function GenerateAlert(){

    
    const useStyles = makeStyles((theme) => ({
        centralizar:{
            background: '#eeeeee',
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
      <div className={classes.centralizar}>
        <CircularProgress size={60}/>
      </div>
    );

  }