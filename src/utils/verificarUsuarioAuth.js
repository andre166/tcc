import { getUserId, getToken } from '../components/services/localStorgeService';
import store from '../components/store';
import { setAuthRoutesErro } from '../components/actions/userAction';

export default function verificarUsuarioAutenticado( ){

    let id = getUserId();
    let token = getToken();
    
    let reduxState = store.getState();

    if( id && token ){
        return true;
    }else{
        if( !reduxState.userState.erro ){
            store.dispatch( setAuthRoutesErro(true) );
        }
        
        return false;

    }

}
