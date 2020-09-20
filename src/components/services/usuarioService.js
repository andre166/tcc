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

export const editUser = async ( user, om ) => {

    let token = getToken();

    let host = hearderContent( token );

    await axios.put(`${localHost}/usuario/editar`, user, {
        headers: host
    })
    .catch((error) => { return error });


}

