import React, {useState, useEffect} from 'react';
import TextFields from './components/formulario/formulario';
import { listarOm } from '../../components/services/omServices';
import { getUserOm } from '../../components/services/usuarioService';
import { useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './suStyle';
import LoadingPage from '../../components/loading';
import verifyUserAuth from '../../utils/verificarUsuarioAuth';
import { useHistory } from 'react-router-dom';

export default function Om(){

  let idParams = useParams();
  let history = useHistory();

  let [listaDeOm, setListaDeOm] = useState([]);
  let [loading, setLoading] = useState(true);
  let [userOm, setUserOm] = useState([]);

  let [credencial, setCredencial] = useState('');
  
  const theme = useTheme();
  const classes = useStyles();
     
  useEffect(() => {

    
    const getOms = async ( id, perfil, userId ) => {

      let response = '';

      if( perfil == "ROLE_ADMIN" && id ){

        let uOm = await listarOm( id );
        setUserOm(uOm);
        response = await listarOm( );

      }else if(perfil == "ROLE_ADMIN" && !id){
        
        response = await listarOm( );

      }else if(perfil !== "ROLE_ADMIN"){
        let a = await getUserOm(userId);
        setUserOm(a)

      }

      setListaDeOm(response);
      setLoading(false);

    };

    function isAutenticated(){

      let autenticated = verifyUserAuth();

      if( !autenticated ){
          history.push('/')
      }else{

        let response = JSON.parse(localStorage.getItem("userInfo"));

        let userPerfil = response.perfil;
        let userId = response.userId;
    
        setCredencial(userPerfil);
        //Perfil de administrador
        if( idParams.id && userPerfil == 'ROLE_ADMIN'){
          let id = idParams.id 
          getOms( id, userPerfil );
        }else if( !idParams.id && userPerfil == 'ROLE_ADMIN'){
          getOms( '', userPerfil);
        }else if( userPerfil !== 'ROLE_ADMIN'){
          getOms( '', '', userId );
          
        }
      }
    } 

    isAutenticated();

    }, []);

    if(loading){ return <LoadingPage/>}
      
    return(
        <>

          { listaDeOm && idParams.id && credencial != 'ROLE_ADMIN' && 
            <TextFields listaDeOm={listaDeOm} userOm={userOm} idParametro={true}></TextFields>
          } 

          { userOm && !idParams.id && credencial != 'ROLE_ADMIN' && 
            <TextFields listaDeOm={listaDeOm} userOm={userOm} idParametro={false}></TextFields>
          } 

          { listaDeOm && !idParams.id && credencial == 'ROLE_ADMIN' && 
            <TextFields listaDeOm={listaDeOm} idParametro={false}></TextFields>
          } 
          { listaDeOm && idParams.id && credencial == 'ROLE_ADMIN' && 
            <TextFields userOm={userOm} listaDeOm={listaDeOm} idParametro={true}></TextFields>
          } 

        </>
    );
    
}

