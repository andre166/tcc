import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        // paddingBottom: 5,
        borderLeft: '6px solid #335d2d',
        margin: '5px 0px',
        width:'100%',
        height: 200,
        cursor: 'pointer',
        transition: 'filter 300ms',
        '&:hover': {
            filter: 'brightness(93%)'
        },
        [theme.breakpoints.down('sm')]: {
            height: 200,
        },
        [theme.breakpoints.down('lg')]: {
            height: 180,
        },
    },
    title: {
        color: '#519872',
        letterSpacing: '0,5px',
    },

}));