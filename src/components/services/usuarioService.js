import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const addUser = async ( usuario ) => {

    let token = getToken();

    let host = hearderContent( token );
 
    await axios.post(`http://localhost:8080/usuario/salvar`, usuario, {
        headers: host
      })
    .catch((error) => { return error });
}

export const addUserComOm = async ( usuario, su ) => {

    let u = {
        usuario: usuario,
        su: su
    }

    let token = getToken();

    let host = hearderContent( token );
 
    await axios.post(`http://localhost:8080/usuario/salvarComSu`, u, {
        headers: host
      })
    .catch((error) => { return error });
}

export const getUserOm = async ( id ) => {

    let token = getToken();

    let host = hearderContent( token );
    
    const response = await axios.get(`${localHost}/usuario/getUserOm/${id}`,{
        headers: host
      })
    .catch((error) => { return error });

    return response.data;

}

export const listUser = async ( id ) => {
    
    let token = getToken();

    let host = hearderContent( token );

    let response = [];
    
    if( id ){

        response = await axios.get(`${localHost}/usuario/listar/${id}`,{
            headers: host
          })
        .catch((error) => { return error });

    }else{
        
        response = await axios.get(`${localHost}/usuario/listar`,{
            headers: host
          })
        .catch((error) => { return error });
    }
    

    return response.data;

}

export const deleteUser = async ( id ) => {

    let token = getToken();

    let host = hearderContent( token );
    
    await axios.delete(`${localHost}/usuario/excluir/${id}`, {
        headers: host
    })
    .catch((error) => { return error });

}

export const editUser = async ( user ) => {

    let token = getToken();

    let host = hearderContent( token );

    await axios.put(`${localHost}/usuario/editar`, user, {
        headers: host
    })
    .catch((error) => { return error });


}

export const alterUserPassword = async ( user ) => {

    let token = getToken();

    let host = hearderContent( token );

    await axios.put(`${localHost}/usuario/redefinirSenha`, user, {
        headers: host
    })
    .catch((error) => { return error });


}

export const verifiUser = async ( user ) => {

    let token = getToken();

    let host = hearderContent( token );

    let response = await axios.post(`${localHost}/usuario/verificarUsuario`, user, {
        headers: host
    })
    .catch((error) => { return {data: 'Usuário e/ou senha inválido'} });

    if( response.data ){
        if( response.data.msg){
            return response.data.msg;
        }

    }

}


