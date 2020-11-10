import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        background: '#eeeeee',
        width:'100%',
        padding: 10,
        minHeight: 'calc(100vh - 20px)',
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    avatarIcon: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: 'rgba(0, 0, 0, 0.54)',
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
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
    btnLinkContainer:{
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSuccess: {
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       }
    },
    buttonDanger: {
        backgroundColor: '#ed3237',
        '&:hover': {
          background: "#7f3436",
       },
      },
    
      buttonInfo: {
        backgroundColor: '#0064a6',
        '&:hover': {
          background: "#195493",
       },
      },

    buttonSelecionar: {
    //     backgroundColor: '#1d3724',
    //     '&:hover': {
    //       background: "#4a5442",
    //    }
    },
    formControlContainer: {
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0
    },
    selecionarEfetivoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
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
    }
  }));