import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './errorStyle';
import verifyUserAuth from '../../utils/verificarUsuarioAuth';
import { useHistory } from 'react-router-dom';

export default function Erro( ){
    
    let history = useHistory();

    const classes = useStyles();

    if ( !verifyUserAuth() ) { history.push('/') };

    return(
        <>
            <div className={classes.containerError}>
                <div className={classes.containerGeral}>
                    <h1 >PÁGINA NÃO ENCONTRADA</h1>
                    <p className={classes.pErro} >Procuramos por essa página em todos os lugares.</p>
                    <p className={classes.pErro}>Entre em contato com o administrador do sistema.</p>
                    <Link to="/Home" ><button type="button" className={classes.btnErro}>Volte ao início</button></Link>
                </div>
            </div>
        </>
    );
}

