import React from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LockIcon from '@material-ui/icons/Lock';
import LightTooltip from '../../utils/toolTip';

export const ActionBtns = ( { rowData, setRowInfo, setOpenAlterKey, handleClickOpen, classes } ) => {

    let id = rowData.id;
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
    
    if( rowData.idOm){

        idOm = rowData.idOm;

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

  export const gerenciarAdminColumn = ( setRowInfo, setOpenAlterKey, handleClickOpen, classes  ) => {

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
                field: 'userName',
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                },
                cellStyle: { 
                    width: '100%', 
                    minWidth: 220,
                    textAlign: 'center',
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 220,
                },
            },
            { 
                title: 'Cpf',
                field: 'cpf',
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                },
                cellStyle: { 
                    width: '100%', 
                    minWidth: 220,
                    textAlign: 'center',
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 200,
                },
            },
    
            { 
                title: 'Om', 
                field: 'nomeOm',
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                },
                cellStyle: { 
                    width: '100%', 
                    minWidth: 220,
                    textAlign: 'center',
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 220,
                },
                renderGraph: true
            },
            {
              title: 'Perfil',
              field: 'perfil',
              renderGraph: true,
              filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                },
                cellStyle: { 
                    width: '100%', 
                    minWidth: 260,
                    textAlign: 'center',
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 260,
                },
            },
    
            // { 
            //     title: 'Senha', 
            //     field: 'senha', 
            //     hidden: true,
            //     filterCellStyle: {
            //         textAlign: 'center',
            //         width: '100%', 
            //     },
            //     cellStyle: { 
            //         width: '100%', 
            //         maxWidth: 400,
            //         textAlign: 'center',
            //     }, 
            //     headerStyle: { 
            //         width: '100%', 
            //         maxWidth: 400,
            //     },
            // },
            { 
                title: 'Nome Completo', 
                field: 'nome',
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                },
                cellStyle: { 
                    width: '100%', 
                    minWidth: 430,
                    textAlign: 'center',
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 430,
                },
            }
        ]
    )

}