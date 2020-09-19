import React from 'react';
import { Link } from 'react-router-dom';
import './erro.css';

export default function Erro(){
    return(
        <div class="container mt-4 container-error">
            <h1 class="h1_erro" >PÁGINA NÃO ENCONTRADA</h1>
            <p class="p_erro" >Procuramos por essa página em todos os lugares.</p>
            <p class="p_erro">Tem certeza que o URL do site está correto?</p>
            <p class="p_erro">Entre em contato com o proprietário do site.</p>
            <Link to="/Home" ><button type="button" class="btn-erro">Volte ao início</button></Link>
        </div>
    );
}
