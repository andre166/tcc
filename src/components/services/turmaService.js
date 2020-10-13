import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const cadastrarTurma = async ( turma ) => {
  
  let token = getToken();
  let host = hearderContent( token );
   
  await axios.post(`${localHost}/turma/salvar`, turma, {
    headers: host
  })
  .catch((error) => { return error })
  
};

export const listarTurma = async ( id ) => {
  
  let token = getToken();
  let host = hearderContent( token );

  let response = [];

  if( id ){

    response = await axios.get(`${localHost}/turma/listar/${id}`,{
      headers: host
    })
    .catch((error) => { return error });
  
    return response.data;

  }else{
   
    response = await axios.get(`${localHost}/turma/listar`, {
      headers: host
    })
    .catch((error) => { return error })

  }

  return response.data

};

export const editarTurma = async ( turma ) => {
  
  let token = getToken();
  let host = hearderContent( token );
   
  await axios.put(`${localHost}/turma/editar`, turma, {
    headers: host
  })
  .catch((error) => { return error })
  
};






