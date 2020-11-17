import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
    containerLogin: {
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
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(189,189,189,0.4) 0px, rgba(189,189,189,0.3) 1px,transparent 3px, transparent 4px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))',
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
      border: '1px solid #fff',
      // boxShadow: '2px 3px 3px #000000'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#4E4B2C',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: '#4E4B2C',
      '&:hover': {
        background: '#3A392C '
      }
    },
    textField: {
        paddingLeft: 10,
    },
  }));