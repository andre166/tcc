import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const listarCidadaoPorTurma = async ( turma ) => {

    let token = getToken();
  
    let host = hearderContent( token );

  
    const response = await axios.post(`${localHost}/cidadao/listarPorTurma`, turma, {
    headers: host
    })
    .catch((error) => { return error });

    return response.data;

  };

export const cadastrarCidadao = async ( cidadao ) => {

  let token = getToken();

  let host = hearderContent( token );


  const response = await axios.post(`${localHost}/cidadao/salvar`, cidadao, {
  headers: host
  })
  .catch((error) => { return error });

  return response.data;

};
