import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'rowm',
    justifyContent: 'space-around',
    marginTop: 20
  },
  button: {
    fontSize: 12,
    padding: 4,
  },
  modal: {
    maxWidth: 500,
   padding: "10px 15px 20px 15px",
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#eeeeee',
    padding: '10px 10px 15px 10px',
  },
  gridList: {
    width: '100%',
    height: '100%',
    maxHeight: 500,
  },
  posAbsolute:{
    position: 'absolute'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    borderBottom: '1.5px solid #d8d3cd'
  },
  clearBtn: {
    position: 'absolute',
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
  containerCadastrarSu: {
    padding: 10,
  },
  buttonDanger: {
    backgroundColor: '#ed3237',
    height: 35,
    margin: '15px 0px 10px 0px',
    '&:hover': {
      background: "#7f3436",
   },
},
  buttonSuccessSm: {
    backgroundColor: '#1d3724',
    '&:hover': {
        background: "#4a5442",
    }
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