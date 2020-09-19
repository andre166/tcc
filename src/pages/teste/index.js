import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './teste.css';
import { listarOm } from '../../components/services/omServices';
import { pesquisacep } from '../../utils/maskAndValidators/cep';
import { validateCpf } from '../../utils/maskAndValidators/cpf';
import { validateCnpj } from '../../utils/maskAndValidators/cnpj';

export default function Teste(){

    let [nomeOm, setNomeOm] = useState("");
    let [lista, setLista] = useState("");
    
    pesquisacep('24325240')
    pesquisacep('24327550')

    useEffect(() => {

        const loadPage = async () => {

          const response = await listarOm( null );

          setLista(response)

        };
        
        loadPage();
    }, []);

        
    return(
         <div></div>
    );
    
}

