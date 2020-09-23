import React, { useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';

export default function Paginacao( { contatos, contatosPorPagina, paginar, zerarPaginacao, paginaAtual, setPaginaAtual } ){

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(contatos / contatosPorPagina); i++){
        pageNumber.push(i);
    }

    const handleChange = (event, value) => {
        setPaginaAtual(value);
        paginar(value);
    }

    useEffect(() => {
        setPaginaAtual(1);
        paginar(1);
    }, [zerarPaginacao]);

    return(
        <Pagination count={pageNumber.length} page={paginaAtual} variant="outlined" color="primary" onChange={handleChange}/>
    );

}