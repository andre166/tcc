import React from 'react';

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
            // alignItems: 'center',
        }, 
        headerStyle: { 
            width: '100%', 
            maxWidth: 400,

            // textAlign: 'center',
        },
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
        field: 'nomeSubunidade', 
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

export const colunaCidadao = [
    { 
        title: 'Post/Grad', 
        field: 'postGrad', 
        type: 'string', 
        renderGraph: true,
        cellStyle: { 
            width: '100%', 
            maxWidth: 120,
            textAlign: 'center'
        }, 
        headerStyle: { 
            width: '100%', 
            maxWidth: 120,
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
        title: 'Turma', 
        field: 'turma', 
        type: 'string', 
        renderGraph: true,
    },
    {
        title: 'QM', 
        field: 'qm', 
        type: 'string', 
        renderGraph: true,
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
            minWidth: 150,
            textAlign: 'center'
        }, 
        headerStyle: { 
            width: '100%', 
            minWidth: 150,
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
            minWidth: 280,
            textAlign: 'center'
        }, 
        headerStyle: { 
            width: '100%', 
            minWidth: 280,
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
            minWidth: 280,
            textAlign: 'center'
        }, 
        headerStyle: { 
            width: '100%', 
            minWidth: 280,
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
    }

]
