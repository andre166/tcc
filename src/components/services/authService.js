import axios from 'axios';
import  { localHost } from '../../utils/hostHttp';

export const verificarLogin = async ( user ) => {

    let response = await axios.post(`${localHost}/auth`, user )
    .catch(e => {
        return { invalidUser: e.message};
    });

    return response;

}