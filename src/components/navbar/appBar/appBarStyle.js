import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#1d3724',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    '&:hover': {
      color: '#dddddd !important',
    }
  },
  grow: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14
    },
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
  accountMenuBtn: {
    padding: '2px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '10pt',
    textTransform: 'uppercase',
  },
  xsFont14:{
    fontSize: 20
  }

}));
export default useStyles;