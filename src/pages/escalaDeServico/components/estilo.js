import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
        height: 'calc(100vh - 60px)',
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
        width: 60,
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
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6
        
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
        width: 1530,
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