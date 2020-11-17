import React, { useState,useEffect } from 'react';
import Form from './form';
import './gerenciarAdmin.css';
import Snackbar from '../../components/snackbar';
import { useHistory } from 'react-router-dom';
import verifyUserAuth from '../../utils/verificarUsuarioAuth';
import { getUserPerfil } from '../../components/services/localStorgeService';

export default function Home (){

    let [ renderSnackBar, setRenderSnackBar ] = useState(false);

    let userPerfil = getUserPerfil();

    const history = useHistory();

    if( userPerfil != 'ROLE_ADMIN'){
        history.push('/Error')
    }

    function isAutenticated(){

        let autenticated = verifyUserAuth();

        if( !autenticated ){
            history.push('/')
        }else{
            return true
        }
    } 

    if( localStorage.getItem("snackBarAlert") ){

        let msg = JSON.parse(localStorage.getItem("snackBarAlert"));
        localStorage.removeItem("snackBarAlert")

        setRenderSnackBar(msg);
        
    }

    return(
        <div className="admin-container">
            {isAutenticated() &&<Form/>}
            {renderSnackBar && <Snackbar info={renderSnackBar} />}
        </div>
    );
    
}

