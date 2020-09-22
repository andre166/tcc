import React from 'react';
import { Link } from 'react-router-dom';
// import './erro.css';
import { useStyles } from './errorStyle';

export default function Erro(){

    const classes = useStyles();

    return(
        <div className={classes.containerError}>
            <div className={classes.containerGeral}>
                <h1 >PÁGINA NÃO ENCONTRADA</h1>
                <p className={classes.pErro} >Procuramos por essa página em todos os lugares.</p>
                <p className={classes.pErro}>Entre em contato com o proprietário do site.</p>
                <Link to="/Home" ><button type="button" className={classes.btnErro}>Volte ao início</button></Link>
            </div>
        </div>
    );
}
