export const styles = theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      // padding: 5
    },
    containerSubunidades: {
      background: '#fff',
      // marginBottom: 5,
      height: '100%',
    },
    firstRow: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      marginTop: 0,
      marginLeft: 15,
      marginRight: theme.spacing.unit,
      width: 270,
    },
    menu: {
      width: 200,
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      '&:hover': {
        background: "#4a5442",
     },
     [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
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
      marginTop: 15,
      '&:hover': {
        background: "#195493",
     },
    },
    
    teste: {
      fontSize: 16,
      fontWeight: 'bold',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        display: 'none'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    emLinha: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#eeeeee',
      
    },
    containerSelecionarSu: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 58,
      padding: 10,
      background: '#fff'

    },
    divider: {
      marginTop: 10,
      marginBottom: 10,
    },
    helpIcon_idiomas: {
      cursor: 'pointer',
      fontSize: '17pt',
      marginLeft: 5,
    },
    containerCadastrarSu: {
      padding: 10,
    },
  });