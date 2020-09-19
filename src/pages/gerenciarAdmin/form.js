import React, { useEffect, forwardRef} from 'react';
import tableIcons from './tableIcons';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import { Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
// ======= services ======= //
import { listarUsuarios, deletarUsuario, editarUsuario, listarPerfis} from '../../components/services/authService';
import { listarOm } from '../../components/services/omServices';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { styles } from './formularioStyles';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import ShowRelatorio from '@lestetelecom/showrelatorio/lib/index';
import { Paper } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckoutPassword from './stepperAlterSenha/checkout';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#222831",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px 8px 12px'
  },
}))(Tooltip);

function Editable( props ) {

    const { useState } = React;
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [openAlterKey, setOpenAlterKey] = React.useState(false);

    const [ rowInfo, setRowInfo] = React.useState(false);

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

    const ActionBtns = ( props ) => {

      let id = '';
      let idOm = '';

      const openDialogAlterPassWord = async () => {
        await setRowInfo( props.rowData )
        setOpenAlterKey(true);
        handleClickOpen();
      }
    
      const openDialog = async () => {
        await setRowInfo( props.rowData )
        handleClickOpen();
      }
    
      id = props.rowData.id;
      
      if( props.rowData.idOm){
    
        idOm = props.rowData.idOm;
    
      }
          
      return (
        <div className="actionBtns" >
    
        <Link to={{pathname: `/EditarAdmin/${id}/${idOm}`}} >
          <LightTooltip title="Editar">
              <IconButton size="small" color="primary"> 
                <EditIcon size="small" className={classes.buttonInfoIcon}/> 
              </IconButton>
          </LightTooltip>
        </Link>
    
          <LightTooltip title="Excluir">
            <IconButton variant="outlined"  size="small" onClick={() => openDialog()}>
                <DeleteForeverIcon className={classes.buttonDangerIcon}/>
            </IconButton>
          </LightTooltip>

          <LightTooltip title="Redefinir senha">
            <IconButton variant="outlined"  size="small" onClick={() => openDialogAlterPassWord()}>
                <LockIcon className={classes.lockIconBtnSm}/>
            </IconButton>
          </LightTooltip>

          

    
        </div>
      )
    }

    const formatUser = ( omList, perfilList) => {

      let userComOm = [];

      omList.map( o => {

        o.usuario.map( user => {

          userComOm.push( Object.assign( user, { idOm: o.id, nomeOm: o.nomeAbrev }) );

        })

      })

      perfilList.map( (p, i) => {
        
        userComOm.map( user => {

          if( p.id === user.id ){
            perfilList[i] = user
          }
        })

      })

      return userComOm;

    }
    const inicializarForm = async () => {
  
      let perfilList = await listarUsuarios();
      let omList = await listarOm();
      
      formatUser( omList, perfilList );
      
      console.log(perfilList)
      // perfilList.splice(0,2)
      
      let colunas = [

        { 
          title: 'Ações',
          render: rowData => <ActionBtns rowData={rowData}/>
        },

        { title: 'Nome de usuario', field: 'userName'},
        { title: 'Cpf', field: 'cpf'},

        { 
          title: 'Om', 
          field: 'nomeOm', 
          
        },
        {
          title: 'Perfil',
          field: 'perfil',
          renderGraph: true
        },

        { title: 'Senha', 
          field: 'senha', 
          hidden: true
        },
        { title: 'Nome Completo', field: 'nome'}
      ]

      setData(perfilList);

      setColumns(colunas);

    }

    useEffect(() => {

      inicializarForm();
        
    }, []);

    const excluirUsuario = async ( ) => {
      
      let userId = rowInfo.id;

      await deletarUsuario(userId);

      let info = {
        severityType: 'error',
        type: 'user', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      window.location.reload();

    }

    const { classes } = props;


    return (
      <>
        {columns.lenght === 0 ? '' : 
        <>

          <Paper className={classes.paperContainerCadastrar}>
              <Link to="/CadastrarUserAdmin" style={{textDecoration: 'none'}}>
                  <Button startIcon={<AddBoxIcon />} className={classes.buttonSuccess}  variant="contained" color="primary">Cadastrar</Button>
              </Link>
          </Paper>

          {data.length > 0 && columns.length > 0 && <ShowRelatorio relatorio={data} customColumns={columns}/>}
          
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
              :

              rowInfo && <CheckoutPassword rowInfo={rowInfo} handleClose={handleClose.bind(this)}/>


                // <Paper className={classes.alterPassWordContainer} >
                //   <Grid container spacing={2}>
                //     <Grid item xs={12}>
                //       <Grid container direction="column" alignItems="flex-start" justify="center">
                      
                //       <Grid container direction="row" alignItems="flex-start" justify="center">
                //         <Paper style={{margin: '5px 0px', padding: 10, background: '#eeeeee', width: '100%', textAlign: 'center'}}>
                //           <Typography component="h2" variant="h4">
                //               Alterar Senha
                //           </Typography>

                //         </Paper>
                //       </Grid>

                //       <Grid style={{margin: '5px 0px', padding: 10,width: '100%'}}>
                //           <Typography component="h2" variant="body2">
                //               Deseja alterar a senha de <strong>CB_Mesquita</strong>?
                //         </Typography>
                //       </Grid>

                //       <Grid container direction="row" alignItems="center" justify="center">
                //         <Button variant="contained" color="default" >Sim</Button>
                //       </Grid>

                //       {/* <Grid container alignItems="center" justify="center">
                //         <Alert icon={false} severity="warning" style={{width: '100%', textAlign: 'center'}}>
                //           <Typography component="h4" variant="body2">
                //             Digite a senha do Administrador.
                //           </Typography>
                //         </Alert>
                //       </Grid> */}
                        
                //       <Grid container style={{margin: '10px 0px'}} direction="column" alignItems="center" justify="center">
                //         <TextField
                        
                //           variant="outlined"
                //           margin="normal"
                //           required
                //           fullWidth
                //           name="senha"
                //           label="Senha de administrador"
                //           InputProps={{
                //           startAdornment: (
                //               <InputAdornment position="start">
                //               <LockIcon />
                //               </InputAdornment>
                //           ),
                //           }}
                //           type="password"

                //         />
                //       </Grid>
                        

                //       </Grid>
                //       <Grid container direction="row" alignItems="center" justify="center">
                //         <Button variant="contained" color="default" >Verificar</Button>
                //       </Grid>


                //     </Grid>
                //   </Grid>
                // </Paper>

              }
              </Dialog>
            }
          </>
        }
      </>
    )
  }

export default withStyles(styles)(Editable);
