import React from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LightTooltip from '../../utils/toolTip';
import Modal from '../../pages/subunidade/components/formulario/tableCard/components/modal/modal';

export const ActionBtns = ( { rowData, setRowInfo, setOpenAlterKey, handleClickOpen, classes, omParaVincular } ) => {

    let idOm = '';

    console.log("rowData", rowData)
    
    if( rowData.idOm){

        idOm = rowData.idOm;

    }

    return (   

        <div className="actionBtns" >

            <Modal om={ rowData } btnTable={true} omParaVincular={omParaVincular}/>

            <Link to={{pathname: `/EditarSubunidade/${rowData.id}/${omParaVincular.id}`}} style={{textDecoration: 'none'}}>
            <LightTooltip title="Editar" size="small">
              <IconButton color="primary" aria-label="upload picture" component="span"> 
                <EditIcon size="small" className={classes.buttonInfoIcon}/> 
              </IconButton>
            </LightTooltip>
          </Link>
      

        </div>
    )

}

export const colunaSubunidade = ( classes, omParaVincular  ) => {

        return ( 
            [
                { 
                    title: 'Ações',
                    render: rowData => <ActionBtns rowData={rowData} classes={classes} omParaVincular={omParaVincular}/>,
                    cellStyle: { 
                        padding: 8,
                    }, 
                },

                { 
                    title: 'Nome Completo', 
                    field: 'nomeCompleto', 
                    type: 'string', 
                    renderGraph: false,
                    cellStyle: { 
                        width: '100%',
                        padding: 0, 
                        maxWidth: 300,
                        textAlign: 'center',
                    }, 
                    headerStyle: { 
                        width: '100%', 
                        maxWidth: 300,
                    },
                    filterCellStyle: {
                        textAlign: 'center',
                        width: '100%', 
                    }
                },
                { 
                    title: 'Nome Abreviado', 
                    field: 'nomeSubunidade', 
                    type: 'string', 
                    renderGraph: false,
                    cellStyle: { 
                        width: '100%',
                        padding: 0, 
                        minWidth: 180,
                        textAlign: 'center'
                    }, 
                    headerStyle: { 
                        width: '100%', 
                        // minWidth: 180,
                        textAlign: 'center'
                    }
                },
                
            ]
        )
}

// ====================================== CIDADAO

