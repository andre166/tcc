
const INITIAL_STATE =  { 

    isVisibleTable: false, 
    showError: false, 
    relatorioFiltro: '', 
    relatorioKeyNames: '', 
    keyForTableHead: '',

}

export default function reserve( state = INITIAL_STATE , action ){

    switch( action.type ){

        case 'HAS_ERROR':
            return { ...state, showError: action.payLoad }

        case 'SHOW_TABLE':
            return { ...state, isVisibleTable: action.payLoad}

        case 'RELATORIO_KEY_NAMES':
            return { ...state, relatorioKeyNames: action.payLoad}

        case 'RELATORIO_FILTROS':
            return { ...state, relatorioFiltro: action.payLoad}
            
        default:
            return state;
    }

    return [];
  
  }

  
 