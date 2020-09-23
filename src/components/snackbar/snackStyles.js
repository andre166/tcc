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
      fontSize: 16,
      fontWeight: 500,
      color: '#81b214'
    },
    error: {
      marginLeft: 5,
      marginTop: -2,
      textAlign: 'center',
      letterSpacing: 0.5,
      fontSize: 16,
      fontWeight: 500,
      color: '#a35d6a'
    },
    info: {
      marginLeft: 5,
      marginTop: -2,
      textAlign: 'center',
      letterSpacing: 0.5,
      fontSize: 16,
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

  export default useStyles;