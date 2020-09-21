import React from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LockIcon from '@material-ui/icons/Lock';
import LightTooltip from '../../utils/toolTip';

export const ActionBtns = ( { rowData, setRowInfo, setOpenAlterKey, handleClickOpen, classes } ) => {

    let id = '';
    let idOm = '';

    const openDialogAlterPassWord = async () => {
      await setRowInfo( rowData )
      setOpenAlterKey(true);
      handleClickOpen();
    }
  
    const openDialog = async () => {
      await setRowInfo( rowData )
      handleClickOpen();
    }
  
    id = rowData.id;
    
    if( rowData.idOm){
  
      idOm = rowData.idOm;
  
    }
        
    return (
      <div className="actionBtns" >
  
        <Link to={{pathname: `/EditarUsuario/${id}/${idOm}`}} >
          <LightTooltip title="Editar">
              <IconButton size="small" color="primary" className={classes.buttonInfoIcon}> 
                <EditIcon size="small" /> 
              </IconButton>
          </LightTooltip>
        </Link>
  
        <LightTooltip title="Excluir">
          <IconButton variant="outlined"  size="small" onClick={() => openDialog()}>
              <DeleteForeverIcon className={classes.buttonDangerIcon} />
          </IconButton>
        </LightTooltip>

        <LightTooltip title="Redefinir senha">
          <IconButton variant="outlined"  size="small" onClick={() => openDialogAlterPassWord()} className={classes.lockIconBtnSm}>
              <LockIcon />
          </IconButton>
        </LightTooltip>
  
      </div>
    )
}


export const gerenciarUsuarioColumn = ( setRowInfo, setOpenAlterKey, handleClickOpen, classes  ) => {


    return (

        [ 
    
            { 
                title: 'Ações',
                render: rowData => <ActionBtns 
                    rowData={rowData} classes={classes} setRowInfo={setRowInfo} setOpenAlterKey={setOpenAlterKey} handleClickOpen={handleClickOpen}
                />
            },
            { 
                title: 'Nome de usuario', 
                field: 'userName'
            },
            { 
                title: 'Cpf', 
                field: 'cpf'
            },
        
            { 
                title: 'Om', 
                field: 'nomeOm', 
                renderGraph: true
            },
            {
                title: 'Perfil',
                field: 'perfil',
                renderGraph: true
            },
        
            {   
                title: 'Senha', 
                field: 'senha', 
                hidden: true
            },
            {   
                title: 'Nome Completo', 
                field: 'nome'
            }
        ]

    )

}