import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    paperCadastrarOm: {
      width: '100%',
      maxWidth: 500,
      padding: 15
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      height: 35,
      margin: '15px 0px 10px 0px',
        '&:hover': {
        background: "#4a5442",
        }
    },
    inputTxt:{
      marginTop: 8
    },
    containerGeral:{
        [theme.breakpoints.down('xs')]: {
            marginTop: 55,
        },
        marginTop: 80,
        padding: 5
    }

}));