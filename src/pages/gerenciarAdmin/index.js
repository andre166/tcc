import React, { useState } from 'react';
import Form from './form';
import './gerenciarAdmin.css';
import Snackbar from '../../components/snackbar';
import { useHistory } from 'react-router-dom';

import { getUserPerfil } from '../../components/services/localStorgeService';

export default function Home (){

    let [ renderSnackBar, setRenderSnackBar ] = useState(false);

    let userPerfil = getUserPerfil();

    const history = useHistory();

    if( localStorage.getItem("snackBarAlert") ){

        let msg = JSON.parse(localStorage.getItem("snackBarAlert"));
        localStorage.removeItem("snackBarAlert")

        setRenderSnackBar(msg);
        
    }

    if( userPerfil != 'ROLE_ADMIN'){
        history.push('/Error')
    }

    return(
        <div className="admin-container">
            <Form/>
            {renderSnackBar && <Snackbar info={renderSnackBar} />}
        </div>
    );
    
}

