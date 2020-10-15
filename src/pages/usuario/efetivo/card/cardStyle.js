import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    
    root: {
        "& .MuiCardContent-root": {
            padding: '10px 20px 0px 20px',
        },
        borderLeft: '6px solid #335d2d',
        width:'100%',
        [theme.breakpoints.down('sm')]: {
            height: '100%',
            minHeight: 200,
        },
        [theme.breakpoints.down('lg')]: {
            height: '100%',
            minHeight: 165,
        },
        [theme.breakpoints.down('xl')]: {
            height: "99%",
            minHeight: 200,
        },
    },
    title: {
        color: '#519872',
        letterSpacing: '0,5px',
    },
    rootContentActions: {
        paddingBottom: 12
    }

}));