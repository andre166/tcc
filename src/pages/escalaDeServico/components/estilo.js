import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
      },
      search: {
        zIndex: 10,
        marginTop: 2,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        color: '#000000',
        backgroundColor: '#fff',
        '&:hover': {
          filter: 'brightness(92%)',
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        maxWidth: 183
      },
      searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(0.5, 0.3, 0.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
      },
    activeForService: {
        cursor: 'pointer',
        background: '#1b262c',
        color: '#fff',
        margin: '2px 4px',
        width: 35,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 0px',
        borderRadius: 2,
        '&:hover': {
            filter: 'brightness(90%)'
        },
        fontSize: '9pt',
    },
    containerPrincipal: {
        marginTop: 60,
        height: '100%',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        background: '#eeeeee',
        flexDirection: 'column'
    },
    root: {
        width: '100%',
        // marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        height: '100%',
    },
    namesColumn: {
        width: 120,
        background: '#4b5d67',
        padding: 10,
        color: '#fff',
        fontSize: '8pt',
        letterSpacing: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradColumn: {
        width: 90,
        background: '#0f3460',
        padding: 10,
        color: '#fff',
        fontSize: '8pt',
        letterSpacing: 1,
        display: 'flex',
    },
    calendarioRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    dias:{
        cursor: 'pointer',
        background: '#eeeded',
        margin: '2px 4px',
        width: 35,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 0px',
        borderRadius: 2,
        '&:hover': {
            filter: 'brightness(90%)'
        },
        fontSize: '9pt',

    },
    cabecalho: {
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        position: 'absolute',
        
    },  
    diasDaSemanaHeader: {
        background: '#D1D1D1',
        margin: '2px 4px',
        width: 35,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        flexDirection: 'column',
        fontSize: '8pt',
    },
    diasDaSemanaHeaderFeriado: {
        background: '#be2000',
        color: '#fff',
        margin: '2px 4px',
        width: 35,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        flexDirection: 'column',
        fontSize: '8pt',
    },
    diasDaSemanaFeriado: {
        cursor: 'pointer',
        background: '#be2000',
        color: '#fff',
        margin: '2px 4px',
        width: 35,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 0px',
        borderRadius: 2,
        '&:hover': {
            filter: 'brightness(90%)'
        },
        fontSize: '8pt',
        
    },
    serviceForecast: {
        cursor: 'pointer',
        background: '#bedbbb',
        color: '#158467',
        margin: '2px 4px',
        width: 35,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 0px',
        borderRadius: 2,
        '&:hover': {
            filter: 'brightness(90%)'
        },
        fontSize: '8pt',
        border: '1px solid green'
    },
    isService: {
        cursor: 'pointer',
        background: '#59886b',
        color: '#fff',
        margin: '2px 4px',
        width: 35,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 0px',
        borderRadius: 2,
        '&:hover': {
            filter: 'brightness(90%)'
        },
        fontSize: '8pt',
    },
    teste: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        position: 'relative'
        
    },
    calendario: {
        // display: 'flex',
        // flexDirection: 'column',
        height: 600,
        width: 1550,
        // flexWrap: 'nowrap'
    },
    calendario2: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttonSuccess: {
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       },
    },

}));