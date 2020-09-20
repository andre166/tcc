import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const listarOm = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );

  if( id ){

    const response = await axios.get(`${localHost}/om/listar/${id}`,{
      headers: host
    })
    .catch((error) => { return error });
  
    return response.data;

  }else{

    const response = await axios.get(`${localHost}/om/listar`, {
      headers: host
    })
    .catch((error) => { return error })

    return response.data;

  }

};

export const deletarOm = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );
  
  await axios.delete(`${localHost}/om/excluir/${id}`, {
    headers: host
  })
  .catch((error) => { return error });

};

export const editarOm = async ( nome ) => {

  let token = getToken();

  let host = hearderContent( token );

  await axios.put(`${localHost}/om/editar`, nome, {
    headers: host
  })
  .catch((error) => { return error });

};

export const cadastrarOm = async ( om ) => {

  let token = getToken();

  let host = hearderContent( token );
        
  // let om = {nomeOm: nome};

  await axios.post(`${localHost}/om/salvar`, om,{
    headers: host
  })
  .catch((error) => { return error });

};
