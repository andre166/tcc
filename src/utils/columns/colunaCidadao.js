import React from 'react';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LightTooltip from '../../utils/toolTip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Alert from '@material-ui/lab/Alert';
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

            <LightTooltip title="Alterar Status">
                <Link to={{pathname: `/MilitarStatus/${rowData.id}`}} style={{textDecoration: 'none'}}>
                    <LightTooltip title="Detalhar OM">
                        <IconButton  variant="outlined" size="small">
                            <AssignmentIcon className={classes.buttonAlterStatus}/>
                        </IconButton>
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
                />,
                cellStyle: { 
                    padding: 8,
                }, 
            },
            { 
                title: 'Número', 
                field: 'numeroRecruta', 
                type: 'string', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%',
                    padding: 0,
                    minWidth: 160,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 160,
                    textAlign: 'center'
                },
                filterCellStyle: {
                    textAlign: 'center',
                    width: '100%', 
                    minWidth: 160,
                    fontSize: 8
                }
            },
            { 
                title: 'Post/Grad', 
                field: 'postGrad', 
                type: 'string', 
                renderGraph: true,
                lookup: { 
                    'MAJ': 'MAJ',
                    'CAP':     'CAP',
                    '1ºTEN':     '1ºTEN',
                    '2ºTEN':     '2ºTEN',
                    'ASP-A-OF':     'ASP-A-OF',
                    'SUB-TEN':     'SUB-TEN',
                    '1ºSGT':     '1ºSGT',
                    '2ºSGT':     '2ºSGT',
                    '3ºSGT':     '3ºSGT',
                    'CB':     'CB',
                    'SD EP':     'SD EP',
                    'SD EV':     'SD EV',
                 },
                cellStyle: { 
                    width: '100%',
                    padding: 0,
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
                    padding: 0,
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

                render: rowData => <Alert 
                    severity={
                        rowData.cidadaosStatus == 'OK' ? 'success' : 
                        rowData.cidadaosStatus == 'BAIXADO' ? 'error' : 'warning'} 
                    style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    {rowData.cidadaosStatus}
                </Alert>, 

                type: 'string', 
                lookup: {
                   OK : "OK",
                   BAIXADO : "BAIXADO",
                   FERIAS : "FERIAS",
                   DISPENSADO : "DISPENSADO",
                   MISSAO : "MISSAO",
                   PUNIDO : "PUNIDO",
                   OUTROS : "OUTROS",
                },
                renderGraph: true,
                cellStyle: { 
                    width: '100%',
                    padding: 0,
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
                    padding: 0,
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
                    padding: 0,
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
                    padding: 0,
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
                    padding: 0,
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
                    padding: 0,
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
                type: 'date', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%',
                    padding: 0,
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
                type: 'date', 
                renderGraph: false,
                cellStyle: { 
                    width: '100%',
                    padding: 0,
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
                lookup: {
                    'I':'I',
                    'R' :'R',
                    'B' :'B',
                    'MB' :'MB',
                    'E' :'E' 
                },
                type: 'string', 
                renderGraph: true,
                cellStyle: { 
                    width: '100%',
                    padding: 0,
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
                    padding: 0,
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
                lookup: {
                    'Solteiro' : 'Solteiro',
                    'Casado' : 'Casado',
                    'Divorciado':'Divorciado',
                    'Viúvo': 'Viúvo'
                },
                cellStyle: { 
                    width: '100%',
                    padding: 0,
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
                lookup: {
                    "Masculino": "Masculino",
                    "Feminino": "Feminino"
                },
                renderGraph: true,
                cellStyle: { 
                    width: '100%',
                    padding: 0,
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
                    padding: 0,
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
                    padding: 0,
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
                    padding: 0,
                    minWidth: 180,
                    textAlign: 'center'
                }, 
                headerStyle: { 
                    width: '100%', 
                    minWidth: 180,
                    textAlign: 'center'
                }
            },
            
        ]
    )
}
