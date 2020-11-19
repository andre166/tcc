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

      </div>
    )
  }

export const omColumns = ( classes  ) => {


    return (

        [

            { 
                title: 'Ações',
                render: rowData => <ActionBtns rowData={rowData} classes={classes}/>,
                cellStyle: { 
                    padding: 8,
                }, 
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
                    minWidth: 'max-content',
                    padding: 0,
                }, 
                headerStyle: { 
                    width: '100%', 
                    textAlign: 'center',
                    minWidth: 280
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%',
                    minWidth: 280 
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
                    padding: 0,
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
                    textAlign: 'center',
                    padding: 0,
                }, 
                headerStyle: { 
                    width: '100%', 
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
                    textAlign: 'center',
                    minWidth: 150,
                    padding: 0,
                }, 
                headerStyle: { 
                    width: '100%', 
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%',
                    minWidth: 230 
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
                    textAlign: 'center',
                    padding: 0,
                }, 
                headerStyle: { 
                    width: '100%', 
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%',
                    minWidth: 230 
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
                    textAlign: 'center',
                    padding: 0,
                }, 
                headerStyle: { 
                    width: '100%', 
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%',
                    minWidth: 180
                }
            }
        ]
    )
}
