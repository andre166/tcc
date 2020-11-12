import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles( theme => ({
    buttonSuccess: {
        backgroundColor: '#1d3724 !important',
        '&:hover': {
            background: "#4a5442 !important",
        },
    },
    container: {
        marginTop: 50, 
        backgroundImage: 'linear-gradient(135deg, rgba(159, 159, 159, 0.46) 0%, rgba(159, 159, 159, 0.46) 14.286%,rgba(165, 165, 165, 0.46) 14.286%, rgba(165, 165, 165, 0.46) 28.572%,rgba(171, 171, 171, 0.46) 28.572%, rgba(171, 171, 171, 0.46) 42.858%,rgba(178, 178, 178, 0.46) 42.858%, rgba(178, 178, 178, 0.46) 57.144%,rgba(184, 184, 184, 0.46) 57.144%, rgba(184, 184, 184, 0.46) 71.43%,rgba(190, 190, 190, 0.46) 71.43%, rgba(190, 190, 190, 0.46) 85.716%,rgba(196, 196, 196, 0.46) 85.716%, rgba(196, 196, 196, 0.46) 100.002%),linear-gradient(45deg, rgb(252, 252, 252) 0%, rgb(252, 252, 252) 14.286%,rgb(246, 246, 246) 14.286%, rgb(246, 246, 246) 28.572%,rgb(241, 241, 241) 28.572%, rgb(241, 241, 241) 42.858%,rgb(235, 235, 235) 42.858%, rgb(235, 235, 235) 57.144%,rgb(229, 229, 229) 57.144%, rgb(229, 229, 229) 71.43%,rgb(224, 224, 224) 71.43%, rgb(224, 224, 224) 85.716%,rgb(218, 218, 218) 85.716%, rgb(218, 218, 218) 100.002%)',
        width: 'calc( 100vw - 240px )', 
        height: 'calc( 100vh - 60px )',

        [theme.breakpoints.down('sm')]: {
            width: '100vw'
        },
        padding: 10
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