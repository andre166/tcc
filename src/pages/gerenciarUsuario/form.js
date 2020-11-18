import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link} from 'react-router-dom';
import { deleteUser, getUserOm, listUserComSu } from '../../components/services/usuarioService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { styles } from './formularioStyles';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ShowRelatorio from 'material-table';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckoutPassword from '../gerenciarAdmin/stepperAlterSenha/checkout';
import { getUserId } from '../../components/services/localStorgeService';
import { gerenciarUsuarioColumn } from '../../utils/columns/gerenciarUsuarioColuna';
import { maskCpf } from '../../utils/maskAndValidators/cpf';
import { masckPerfil } from '../../utils/maskAndValidators/perfil';

function Editable( props ) {

  const { classes } = props;
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlterKey, setOpenAlterKey] = useState(false);
  const [ rowInfo, setRowInfo] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setOpenAlterKey(false);
        resolve();
      }, 100);
    })
  };

  const formatUser = ( perfilList ) => {

    let userComOm = [];

    perfilList.map( (p, i) => {

      if( !p.nomeOm){
        p.cpf = maskCpf(p.cpf);
        p.perfil = masckPerfil(p.perfil);
      }
      
      userComOm.map( user => {

        if( p.id === user.id ){
          user.cpf = maskCpf(user.cpf);
          user.perfil = masckPerfil(user.perfil);
          perfilList[i] = user
        }
      })

    })

    return userComOm;

  }

    const inicializarForm = async () => {

      let userPerfil = getUserId();
  
      let userOm = await getUserOm( userPerfil );

      let perfilList = await listUserComSu(userOm.id);

      formatUser(perfilList);

      let columnList = gerenciarUsuarioColumn( setRowInfo, setOpenAlterKey, handleClickOpen, classes );
      
      setData(perfilList);

      setColumns(columnList);

    }

    useEffect(() => {

      inicializarForm();
        
    }, []);

    const excluirUsuario = async ( ) => {
      
      let userId = rowInfo.userId;

      await deleteUser(userId);

      let info = {
        severityType: 'error',
        type: 'user', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      window.location.reload();

    }

    return (
      <>
        {columns.lenght === 0 ? '' : 
        <>

          <div className={classes.paperContainerCadastrar}>
              <Link to="/CadastrarUsuario" style={{textDecoration: 'none'}}>
                  <Button startIcon={<AddBoxIcon />} className={classes.buttonSuccess}  variant="contained" color="primary">Cadastrar</Button>
              </Link>
          </div>

          {data.length > 0 && columns.length > 0 && 
            <div className={classes.tabelaContainer}>
              <ShowRelatorio relatorio={data} customColumns={columns}/>
            </div>
          }
          
            {rowInfo &&
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{overflow: 'hidden'}}
              >
              { openAlterKey == false ?
                <>
                  <DialogTitle id="alert-dialog-title">{`Deseja excluir ${rowInfo.userName} ?`}</DialogTitle>
                  
                  <Divider style={{marginBottom: 10}}/>
                
                  <DialogActions style={{justifyContent: 'center', marginBottom: 5}}>
                    <Button className={classes.buttonSuccess} onClick={excluirUsuario} color="primary" variant="contained">
                      Sim
                    </Button>
                    <Button className={classes.buttonDanger} onClick={handleClose} color="primary" variant="contained" autoFocus>
                      não
                    </Button>
                  </DialogActions>
                  
                </>
              : //Dialog para redefinir senha

              rowInfo && <CheckoutPassword rowInfo={rowInfo} handleClose={handleClose.bind(this)}/>

              }
              </Dialog>
            }
          </>
        }
      </>
    )
  }

export default withStyles(styles)(Editable);