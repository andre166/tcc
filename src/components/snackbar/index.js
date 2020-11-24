import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import useStyles from './snackStyles';

export default function CustomizedSnackbars( { info } ) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  let { severityType, type,  variantType } = info;

  function generateMsg(){

    let tipo = ''
    let msgFinal = '';
    let gen = '';
    let estilo = '';

    if( type == 'user' ){
      tipo = 'Usuário'
      gen = 'o'
    }else if(type == 'om'){
      tipo = 'OM'
      gen = 'a'
    }else if(type == 'subunidade'){
      tipo = 'Subunidade'
      gen = 'a'
    }else if(type == 'Turma'){
      tipo = 'Efetivo'
      gen = 'o'
    }else if(type == 'militar'){
      tipo = 'Militar'
      gen = 'o'
    }else if(type == 'status'){
      tipo = 'Status'
      gen = 'o'
    }

    if( type == 'status' ){
      msgFinal = ` Alterad${gen}`;
      estilo = classes.success;
    }else if( severityType == 'success'){
      msgFinal = ` cadastrad${gen}` ;
      estilo = classes.success;
    }else if(severityType == 'error'){
      msgFinal = ` exluíd${gen}`;
      estilo = classes.error;
    }else if(severityType == 'info'){
      msgFinal = ` editad${gen}`;
      estilo = classes.info;
    }

    return(
      <label className={classes.centralizar}> 
        <span>{tipo}</span> 
        <span className={estilo}>{msgFinal}</span> 
        <span style={{marginLeft: 5}}>com sucesso!</span> 
      </label>
    )
  }


  if( !variantType ){
    variantType = 'filled'
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  localStorage.removeItem("snackBarAlert");

  return (
    <div className={classes.root}>
      <Snackbar open={open} 
        autoHideDuration={4000} 
        onClose={handleClose}
        message={generateMsg()}>
      </Snackbar>
    </div>
  );
}