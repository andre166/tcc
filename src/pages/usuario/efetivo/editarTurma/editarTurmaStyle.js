import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

  paper: {
    padding: '10px 20px',
    // marginTop: 5,
    // [theme.breakpoints.down('xs')]: {
    //   marginTop: 5,
    // },
    maxWidth: 380

   },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      '&:hover': {
        background: "#4a5442",
     },
    },
    buttonInfo: {
      backgroundColor: '#0064a6',
      '&:hover': {
        background: "#195493",
     },
    },
    CcontainerEditarSenha: {
      marginTop: 10,
      padding: 10
    },
    buttonDanger: {
      backgroundColor: '#ed3237',
      '&:hover': {
        background: "#7f3436",
     },
    }
  }));