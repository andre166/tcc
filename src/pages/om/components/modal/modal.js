import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { deletarOm } from '../../../../components/services/omServices';
import Divider from '@material-ui/core/Divider';
import { useHistory} from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import LightTooltip from '../../../../utils/toolTip';
import { useStyles } from './modalStyles';

function SimpleDialogWrapped( props ){

  const history = useHistory();

  const { onClose, selectedValue, open, token } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const excluir = async ( id ) => {

    await deletarOm( id, token );

    let info = {
      severityType: 'error',
      type: 'om', 
    }

    localStorage.setItem("snackBarAlert", JSON.stringify(info));

    if(props.btnModalType == 'edit'){
      history.push('/Om');
    }else{
      window.location.reload();
    }

  }
  const classes = useStyles();
 

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >

        <div className={classes.modal}>

          <DialogTitle id="simple-dialog-title">Deseja excluir <strong>{props.om.nomeOm}</strong> {props.om.nomeAbrev && `(${props.om.nomeAbrev})`} ?</DialogTitle>

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
          om={props.om}
          open={open}
          onClose={handleClose}
          token={props.token}
          btnModalType={props.btnModalType}
        />
      </div>
    );
}