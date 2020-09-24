import React from 'react';


export const colunaSubunidade = [
    { 
        title: 'Nome Completo', 
        field: 'nomeCompleto', 
        type: 'string', 
        renderGraph: false,
        cellStyle: { 
            width: '100%', 
            maxWidth: 400,
            textAlign: 'center',
        }, 
        headerStyle: { 
            width: '100%', 
            maxWidth: 400,
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
        renderGraph: true,
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
    },
    { 
        title: 'Nome Abreviado', 
        field: 'nomeSubunidade', 
        type: 'string', 
        renderGraph: true,
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
        title: 'Nome Abreviado', 
        field: 'usuarios.length', 
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
        title: 'Efetivo', 
        field: 'cidadao.length', 
        type: 'string', 
        renderGraph: true,
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
]

// ====================================== CIDADAO

