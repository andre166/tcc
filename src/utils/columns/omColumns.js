import React from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import LightTooltip from '../../utils/toolTip';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Modal from '../../pages/om/components/modal/modal';

const ActionBtns = ( { rowData, classes } ) => {
      
    return (
      <div className="actionBtns" >

        <Link to={{pathname: `/EditarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
            <LightTooltip title="Editar" size="small">
                <IconButton color="primary" component="span"> 
                    <EditIcon size="small" className={classes.buttonInfoIcon}/> 
                </IconButton>
            </LightTooltip>
        </Link>
    
        <Modal om={ rowData } btnTable={true}/>

        <Link to={{pathname: `/VerificarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
            <LightTooltip title="Detalhar OM">
                <IconButton size="small" aria-label="delete" ><FindInPageIcon/></IconButton>
            </LightTooltip>
        </Link>

      </div>
    )
  }

export const omColumns = ( classes  ) => {


    return (

        [

            { 
                title: 'Ações',
                render: rowData => <ActionBtns rowData={rowData} classes={classes}/>
            },
            { 
                title: 'OM', 
                field: 'nomeOm', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    textAlign: 'center',
                    alignItems: 'center',
                    minWidth: 'max-content'
                }, 
                headerStyle: { 
                    width: '100%', 
                    textAlign: 'center',
                    minWidth: 280
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                }
                
            },
            { 
                title: 'Nome Abreviado', 
                field: 'nomeAbrev', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    textAlign: 'center',
                    alignItems: 'center',
                }, 
                headerStyle: { 
                    width: '100%', 
                    textAlign: 'center',
                },
            },
            { 
                title: 'Subunidade', 
                field: 'subunidades.length', 
                type: 'numeric', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    // minWidth: 300,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    // minWidth: 300,
                    textAlign: 'center'
                }
            },
            { 
                title: 'Usuario', 
                field: 'usuario.length', 
                type: 'numeric', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    // minWidth: 180,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    // minWidth: 180,
                    textAlign: 'center'
                }
            },
            { 
                title: 'CNPJ', 
                field: 'cnpj', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 230,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    // minWidth: 180,
                    textAlign: 'center'
                }
            },
            { 
                title: 'CEP', 
                field: 'cep', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 180,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    // minWidth: 180,
                    textAlign: 'center'
                }
            }
        ]
    )
}
