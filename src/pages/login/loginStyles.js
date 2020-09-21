import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    containerLogin: {
        backgroundColor: '#fff',
        boxShadow: '2px 2px 4px #949494',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        padding: '60px 20px',
    },
    centralizar:{
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '0.5px',
    },
    leftText:{
      padding: 0,
      paddingLeft: 10,
    },
    container: {
        minWidth: '100% !important',
        height: '100vh !important',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:'#f1f3f8',
    },  
    paper: {
      marginTop: '-200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
      padding: 20,
      borderRadius: 4,
      maxWidth: 440,
      border: '1px solid #d8d3cd',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textField: {
        paddingLeft: 10,
    },
  }));