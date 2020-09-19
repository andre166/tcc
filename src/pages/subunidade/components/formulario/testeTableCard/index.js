import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './om.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { listarOm } from '../../../../../components/services/omServices';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from './components/card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import RelatorioTable from '@lestetelecom/showrelatorio/lib/index';
import { colunaSubunidade } from '../../../../../utils/customColumns';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import GenerateAlert from '../../../../../components/errorAlert';
import Paginacao from './components/paginacao';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MenuOrderBy from './components/menuOrderBy';
import Snackbar from '../../../../../components/snackbar';
import { Link} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import Modal from './components/modal/modal';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AddBoxIcon from '@material-ui/icons/AddBox';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#222831",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px 8px 12px'
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#eeeeee',
    padding: '10px 10px 15px 10px',
    width: '100%',
  },
  gridList: {
    width: '100%',
    height: '100%',
    // maxHeight: 500,
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    borderBottom: '1.5px solid #d8d3cd'
  },
  clearBtn: {
    position: 'absolute',
  },
  buttonSuccess: {
    backgroundColor: '#1d3724',
    height: 35,
    marginLeft: 10,
    marginTop: 15,
    '&:hover': {
      background: "#4a5442",
   },
   containerCadastrarSu: {
    padding: 10,
  },
  },
  buttonInfoIcon:{
    color: '#145374'
  }
}));

export default function Om( { omParaVincular, omList, userOm} ){

    const classes = useStyles();

    let [listaDeOm, setListaDeOm] = useState(omParaVincular.subunidades);
    let [listaDeOmState, setListaDeOmState] = useState(omParaVincular.subunidades);
    let [loading, setLoading] = useState(true);
    const [modoTabela, setModoTabela] = useState(true);
    let [mostrarModal, setMostrarModal] = useState(false);

    let [searchInput, setSearchInput] = useState("");
    let [renderCard, setRenderCard] = useState(true);

    let [error, setError] = useState("");
    let [ renderSnackBar, setRenderSnackBar] = useState(false);

    //States para paginação
    const [paginaAtual, setPaginaAtual] = useState(1); //Define a primeira página e fica sendo observado pelo UseEffect para mudar o css da paginação 
    const [contatosPorPagina, setContatosPorPagina] = useState(12); //Define a quantidade de contatos por página

    const indexLastContato = paginaAtual * contatosPorPagina;
    const indexOfFirstPost = indexLastContato - contatosPorPagina;

    let quantidadeDeContatos = [];

    if(omParaVincular.subunidades){
      quantidadeDeContatos = omParaVincular.subunidades.slice(indexOfFirstPost, indexLastContato);
    }else{
      quantidadeDeContatos = omParaVincular.slice(indexOfFirstPost, indexLastContato);

    }

    if(userOm){
      console.log("userOm", userOm)
    }
    const [zerarPaginacao, setZerarPaginacao] = useState(false); // Volta para a página 1 ao mudar filtros ou ordenar - independente de true ou false - a cada mudança de estado é chamado um useffect
    const paginar = (pageNumber) => setPaginaAtual(pageNumber); //Define a quantidade de páginas a serem paginadas

    let [ infoOriginal, setInfoOriginal] = useState({
      qtdEfetivo: 0,
      qtdSu: 0,
    });

    useEffect(() => {

      function gerarActionsButtons(){

       if(colunaSubunidade[0].title != 'Ações'){
         let btns = { 
           title: 'Ações',
           render: rowData => <ActionBtns rowData={rowData}/>
         }
  
         colunaSubunidade.unshift(btns);
       }


      }

      const ActionBtns = ( {rowData} ) => {
      
        return (
          <div className="actionBtns" >
      
          <Link to={{pathname: `/EditarSubunidade/${rowData.id}/${omParaVincular.id}`}} style={{textDecoration: 'none'}}>
            <LightTooltip title="Editar" size="small">
              <IconButton color="primary" aria-label="upload picture" component="span"> 
                <EditIcon size="small" className={classes.buttonInfoIcon}/> 
              </IconButton>
            </LightTooltip>
          </Link>
      
          <Modal om={ rowData } btnTable={true}/>

          <Link to={{pathname: `/VerificarSubunidade/${rowData.id}/${omParaVincular.id}`}} style={{textDecoration: 'none'}}>
            <LightTooltip title="Detalhar Subunidade">
                <IconButton size="small" aria-label="delete" ><FindInPageIcon/></IconButton>
            </LightTooltip>
          </Link>

          </div>
        )
      }

      gerarActionsButtons();

      const loadPage = async () => {

        if( localStorage.getItem("snackBarAlert") ){

          var msgSnabarAlert = JSON.parse(localStorage.getItem("snackBarAlert"));
  
        }
        
        if( omParaVincular ){

          let qtdEfetivo = 0;

          // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", omPr)

          setListaDeOm(omParaVincular.subunidades);
          setListaDeOmState(omParaVincular.subunidades)
          setLoading(false);
          if( msgSnabarAlert ){
            setRenderSnackBar(msgSnabarAlert)
          }
        }


      };
      
      loadPage();
    }, []);

    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="loading-container">
            <CircularProgress />
          </div>
        )
      }

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

          let nomeSuFind = o.nomeSubunidade.toUpperCase().indexOf(e.toUpperCase()) != -1;

          if( nomeSuFind ){

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
          setError(false);
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
        12,16, 24
    ]

    const changeContactCount = (e) => {

      setZerarPaginacao( !zerarPaginacao );
      setContatosPorPagina(e);

    }

      
    return(
          <Grid container direction="column" justify="flex-start" alignItems="center">

            {renderSnackBar && <Snackbar info={renderSnackBar} />}

          <Grid direction="column">
          <Paper style={{marginTop: 5, marginBottom: 5}}>
          <Grid container alignItems="center" justify="flex-start" style={{padding: 10}}>

          <Grid item sm={1}>

            <Link to={{pathname: `/CadastrarSubunidade/${omParaVincular.id}`}} style={{textDecoration: 'none'}}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonSuccess}
                startIcon={<AddBoxIcon />}
              >
                Cadastrar
              </Button>
            </Link>

          </Grid>

          <Grid item  xs>
            {/* <Grid container alignItems="center" justify="center">
              <h2> Lista de OM'S</h2>
            </Grid> */}
          </Grid>

<Grid item xs className={classes.searchBar} alignItems="center" justify="center">
  <Grid container alignItems="center" justify="center" >
    <FormControlLabel
        control={
        <Switch checked={modoTabela} onClick={() => changeTableMode()} name="checkedA" inputProps={{ 'aria-label': 'primary checkbox' }}/>
      }
      label="Tabela"
    />
    { !modoTabela &&
      <div className={classes.search}>
        <div className={classes.searchIcon}>
        
          <SearchIcon />
        </div>
        <InputBase
        
          onChange={(e) => filterOm(e.target.value)}
          placeholder="Pesquisar…"
          value={searchInput}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="delete" onClick={(e) => clearFilter(e.target.value)}>
              <ClearIcon fontSize="small" />
            </IconButton>
            </InputAdornment>
          }
          inputProps={{ 'aria-label': 'search' }}
        />
        
      </div>
    }

  </Grid>
</Grid>
</Grid>

</Paper>
             

                  {error &&  <div style={{margin: 10}}><GenerateAlert alertConfig={ {msg: "Nenhuma OM encontrada", tipo: "warning"}} /> </div>}
              {listaDeOm && 

                  modoTabela == true ? //Verifica se o modo é table ou card
                  <RelatorioTable TableDimension={ { tWidth: 'calc(100vw - 280px)', tHeight: '100%' } } relatorio={listaDeOm} customColumns={colunaSubunidade} /> : 
                  
                  renderCard && // para forçar a Re-renderização
                  <div className={classes.root}>
                    <GridList cellHeight={'100%'} style={{minWidth: 'calc(100vw - 280px)'}} className={classes.gridList} cols={6}>
                        {quantidadeDeContatos.map( su => (
                          <GridListTile key={su.id} cols={1}>
                            <Card  omParaVincular={omParaVincular} subunidade={su} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal}/>
                          </GridListTile>
                        ))}
                    </GridList>
                  </div>

              }

              { !modoTabela && <Paper style={{marginTop: 10, padding: 10}} >

                  <Grid container direction="row" alignItems="center" justify="flex-start">

                  <Grid item xs={2} >

                      <TextField 
                      style={{textAlign: 'center'}}
                              id="standard-select-currency"
                              select
                              helperText="quantidade por linha"
                              value={contatosPorPagina}
                              onChange={(e) => changeContactCount(e.target.value)}
                            >
                              {rowsPerPage.map((row, i) => (
                                <MenuItem key={i} value={row}>
                                  {row}
                                </MenuItem>
                              ))}
                        </TextField>
                        
                    </Grid>

                    <Grid item xs={7}>
                      <Grid container alignItems="center" justify="center">
                        <Paginacao contatosPorPagina={contatosPorPagina} contatos={omParaVincular.subunidades.length} paginar={paginar} paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual} zerarPaginacao={zerarPaginacao}></Paginacao>
                      </Grid>
                    </Grid>

                    <Grid item xs={3}>
                      <Grid container alignItems="center" justify="center">
                        <MenuOrderBy omParaVincular={omParaVincular} listaDeOm={listaDeOm} setListaDeOm={setListaDeOm} setListaDeOmState={setListaDeOmState} setRenderCard={setRenderCard} setPaginaAtual={setPaginaAtual}/>
                      </Grid>
                    </Grid>
                  </Grid>


                </Paper>
              }

          </Grid>
        </Grid>
    );
    
}

