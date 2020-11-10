import React from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LightTooltip from '../../utils/toolTip';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const ActionBtns = ( { rowData, setRowInfo, setOpenAlterKey, handleClickOpen, classes } ) => {

    let id = rowData.id;
    let idOm = '';

    const openDialog = async () => {
        await setRowInfo( rowData )
        handleClickOpen();
    }
    
    if( rowData.idOm){

        idOm = rowData.idOm;

    }
          
    return (

        <div className="actionBtns" >

            <Link to={{pathname: `/EditarMilitar/${id}`}} >
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

            <LightTooltip title="Detalhar Militar">
                <Link to={{pathname: `/VerificarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
                    <LightTooltip title="Detalhar OM">
                        <IconButton size="small" aria-label="delete" ><FindInPageIcon/></IconButton>
                    </LightTooltip>
                </Link>
            </LightTooltip>

            <LightTooltip title="Alterar Status">
                <Link to={{pathname: `/VerificarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
                    <LightTooltip title="Detalhar OM">
                        <IconButton size="small" aria-label="delete" ><AssignmentIcon/></IconButton>
                    </LightTooltip>
                </Link>
            </LightTooltip>

        </div>

    )

}

  export const colunaCidadao = ( setRowInfo, setOpenAlterKey, handleClickOpen, classes  ) => {

    return (
        [
            { 
                title: 'Ações',
                render: rowData => <ActionBtns 
                  rowData={rowData} classes={classes} setRowInfo={setRowInfo} setOpenAlterKey={setOpenAlterKey} handleClickOpen={handleClickOpen}
                />
            },
            { 
                title: 'Post/Grad', 
                field: 'postGrad', 
                type: 'string', 
                renderGraph: true,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 120,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 120,
                    textAlign: 'center'
                }
            },
            {
                title: 'Nome de guerra', 
                field: 'nomeDeGuerra', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 220,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 220,
                    textAlign: 'center'
                }
            },
            {
                title: 'Status', 
                field: 'cidadaosStatus', 
                type: 'string', 
                renderGraph: true,cellStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }
            },
            {
                title: 'Nome completo', 
                field: 'nomeCompleto', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 350,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 350,
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                }
            },
            {
                title: 'QM', 
                field: 'qm', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 180,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 180,
                    textAlign: 'center'
                }
            },
            {
                title: 'RA', 
                field: 'ra', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }
            },
            {
                title: 'Cpf', 
                field: 'cpf', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 250,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 250,
                    textAlign: 'center'
                }
            },
            {
                title: 'Telefone', 
                field: 'telefone', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }
            },
            {
                title: 'Data de nascimento', 
                field: 'dataDeNascimento', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 190,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 190,
                    textAlign: 'center'
                }
            },
            {
                title: 'Data de praça', 
                field: 'dataDePraca', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 190,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 190,
                    textAlign: 'center'
                }
            },
            {
                title: 'Comportamento', 
                field: 'comportamento', 
                type: 'string', 
                renderGraph: true,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 120,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 120,
                    textAlign: 'center'
                }
            },
            {
                title: 'Email', 
                field: 'email', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 210,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 210,
                    textAlign: 'center'
                }
            },
            {
                title: 'Estado civil', 
                field: 'estadoCivil', 
                type: 'string', 
                renderGraph: true,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 190,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 190,
                    textAlign: 'center'
                }
            },
          
            {
                title: 'Genero', 
                field: 'genero', 
                type: 'string', 
                renderGraph: true,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }
            },
            {
                title: 'Nome da Mãe', 
                field: 'nomeMae', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 300,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 300,
                    textAlign: 'center'
                }
            },
            {
                title: 'Nome do Pai', 
                field: 'nomePai', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 300,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 300,
                    textAlign: 'center'
                }
            },
            {
                title: 'RG', 
                field: 'rg', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%', 
                    minWidth: 180,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 180,
                    textAlign: 'center'
                }
            },
            {
                title: 'Estado',
                field: 'endereco.estado',
                cellStyle: { 
                    width: '100%', 
                    minWidth: 220,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 220,
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                }
            },
            {
                title: 'Cidade',
                field: 'endereco.cidade',
                cellStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 200,
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                }
            },
            {
                title: 'Bairro',
                field: 'endereco.bairro',
                cellStyle: { 
                    width: '100%', 
                    minWidth: 350,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 350,
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                }
            },
            {
                title: 'Rua',
                field: 'endereco.rua',
                cellStyle: { 
                    width: '100%', 
                    minWidth: 350,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 350,
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                }
            },
        ]
    )
}
