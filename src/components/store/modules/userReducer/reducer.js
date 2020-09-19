
const INITIAL_STATE =  { 

    name: '',
    token: '',
}

export default function reserve( state = INITIAL_STATE , action ){

    switch( action.type ){

        
        case 'SET_NAME_TOKEN':

            return { ...state, 
                name: action.payLoad.name,
                token: action.payLoad.token,
            }
            
        default:
            return state;
    }
  
}

  
 