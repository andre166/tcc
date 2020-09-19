import React, {useContext,useEffect, useState} from 'react';
import Form from './form';
import './gerenciarAdmin.css';
import Snackbar from '../../components/snackbar';

export default function Home (){

    let [ renderSnackBar, setRenderSnackBar] = useState(false);

    if( localStorage.getItem("snackBarAlert") ){

        let msg = JSON.parse(localStorage.getItem("snackBarAlert"));
        localStorage.removeItem("snackBarAlert")

        setRenderSnackBar(msg);
        
    }


    return(
        <div className="admin-container">
            <Form/>
            {renderSnackBar && <Snackbar info={renderSnackBar} />}
        </div>
    );
    
}

