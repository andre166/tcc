import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    containerGeral:{
        marginTop: 70,
        padding: 5,
        [theme.breakpoints.down('xs')]: {
            marginTop: 55,
        },
    },
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    paperCadastrarOm: {
    width: '100%',
    maxWidth: 600,
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
    buttonDanger: {
        backgroundColor: '#ed3237',
        height: 35,
        margin: '15px 0px 10px 0px',
        '&:hover': {
          background: "#7f3436",
       },
      },
    edtitarOmContainer:{
        width: '100%',
        maxWidth: 1100,
    },
    inputTxt:{
        marginTop: 12
    }
}));