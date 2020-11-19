import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { deletarSubunidade } from '../../../../../../../components/services/subunidadeService';
import { styles } from './modalStyles';
import Divider from '@material-ui/core/Divider';
import { useParams, useHistory} from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#222831",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px 8px 12px'
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
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

function SimpleDialogWrapped( props ){

  const classes = useStyles();
  const history = useHistory();
  const idParams = useParams();
  const { onClose, selectedValue, open, token } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };


  const excluir = async ( _id ) => {

    let p = idParams.id;

    await deletarSubunidade( _id, token );

    let info = {
      severityType: 'error',
      type: 'subunidade', 
    }

    localStorage.setItem("snackBarAlert", JSON.stringify(info));

    let response = JSON.parse(localStorage.getItem("userInfo"));

    let userPerfil = response.perfil;

    if(props.btnModalType == 'edit' && userPerfil == 'ROLE_ADMIN'){
      history.push(`/Subunidade/${props.omParaVincular.id}`);
    }else if(p && userPerfil == 'ROLE_ADMIN'){
      window.location.assign(`/Subunidade/${props.omParaVincular.id}`);
    }else if( props.btnModalType == 'edit' && userPerfil !== 'ROLE_ADMIN'){
      history.push(`/Subunidade`);
    }else if( props.btnModalType !== 'edit' && userPerfil !== 'ROLE_ADMIN' ){
      window.location.reload();
    }

  }
 

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >

        <div className={classes.modal}>

          <DialogTitle id="simple-dialog-title">Deseja excluir <strong>{props.om.nomeCompleto}</strong> {props.om.nomeSubunidade && `(${props.om.nomeSubunidade})`} ?</DialogTitle>

        <Divider style={{margin: "5px 0px 10px 0px"}}/>

          <div className={classes.buttonContainer}>
            <Button variant="contained" id="BtnExcluir" color="primary" className={classes.buttonSuccessSm} onClick={() => excluir(props.om.id)}>sim</Button>
            <Button variant="contained" color="secondary" onClick={handleListItemClick} className={classes.buttonDangerSm}>Não</Button>
            
          </div>

        </div>
    </Dialog>
  );

}

export default function SimpleDialogDemo( props ){

  let [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const classes = useStyles();

    return (
      <div>

        {props.btnModalType &&
          <Button variant="contained" color="primary" className={classes.buttonDanger} onClick={handleClickOpen} >
            Excluir
          </Button>
        }

        {props.btnCard &&
          <Button variant="outlined" color="secondary" size="small" onClick={handleClickOpen}>
            Excluir
          </Button>
        }

        {props.btnTable &&
          <LightTooltip title="Excluir">
            <IconButton variant="outlined"  size="small" onClick={handleClickOpen}>
              <DeleteForeverIcon className={classes.buttonDangerIcon}/>
            </IconButton>
          </LightTooltip>

        }


        <SimpleDialogWrapped
          omParaVincular={props.omParaVincular}
          om={props.om}
          open={open}
          onClose={handleClose}
          token={props.token}
          btnModalType={props.btnModalType}
        />
      </div>
    );
}