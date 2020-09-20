export const omColuns = [
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
