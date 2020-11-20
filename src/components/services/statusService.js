import axios from 'axios';
import  { localHost, hearderContent } from '../../utils/hostHttp';
import { getToken } from './localStorgeService';

export const alterarStatus = async ( status ) => {

    let token = getToken();
    let host = hearderContent( token );
     
    await axios.post(`${localHost}/status/salvar`, status, {
      headers: host
    })
    .catch((error) => { return error })
  
  };