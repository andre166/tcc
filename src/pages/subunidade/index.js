import React, {useState, useEffect} from 'react';
import './subunidade.css';

import TextFields from './components/formulario/formulario';
import Grid from '@material-ui/core/Grid';
import { listarOm } from '../../components/services/omServices';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import { makeStyles, fade } from '@material-ui/core/styles';
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
     //States para paginação
     const [paginaAtual, setPaginaAtual] = useState(1); //Define a primeira página e fica sendo observado pelo UseEffect para mudar o css da paginação 
     const [contatosPorPagina, setContatosPorPagina] = useState(4); //Define a quantidade de contatos por página
 
     const indexLastContato = paginaAtual * contatosPorPagina;
     const indexOfFirstPost = indexLastContato - contatosPorPagina;
    //  const quantidadeDeContatos = listaDeOm.subunidades.slice(indexOfFirstPost, indexLastContato);
 
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

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#eeeeee',
      },
      gridList: {
        width: '100%',
        height: '100%',
        maxHeight: 500,
      },
      posAbsolute:{
        position: 'absolute'
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
        borderBottom: '1.5px solid #d8d3cd'
      },
      clearBtn: {
        position: 'absolute',
      }
    }));

const classes = useStyles();

     
    useEffect(() => {

      const getOms = async ( id, perfil ) => {

        let response = '';

        if( perfil == "ROLE_ADMIN" ){
          let uOm = await listarOm( id );
          setUserOm(uOm)
          response = await listarOm( );

        }else
        if( id ){
          response = await listarOm( id );
        }else{
          response = await listarOm( );
        }

        setListaDeOm(response);
        setLoading(false);

      };

      let response = JSON.parse(localStorage.getItem("userInfo"));

      let userPerfil = response.perfil;

      setCredencial(userPerfil);

      if( idParams.id && userPerfil == 'ROLE_ADMIN'){

        let id = idParams.id 

        getOms( id, userPerfil );


      }else if( idParams.id && userPerfil != 'ROLE_ADMIN'){

        let id = idParams.id 

        getOms( id );

      }else{
        getOms( );
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
        // <Grid container direction="column" alignItems="flex-start"  justify="center">
        <>

            {/* <Grid className="subunidade-form" direction="column"> */}

              { listaDeOm && idParams.id && credencial != 'ROLE_ADMIN' && 
                <TextFields listaDeOm={listaDeOm} userOm={userOm} idParametro={true}></TextFields>
              } 

              { listaDeOm && !idParams.id && credencial != 'ROLE_ADMIN' && 
                <TextFields listaDeOm={listaDeOm} userOm={userOm} idParametro={false}></TextFields>
              } 

              { listaDeOm && !idParams.id && credencial == 'ROLE_ADMIN' && 
                <TextFields listaDeOm={listaDeOm} idParametro={false}></TextFields>
              } 
              { listaDeOm && idParams.id && credencial == 'ROLE_ADMIN' && 
                <TextFields userOm={userOm} listaDeOm={listaDeOm} idParametro={true}></TextFields>
              } 
            {/* </Grid> */}

            
        </>
    );
    
}

