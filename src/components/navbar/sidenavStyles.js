import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  active: {
    // borderLeft: '6px solid #1d3724',
    // background: '#bfdcae',
    backgroundImage: 'linear-gradient(to left, #bfdcae 97%, #1d3724 3%)',
    transition: 'filter 300ms',
    '&:hover': {
      backgroundColor: '#bfdcae !important',
      color: '#1d3724 !important',
    }
   
  },
  root: {
    width: '100% !important',
    height:'100% !important',
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#bdbfc1',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    width: '100%',
    height:'100% !important',
  },
  mainContent: {
    width: '100%',
    padding: 0,
    marginLeft: 0,
    minWidth: 330, 
    height: 'calc(100vh - 65px)',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    height: '100% !important',
  },
  link: {
    textDecoration: 'none !important',
    color: '#1d3724 !important',
    letterSpacing: 1,
    '& teste': {
      color: 'red !important',
      backgroundColor: 'red !important',

    },
    '&:hover': {
      backgroundColor: '#1d3724 !important',
      color: '#fff !important',
    }
  },
  linkIcon:{
    textDecoration: 'none !important',
    color: '#1d3724 !important',
    letterSpacing: 1,
    '&:hover': {
      backgroundColor: '#1d3724 !important',
      color: '#fff !important',
    }
  },
  nomeUsuarioContainer: {
    height: '100% !important',
    minHeight: '100px',
  },
  nomeUsuario:{
    padding: '10px',
  },
  nomeUsuarioLabel:{
    fontSize: '12pt',
    marginBottom: 5,
  },
  btnExit:{
    fontSize: '25pt !important',
    cursor: 'pointer',
  },
  grow: {
    flexGrow: 1,
  },
  nomeUsuarioContainer: {
    height: '100% !important',
    minHeight: '100px',
  },
  menuButtonTeste: {
    marginRight: theme.spacing(2),
    color: '#fff',
    '&:hover': {
      color: '#dddddd !important',
    }
  },
  adminTextSidenav: {
    padding: 8,
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selec:{

    backgroundColor: '#1d3724 !important',
    color: '#fff !important',
    
  }
}));
export default useStyles;