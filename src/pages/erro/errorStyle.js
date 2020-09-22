import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    containerError:{
        minHeight: '75vh',
        padding: 20,
    },
    containerGeral: {
        marginTop: 65,
    },
    btnErro: {
        outline: 0,
        letterSpacing: '.5px',
        lineHeight: '35px',
        fontSize: '16px',
        textAlign: 'center',
        borderRadius: '28px',
        cursor: 'pointer',
        border: '2px solid #1d3724',
        backgroundColor: 'transparent',
        color: '#1d3724',
        boxSizing: 'border-box',
        transitionProperty: 'color',
        // transitionDuration: '.2s',
        padding: '0px 20px',
        fontWeight: 800,
        '&:hover': {
            backgroundColor: '#1d3724',
            color: '#fff',
        }
    },
    
    h1Erro: {
        color: '#fff',
        fontSize: '66px',
        letterSpacing: '1px',
        lineHeight: '90px',
    },
    pErro: {
        letterSpacing: '0,5px',
        lineHeight: '39px',
    }
}));