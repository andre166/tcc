import React from 'react';
import { getUserId, getToken } from '../components/services/localStorgeService';
import { setAuthRoutesErro } from '../components/actions/userAction';
import { useHistory } from 'react-router-dom';
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function VerificarUsuarioAutenticado( props ){

    let history = useHistory();

    let id = getUserId();
    let token = getToken();

    if( id && token ){

        return <></>;
    }else{
        new Promise((resolve, reject) => {
            
            setTimeout(() => {
                props.setAuthRoutesErro(true);
                resolve();
            }, 1000);
        })
    
        history.push('/');
        return <></>;

    }


}


const mapDispatchToProps = dispatch => bindActionCreators({ setAuthRoutesErro }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(VerificarUsuarioAutenticado)


// export default function verificarUsuarioAutenticado( props ){

//     let id = getUserId();
//     let token = getToken();

//     if( id && token ){
//         return true;
//     }
//     return false;

// }