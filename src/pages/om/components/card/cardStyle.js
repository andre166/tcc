import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root: {
        width:'100%',
        position:  'relative'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      textAlign: 'left'
    },
    pos: {
      marginBottom: 12,
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      height: 35,
      marginLeft: 10,
      '&:hover': {
        background: "#4a5442",
     }
    },
    buttonDanger: {
      backgroundColor: '#ed3237',
      '&:hover': {
        background: "#7f3436",
      }
    },
    buttonInfo: {
      backgroundColor: '#0064a6',
      '&:hover': {
        background: "#195493",
      }
    }
});