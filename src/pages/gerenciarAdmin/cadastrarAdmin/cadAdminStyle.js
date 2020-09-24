import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '10px 20px',
      marginTop: 70,
      [theme.breakpoints.down('xs')]: {
        marginTop: 56,
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%',
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
      }
  }))