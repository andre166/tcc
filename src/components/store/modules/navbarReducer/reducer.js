const INITIAL_STATE =  { 

    openSideBar: false,
    renderNavBar: true,
    
}

export default function reserve( state = INITIAL_STATE , action ){
    
    switch( action.type ){

        case 'RENDER_NAVBAR':

            if( action.payLoad == state.renderNavBar ){
                return state
            }else{
                return { ...state,
                    renderNavBar : action.payLoad
                }
            }
        default:
            return state;
    }
  
  }
  
  
 