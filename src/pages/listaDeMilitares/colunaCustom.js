const arrayColunasConsolidadoCustom = [

    { 
      title: 'data_atendimento', field: 'data_atendimento', type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        maxWidth: 80
      },
      headerStyle: {
        width: '100%',
        maxWidth: 80
      }
  
    },
  
    { 
      title: 'data_ultima_mod', field: 'data_ultima_mod', type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        maxWidth: 80
      },
      headerStyle: {
        width: '100%',
        maxWidth: 80
      }
    
    },
  
    { 
      title: 'periodo', field: 'periodo', type: 'string', lookup: { Manhã: 'Manhã', Tarde: 'Tarde', '': 'Indefinido' }, renderGraph: true,
      cellStyle: {
        width: '100%',
        maxWidth: 80
      },
      headerStyle: {
        width: '100%',
        maxWidth: 80
      }
    },
  
    { 
      title: 'tipo_atividade', field: 'tipo_atividade', type: 'string', renderGraph: true,
      lookup: { 
        'Migracao de Tecnologia': 'Migração de Tecnologia', 
        'Reativacao': 'Reativação', 
        'Mudanca de Endereco': 'Mudança de Endereço' , 
        '': 'Indefinido',
        'Nova Ativacao': 'Nova Ativação' 
      } 
    },
  
    { 
      title: 'tecnologia', field: 'tecnologia', type: 'string', renderGraph: true,
      lookup: {
        UTP: 'UTP', FTTH: 'FTTH', '': 'Indefinido' 
      },
      cellStyle: {
        width: '100%',
        minWidth: 50,
        textAlign: 'center'
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      },
    },
    
    { 
      title: 'plano', field: 'plano', type: 'string', renderGraph: true,
  
      cellStyle: {
        width: '100%',
        minWidth: 330
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content',
      },
    
    },
  
    { 
      title: 'cidade', field: 'cidade', type: 'string', renderGraph: true,
      lookup: { 
        Maricá: 'Maricá', 
        Guapimirim: 'Guapimirim', 
        Tanguá: 'Tanguá', 
        'São Gonçalo': 'São Gonçalo',
        'Rio Bonito': 'Rio Bonito', 
        Niterói: 'Niterói', 
        Itaboraí: 'Itaboraí', 
        Magé: 'Magé', 
        '': 'Indefinido'
      }
    },
  
    { 
      title: 'bairro', field: 'bairro', type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
          minWidth: 180
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'referencia', field: 'referencia', type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 380
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content',
      }
    },
  
    { 
      title: 'status', field: 'status', type: 'string', renderGraph: true,
      lookup: { 
        Rejeitada: 'Rejeitada', 
        Retratada: 'Retratada',
        Aprovada: 'Aprovada', 
        'Concluída sem sucesso': 'Concluída sem sucesso',
        'Concluída com sucesso': 'Concluída com sucesso', 
        '': 'Indefinido'
      },
      cellStyle: {
          width: '100%',
          minWidth: 150
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'motivo', field: 'motivo', type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 150
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'data_ativacao', field: 'data_ativacao', type: 'string', renderGraph: false,
    },
  
    { 
      title: 'provedor', field: 'provedor', type: 'string', renderGraph: true,
    },
  
    { 
      title: 'pgtoprorata', field: 'pgtoprorata', type: 'string', renderGraph: true,
      lookup: { 
        'no ato': 'No Ato', 
        'próxima fatura': 'Próxima Fatura',
        '': 'Indefinido' 
      },
      cellStyle: {
          width: '100%',
          minWidth: 120
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'pgtotxadesao', field: 'pgtotxadesao', type: 'string', renderGraph: true,
      cellStyle: {
        width: '100%',
        minWidth: 130,
        
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      
      }
    },
  
    { 
      title: 'txadesao', field: 'txadesao', type: 'numeric', renderGraph: true,
      cellStyle: {
        width: '100%',
        maxWidth: 70,
        textAlign: 'center'
       
      },
      headerStyle: {
        width: '100%',
        maxWidth: 70,
      }
    },
  
    { 
      title: 'atendente', field: 'atendente', type: 'string', renderGraph: true,
      cellStyle: {
        width: '100%',
        minWidth: 230,
        
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'protocolo', field: 'protocolo', type: 'string', renderGraph: true,
    },
  
    { 
      title: 'nome_cli', field: 'nome_cli', type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 230
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'conheceu', field: 'conheceu', type: 'string', renderGraph: true,
      cellStyle: {
        width: '100%',
        minWidth: 120
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'ticket', field: 'ticket', type: 'string', renderGraph: false,
    },
  
  ]

  export default arrayColunasConsolidadoCustom;
  