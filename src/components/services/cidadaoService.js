import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const listarCidadaoPorTurma = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );

  const response = await axios.get(`${localHost}/cidadao/listarPorTurma/${id}`, {
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

export const editarCidadao = async ( cidadao ) => {

  console.log("cidadao", cidadao)

  let token = getToken();

  let host = hearderContent( token );

  const response = await axios.put(`${localHost}/cidadao/editar`, cidadao, {
  headers: host
  })
  .catch((error) => { return error });

  return response.data;

};

export const listarCidadaoPorId = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );

  const response = await axios.get(`${localHost}/cidadao/listar/${id}`,{
    headers: host
  })
  .catch((error) => { return error });

  return response.data;

};

export const deletarCidadaoPorId = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );

  const response = await axios.delete(`${localHost}/cidadao/excluir/${id}`,{
    headers: host
  })
  .catch((error) => { return error });

  return response.data;

};

export const listarCidadaoComEndereco = async ( id ) => {

  let token = getToken();

  let host = hearderContent( token );

  const response = await axios.get(`${localHost}/cidadao/listarComEndereco/${id}`,{
    headers: host
  })
  .catch((error) => { return error });

  return response.data;

};

export const listarCidadaoUnicoComEndereco = async ( turmaId, cidadaoId ) => {

  let token = getToken();

  let host = hearderContent( token );

  const response = await axios.get(`${localHost}/cidadao/listarPorTurma/${turmaId}/${cidadaoId}`,{
    headers: host
  })
  .catch((error) => { return error });

  return response.data;

};



