import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paperParteDeAcidente:{
    marginTop: 70,
    [theme.breakpoints.down('xs')]: {
      marginTop: 60,
    },
    padding: 10,
    width: '100%',
    maxWidth: 1100
  },
  textAreaCustom:{
    width: '100%',
    padding: 10,
    resize: 'none',
    height: 140
  },
  containerGeral:{
    padding: 0,
    background: '#eeeeee',
    minHeight: '100vh'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: '100%'
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  posAbsolute:{
    position: 'absolute'
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
      marginLeft: theme.spacing(3),
      width: '100%',
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
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    borderBottom: '1.5px solid #d8d3cd'
  },
  clearBtn: {
    position: 'absolute',
  },
  buttonSuccess: {
    backgroundColor: '#1d3724',
    '&:hover': {
      background: "#4a5442",
    },
    containerCadastrarSu: {
    padding: 10,
  },
  },
  buttonInfoIcon:{
    color: '#145374'
  }
}));