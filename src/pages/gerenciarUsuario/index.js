import React, { useState } from 'react';
import Form from './form';
import Snackbar from '../../components/snackbar';
import verifyUserAuth from '../../utils/verificarUsuarioAuth';
import { useHistory } from 'react-router-dom';

export default function GerenciarUsuario (){

    const history = useHistory();

    function isAutenticated(){

        let autenticated = verifyUserAuth();

        if( !autenticated ){
            history.push('/')
        }else{
            return true;
        }
    }

    let [ renderSnackBar, setRenderSnackBar] = useState(false);

    if( localStorage.getItem("snackBarAlert") ){

        let msg = JSON.parse(localStorage.getItem("snackBarAlert"));
        localStorage.removeItem("snackBarAlert")

        setRenderSnackBar(msg);
        
    }

    return(
        <div className="admin-container">
            { isAutenticated() && <Form/> }

            {renderSnackBar && <Snackbar info={renderSnackBar} />}
        </div>
    );
    
}

