export const styles = theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    containerSubunidades: {
      background: '#eeeeee',
      // padding: 10,
      marginBottom: 5,
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
      height: 35,
      marginLeft: 10,
      marginTop: 15,
      '&:hover': {
        background: "#4a5442",
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
      width: 190,
      // marginTop: 24,
    },
    emLinha: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // marginBottom: 15,
      // padding: '10px 10px 20px 10px',
      background: '#eeeeee',
      
    },
    containerSelecionarSu: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10,
      // marginBottom:10,
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