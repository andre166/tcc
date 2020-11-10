import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    
    root: {
        "& .MuiCardContent-root": {
            padding: '10px 20px 0px 20px',
        },
        borderLeft: '6px solid #335d2d',
        width:'96%',
        height: '98%',
        minHeight: 180
    },
    title: {
        color: '#519872',
        letterSpacing: '0,5px',
    },
    rootContentActions: {
        paddingBottom: 12
    }

}));