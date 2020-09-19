import amber from '@material-ui/core/colors/amber';


const styles = theme => ({
    root: {
      width: 'max-content',
      minWidth: 150,
      backgroundColor: '#4b5d67',
      position: 'relative',
      overflowX: 'hidden',
      height: '100%',
    },
    listSection: {
      letterSpacing: '1px',
      color:'#fff !important',
    },
    grafico:{
      position: 'relative',
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      height: '100%',
    
    },
    divModal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100% !important',
      minWidth: '620px',
      height: '650px !important',
    },
    errorDiv: {
      marginTop: 5,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      maxWidth: 400,
      borderRadius: 3,
      padding: 5,
      backgroundColor: amber[700],
      color: '#fff'
    }
    
  });

  export default styles;