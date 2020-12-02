import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    containerPrincipal: {
        marginTop: 60,
        height: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        background: '#eeeeee',
        flexDirection: 'column'
    },
    root: {
        width: '100%',
        maxWidth: 360,
        marginTop: 5
    },
    buttonSuccess: {
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       },
    },

}));