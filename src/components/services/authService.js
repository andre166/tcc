import axios from 'axios';

export const verificarLogin = async ( user ) => {

    let response = await axios.post(`http://localhost:8080/auth`, user )
    .catch(e => {
        return { invalidUser: e.message};
    });

    return response;

}