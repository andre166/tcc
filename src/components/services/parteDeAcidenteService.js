import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const listarParteDeAcidente = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );

  const response = await axios.get(`${localHost}/parteDeAcidente/listar`, {
  headers: host
  })
  .catch((error) => { return error });

  return response.data;

};

export const cadastrarParteDeAcidente = async ( parte ) => {

    let token = getToken();
  
    let host = hearderContent( token );
  
    const response = await axios.post(`${localHost}/parteDeAcidente/salvar`, parte, {
    headers: host
    })
    .catch((error) => { return error });
  
    return response.data;
  
};