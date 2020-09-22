import React, {useState, useEffect} from 'react';

import TextFields from './components/formulario/formulario';
import Grid from '@material-ui/core/Grid';
import { listarOm } from '../../components/services/omServices';
import { getUserOm } from '../../components/services/usuarioService';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import GenerateAlert from '../../components/errorAlert';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams, useHistory} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './suStyle';

export default function Om(){

    let idParams = useParams();

    let [listaDeOm, setListaDeOm] = useState([]);
    let [loading, setLoading] = useState(true);
    let [userOm, setUserOm] = useState([]);

    const [modoTabela, setModoTabela] = useState(false);
    let [mostrarModal, setMostrarModal] = useState(false);
    let [listaDeOmState, setListaDeOmState] = useState(false);

    let [searchInput, setSearchInput] = useState("");

    let [error, setError] = useState("");

     const [paginaAtual, setPaginaAtual] = useState(1); //Define a primeira página e fica sendo observado pelo UseEffect para mudar o css da paginação 
     const [contatosPorPagina, setContatosPorPagina] = useState(4); //Define a quantidade de contatos por página
 
     const indexLastContato = paginaAtual * contatosPorPagina;
     const indexOfFirstPost = indexLastContato - contatosPorPagina;
 
     const [zerarPaginacao, setZerarPaginacao] = useState(false); // Volta para a página 1 ao mudar filtros ou ordenar - independente de true ou false - a cada mudança de estado é chamado um useffect
     const paginar = (pageNumber) => setPaginaAtual(pageNumber); //Define a quantidade de páginas a serem paginadas


    let [credencial, setCredencial] = useState('');
    
    const theme = useTheme();

    const smDownMediaQ = useMediaQuery(theme.breakpoints.down('sm'));

     let [ infoOriginal, setInfoOriginal] = useState({
      qtdOm: 0,
      qtdSu: 0,
      qtdUsu: 0,
    });

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

    }, []);


    const filterOm = (e) => {

      setSearchInput(e)

      if(e == ''){
        if(error){
          setError(false);
        }
        setListaDeOm( listaDeOmState );
        return;
      }

      let newList = [];

      listaDeOmState.map( o => {
        if( o.nomeOm.toUpperCase().indexOf(e.toUpperCase()) != -1 ){

          newList.push(o)

        }
      });

      if( newList.length === 0){
        setListaDeOm( [] );
        setError(true);
      }else{
        if(error){
          setError(false);
        }
        setListaDeOm(newList);
        setZerarPaginacao( !zerarPaginacao );

      }

    }

    const clearFilter = () => {
      if(searchInput != ''){
        setSearchInput('');
        setListaDeOm( listaDeOmState);
      }

    }

    const changeTableMode = () => {

      if(listaDeOmState != listarOm){
        setListaDeOm(listaDeOmState);
      }
      if(searchInput != ''){
        setSearchInput('');
      }
      if(error){
        setError(false);
      }
      if(paginaAtual != 1){
        setPaginaAtual(1);
      }
      if( rowsPerPage[0] !== contatosPorPagina ){
        setContatosPorPagina(rowsPerPage[0]);
      }
      setModoTabela(!modoTabela);
    }

    const rowsPerPage = [
      4,8,12,16
    ]

  const changeContactCount = (e) => {

    setZerarPaginacao( !zerarPaginacao );
    setContatosPorPagina(e);

  }

    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="lc">
            <h1>
              Carregando.
            </h1>
          </div>
        )
      }
      
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

