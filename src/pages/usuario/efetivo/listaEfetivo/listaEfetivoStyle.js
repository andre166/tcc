import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles( theme => ({
    buttonSuccess: {
        backgroundColor: '#1d3724 !important',
        '&:hover': {
            background: "#4a5442 !important",
        },
    },
    container: {
        marginTop: 60, 
        background: '#fff', 
        width: 'calc( 100vw - 240px )', 
        height: 'calc( 100vh - 60px )',

        [theme.breakpoints.down('sm')]: {
            width: '100vw'
        },
    },
    paperContainerCadastrar:{
        padding: 10,
        marginBottom:5,
        background: '#fff'
    },
    firstRow: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginTop: 0,
        marginLeft: 15,
        width: '100%',
        maxWidth: 250,
    },
    menu: {
        width: 200,
    },
   

    buttonDanger: {
        backgroundColor: '#ed3237',
        height: 35,
        marginLeft: 0,
        '&:hover': {
            background: "#7f3436",
        },
    },

    buttonInfo: {
        backgroundColor: '#0064a6',
        height: 35,
        marginLeft: 10,
        marginTop: 30,
        '&:hover': {
            background: "#195493",
        },
    },
    lockIconBtnSm: {
        backgroundColor: '#fefefe',
        '&:hover': {
            background: "#eeeeee",
        },
    },
    alterPassWordContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        width: 400,
        height: 400,
        padding: 10
    },
    teste: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
        maxWidth: 230,
        marginTop: 20,
    },
    emLinha: {
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'row',
    },
    divider: {
        marginTop: 30,
        marginBottom: 30,
    },
    area: {
        minHeight: 140,
    },
    buttonInfoIcon:{
        color: '#145374'
    },
      buttonDangerSm: {
        backgroundColor: '#ed3237',
        '&:hover': {
          background: "#7f3436",
       },
    },
    buttonDangerIcon:{
      color: '#ed3237'
    },
  }));