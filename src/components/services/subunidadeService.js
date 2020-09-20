import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const cadastrarSubunidade = async ( om ) => {

  let token = getToken();
  let host = hearderContent( token );
   
  await axios.post(`${localHost}/subunidade/salvar`, om, {
    headers: host
  })
  .catch((error) => { return error })

};

export const deletarSubunidade = async ( id ) => {

  let token = getToken();
  let host = hearderContent( token );

  await axios.delete(`${localHost}/subunidade/excluir/${id}`, {
    headers: host
  })
  .catch((error) => { return error });

};

export const editarSubunidade = async ( su ) => {
        
  let token = getToken();
  let host = hearderContent( token );

  await axios.put(`${localHost}/subunidade/editar`, su, {
    headers: host
  })
  .catch((error) => { return error });

};

export const listarSubunidades = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );

  let response = [];

  if( id ){

    response = await axios.get(`${localHost}/subunidade/listar/${id}`, {
      headers: host
    });

  }else{

    response = await axios.get(`${localHost}/subunidade/listar`, {
      headers: host
    });

  }

  if( response.data == ''){
    response.data = [];
  }

  return response.data;

}