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
  
    id = rowData.userId;
    
    if( rowData.idOm){
  
      idOm = rowData.idOm;
  
    }


    if( rowData.perfil == 'Administrador' ){
      return(
        <div className="actionBtns" >
  
          <IconButton disabled={ rowData.perfil == 'Administrador' ? true : false } size="small" color="primary" className={classes.buttonInfoIcon}> 
            <EditIcon size="small" /> 
          </IconButton>
  
          <IconButton disabled={ rowData.perfil == 'Administrador' ? true : false } variant="outlined"  size="small" onClick={() => openDialog()}>
              <DeleteForeverIcon  className={ rowData.perfil !== 'Administrador' && classes.buttonDangerIcon} />
          </IconButton>

          <IconButton disabled={ rowData.perfil == 'Administrador' ? true : false } variant="outlined"  size="small" onClick={() => openDialogAlterPassWord()} className={classes.lockIconBtnSm}>
              <LockIcon />
          </IconButton>
  
        </div>
      )
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
              <DeleteForeverIcon  className={classes.buttonDangerIcon} />
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
                />,
                cellStyle: { 
                  padding: 6,
              }, 
            },
            { 
                title: 'Nome de usuario', 
                field: 'userName',
                cellStyle: { 
                  width: '100%',
                  padding: 6, 
                  minWidth: 250,
                  maxWidth: 400,
                  textAlign: 'center',
              }, 
              headerStyle: { 
                  width: '100%', 
                  minWidth: 250,
                  maxWidth: 400,
              },
              filterCellStyle: {
                  textAlign: 'center',
                  width: '100%', 
              }
            },
            { 
              title: 'Subunidade', 
              field: 'nomeSu',
              renderGraph: true,
              cellStyle: { 
                width: '100%', 
                minWidth: 250,
                textAlign: 'center',
            }, 
            headerStyle: { 
                width: '100%', 
                minWidth: 250,
            },
            filterCellStyle: {
                textAlign: 'center',
                width: '100%', 
            }
          },
            { 
                title: 'Cpf', 
                field: 'cpf',
                cellStyle: { 
                  width: '100%',
                  padding: 6, 
                  minWidth: 250,
                  textAlign: 'center',
              }, 
              headerStyle: { 
                  width: '100%', 
                  minWidth: 250,
              },
              filterCellStyle: {
                  textAlign: 'center',
                  width: '100%', 
              }
            },
            {
                title: 'Perfil',
                field: 'perfil',
                lookup: {
                  'Administrador': 'Administrador',
                  'Chefe Informática': 'Chefe Informática',
                  'Brigada': 'Brigada',
                  'Sargenteante': 'Sargenteante',
                  'Aux sgte justiça': 'Aux sgte justiça',
                  'Aux sgte saúde': 'Aux sgte saúde',
                },
                renderGraph: true,
                cellStyle: { 
                  width: '100%',
                  padding: 6, 
                  minWidth: 250,
                  textAlign: 'center',
              }, 
              headerStyle: { 
                  width: '100%', 
                  minWidth: 250,
              },
              filterCellStyle: {
                  textAlign: 'center',
                  width: '100%', 
              }
            },
        
            {   
                title: 'Senha', 
                field: 'senha', 
                hidden: true,
            },
            {   
                title: 'Nome Completo', 
                field: 'nome',
                cellStyle: { 
                  width: '100%',
                  padding: 6, 
                  minWidth: 600,
                  textAlign: 'center',
              }, 
              headerStyle: { 
                  width: '100%', 
                  minWidth: 600,
              },
              filterCellStyle: {
                  textAlign: 'center',
                  width: '100%', 
              }
            }
        ]

    )

}