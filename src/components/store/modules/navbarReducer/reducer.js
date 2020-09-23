const INITIAL_STATE =  { 

    openSideBar: false,
    renderNavBar: true,
    leftDrawnerRender: true,
    
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
        case 'LEFTDRAWNER_RENDER':

            return { ...state,
                leftDrawnerRender : action.payLoad
            }
            
        default:
            return state;
    }
  
  }
  
  
 