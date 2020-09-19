import axios from 'axios';
import { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from '../../utils/getToken';

export const verificarLogin = async ( user ) => {

    let response = await axios.post(`http://localhost:8080/auth`, user )
    .catch(e => {
        return { invalidUser: e.message};
    });
    
    return response;

}

export const cadastrarUsuarioAutenticado = async ( usuario ) => {

    let token = getToken();

    let host = hearderContent( token );
 
    await axios.post(`http://localhost:8080/usuario/salvar`, usuario, {
        headers: host
      })
    .catch((error) => { return error });
}

export const listarPerfis = async ( ) => {

    let token = getToken();

    let host = hearderContent( token );
    
    const response = await axios.get(`${localHost}/usuario/listar`,{
        headers: host
      })
    .catch((error) => { return error });

    return response.data;

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

export const listarPerfisComRestricao = async ( ) => {
    
    const response = await axios.get(`http://localhost:3001/listar/authPerfilRestrito`);
    return response.data;
    
}

export const autenticar = async ( ) => {
    
    const response = await axios.get(`http://localhost:3001/autenticar`);
    return response.data;

}

export const listarUsuarios = async ( id ) => {
    
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

export const deletarUsuario = async ( id ) => {

    let token = getToken();

    let host = hearderContent( token );
    
    await axios.delete(`${localHost}/usuario/excluir/${id}`, {
        headers: host
    })
    .catch((error) => { return error });

}

export const editarUsuario = async ( user, om ) => {

    let token = getToken();

    let host = hearderContent( token );

    await axios.put(`${localHost}/usuario/editar`, user, {
        headers: host
    })
    .catch((error) => { return error });


}


