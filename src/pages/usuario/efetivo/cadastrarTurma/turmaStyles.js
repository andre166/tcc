import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        
    },
    containerGeral:{
        // marginTop: 65,
        // [theme.breakpoints.down('xs')]: {
        //     marginTop: 55,
        // },
        padding: 5
    },
    paperCadastrarOm: {
        width: '100%',
        maxWidth: 500,
        padding: 15
      },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    containerPrincipal: {
        width: '100%',
        height: 'calc(90vh - 80px) !important',

    },
    containerPrincipal2Paper: {
        marginTop: 65,
        width: '100%',
        minHeight: 'calc(100vh - 65px) !important',
    },
    datepickerPaper: {
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 15
    },
    datePicker: {
        // border: '1px solid red',
        position: 'relative',
        width: '100%',
        maxWidth: 320,
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
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#ed3237',
        '&:hover': {
          background: "#7f3436",
       },
      },
    
      buttonInfo: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#0064a6',
        '&:hover': {
          background: "#195493",
       },
      },

    buttonSuccessSm: {
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       }
    },
    selecionarEfetivoContainer: {
        width: '100%',
        maxWidth: 420,
        marginTop: 20,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px 5px 10px'
    },
    nenhumEfetivoContainer: {
        marginTop: 30,
        width: '100%',
        maxWidth: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputTxt:{
        marginTop: 8
    },
  }));