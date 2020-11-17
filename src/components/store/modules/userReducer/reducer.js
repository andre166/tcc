
const INITIAL_STATE =  { 

    name: '',
    token: '',
    erro: false,
}

export default function reserve( state = INITIAL_STATE , action ){

    switch( action.type ){

        
        case 'SET_NAME_TOKEN':

            return { ...state, 
                name: action.payLoad.name,
                token: action.payLoad.token,
            }
        case 'ERRO_AUTH_ROUTES_RESTRICT':

            return { ...state,
                erro: action.payLoad,

        }
            
        default:
            return state;
    }
  
}

  
 