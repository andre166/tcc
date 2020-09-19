import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:{
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    textAlign: 'center',
  },
  success: {
    marginLeft: 5,
    marginTop: -2,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontSize: 18,
    fontWeight: 500,
    color: '#81b214'
  },
  error: {
    marginLeft: 5,
    marginTop: -2,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontSize: 18,
    fontWeight: 500,
    color: '#a35d6a'
  },
  info: {
    marginLeft: 5,
    marginTop: -2,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontSize: 18,
    fontWeight: 500,
   color: '#40a8c4'
  },
  centralizar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
}));

export default function CustomizedSnackbars( { info } ) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  let { severityType, type,  variantType } = info;

  let msg = '';

  if( !variantType ){
    variantType = 'filled'
  }

  if( type == 'user' ){

    if( severityType == 'success'){
      msg =  <label className={classes.centralizar}> <span>Usuário</span> <span className={classes.success}> cadastrado</span> <span style={{marginLeft: 5}}>com sucesso!</span> </label>
    }

    if( severityType == 'error'){
      msg = <label className={classes.centralizar}> <span>Usuário</span> <span className={classes.error}> exculído</span> <span style={{marginLeft: 5}}>com sucesso!</span> </label>
    }

    if( severityType == 'info'){
      msg = <label className={classes.centralizar}> <span>Usuário</span> <span className={classes.info}> editado</span><span style={{marginLeft: 5}}>com sucesso!</span></label>
    }

  }

  if( type == 'om'){

    if( severityType == 'success'){
      msg =  <label className={classes.centralizar}> <span>OM</span> <span className={classes.success}> cadastrada</span> <span style={{marginLeft: 5}}>com sucesso!</span> </label>
    }

    if( severityType == 'error'){
      msg = <label className={classes.centralizar}> <span>OM</span> <span className={classes.error}> exculída</span> <span style={{marginLeft: 5}}>com sucesso!</span> </label>
    }

    if( severityType == 'info'){
      msg = <label className={classes.centralizar}> <span>OM</span> <span className={classes.info}> editada</span><span style={{marginLeft: 5}}>com sucesso!</span></label>
    }

  }



  const message = msg;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // const message = ( 
  //   <>
  //    <span>{msg}</span>
  //    <span className={classes.success}>sucesso!</span>
  //   </>
  // )

  localStorage.removeItem("snackBarAlert");

  return (
    <div className={classes.root}>
      <Snackbar open={open} 
      autoHideDuration={4000} 
      onClose={handleClose}
      message={message}>
      </Snackbar>
    </div>
  );
}