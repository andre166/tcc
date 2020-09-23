import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { listarOm } from '../../components/services/omServices';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from './components/card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import RelatorioTable from '@lestetelecom/showrelatorio/lib/index';
import { omColuns } from '../../utils/columns/omColumns';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import GenerateAlert from '../../components/errorAlert';
import Paginacao from './components/paginacao';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MenuOrderBy from './components/menuOrderBy';
import Snackbar from '../../components/snackbar';
import { Link} from 'react-router-dom';
import Modal from './components/modal/modal';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AddBoxIcon from '@material-ui/icons/AddBox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import LightTooltip from '../../utils/toolTip';
import { useStyles } from './omStyles';
import { maskCnpj } from '../../utils/maskAndValidators/cnpj';
import { maskCep } from '../../utils/maskAndValidators/cep';

export default withWidth()(Om);

function Om( props ){

    const classes = useStyles();
    const theme = useTheme();

    const smDownMediaQ = useMediaQuery(theme.breakpoints.down('sm'));
    const smUpMediaQ = useMediaQuery(theme.breakpoints.up('sm'));
    const smDownMedia = useMediaQuery(theme.breakpoints.down('sm'));
    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    let [listaDeOm, setListaDeOm] = useState("");
    let [loading, setLoading] = useState(true);
    const [modoTabela, setModoTabela] = useState(true);
    let [mostrarModal, setMostrarModal] = useState(false);
    let [listaDeOmState, setListaDeOmState] = useState(false);

    let [searchInput, setSearchInput] = useState("");
    let [renderCard, setRenderCard] = useState(true);

    let [error, setError] = useState("");
    let [ renderSnackBar, setRenderSnackBar] = useState(false);


    //States para paginação
    const [paginaAtual, setPaginaAtual] = useState(1); //Define a primeira página e fica sendo observado pelo UseEffect para mudar o css da paginação 
    const [contatosPorPagina, setContatosPorPagina] = useState(12); //Define a quantidade de contatos por página

    const indexLastContato = paginaAtual * contatosPorPagina;
    const indexOfFirstPost = indexLastContato - contatosPorPagina;
    const quantidadeDeContatos = listaDeOm.slice(indexOfFirstPost, indexLastContato);

    const [zerarPaginacao, setZerarPaginacao] = useState(false); // Volta para a página 1 ao mudar filtros ou ordenar - independente de true ou false - a cada mudança de estado é chamado um useffect
    const paginar = (pageNumber) => setPaginaAtual(pageNumber); //Define a quantidade de páginas a serem paginadas

    let [ infoOriginal, setInfoOriginal] = useState({
      qtdOm: 0,
      qtdSu: 0,
      qtdUsu: 0,
    });

    useEffect(() => {

      if( localStorage.getItem("snackBarAlert") ){

        let msg = JSON.parse(localStorage.getItem("snackBarAlert"));

        setRenderSnackBar(msg)
        
      }

      function gerarActionsButtons(){

       if(omColuns[0].title != 'Ações'){
         let btns = { 
           title: 'Ações',
           render: rowData => <ActionBtns rowData={rowData}/>
         }
  
         omColuns.unshift(btns);
       }


      }

      const ActionBtns = ( {rowData} ) => {
      
        return (
          <div className="actionBtns" >
      
          <Link to={{pathname: `/EditarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
            <LightTooltip title="Editar" size="small">
              <IconButton color="primary" component="span"> 
                <EditIcon size="small" className={classes.buttonInfoIcon}/> 
              </IconButton>
            </LightTooltip>
          </Link>
      
          <Modal om={ rowData } btnTable={true}/>

          <Link to={{pathname: `/VerificarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
            <LightTooltip title="Detalhar OM">
                <IconButton size="small" aria-label="delete" ><FindInPageIcon/></IconButton>
            </LightTooltip>
          </Link>

          </div>
        )
      }

      gerarActionsButtons();

      const maskCepAndCnpj = ( response ) => {

        response.map( e => {

          e.cnpj = maskCnpj(e.cnpj);
          e.cep = maskCep(e.cep)

        });

        return response

      }

      const loadPage = async () => {

        const resp = await listarOm( null );

        let response = maskCepAndCnpj(resp);
        
        if( response ){

          let quantidadeOm = response.length;
          let quantidadeDeUbunidades = 0;
          let quantidadeDeUsuarios = 0;

          response.map( e => {

            quantidadeDeUbunidades += e.subunidades.length
            quantidadeDeUsuarios += e.usuario.length

          })

          setInfoOriginal({
            qtdOm: quantidadeOm,
            qtdSu: quantidadeDeUbunidades,
            qtdUsu: quantidadeDeUsuarios,
          });
          setListaDeOm(response);
          setListaDeOmState(response)
          setLoading(false);
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

        e = e.replace('-', '').replace('.', '')

        if(e == ''){
          if(error){
            setError(false);
          }
          setListaDeOm( listaDeOmState );
          return;
        }

        let newList = [];

        listaDeOmState.map( o => {

          let nomeOmFind = o.nomeAbrev.toUpperCase().indexOf(e.toUpperCase());

          let findCnpj = o.cnpj.toUpperCase().indexOf(e);

          let findCep = o.cep.toUpperCase().indexOf(e);

          if( nomeOmFind != -1 || findCnpj != -1 || findCep != -1){

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

    const defineCols = () => {

      let wd = props.width;

      if(wd == 'xl' ){
        return 5;
      }else if(wd == 'lg' ){
        return 4;
      }else if(wd == 'md' ){
        return 3;
      }else if(wd == 'sm' ){
        return 2;
      }if(wd == 'xs' ){
        return 1;
      }

    }

      
    return(
          <Grid container direction="column" justify="center" alignItems="center" className={classes.containerGeral}>

            {renderSnackBar && <Snackbar info={renderSnackBar} />}

          <Grid direction="column">
            <div style={{marginTop: xsDownMedia && 55 || 65, background: '#fff'}}>
              <Grid container direction="row" alignItems="center" justify="flex-start" style={{padding: 10}}>


                <Grid item xs={6} sm={3}>

                  <Link to={{pathname: `/CadastrarOm`}} style={{textDecoration: 'none', marginRight: 5}}>
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

                <Grid item xs={6} sm={2}>

                  <FormControlLabel
                      control={
                      <Switch checked={modoTabela} onClick={() => changeTableMode()} name="checkedA" inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    }
                    label="Tabela"
                  />

                </Grid>

                {xsDownMedia && !modoTabela &&

                  <Grid item xs={6} sm={2}>
                    <Grid container alignItems="center" justify="flex-start" style={{marginTop: 10}}>
                      <MenuOrderBy listaDeOm={listaDeOm} setListaDeOm={setListaDeOm} setListaDeOmState={setListaDeOmState} setRenderCard={setRenderCard} setPaginaAtual={setPaginaAtual}/>
                    </Grid>
                  </Grid>

                }


                    { !modoTabela &&
                    <Grid item xs={12} sm={7} style={{display: 'flex', justifyContent: 'flex-end'}}>
                      {/* <Grid container direction="row" alignItems="center" justify="flex-end" > */}

                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        
                          <SearchIcon />
                        </div>
                        <InputBase
                          fullWidth
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
                  {/* </Grid> */}
                  </Grid>
                    }

                {/* </Grid>
                </Grid> */}
              </Grid>
              </div>

                  {error &&  <div style={{margin: 10}}><GenerateAlert alertConfig={ {msg: "Nenhuma OM encontrada", tipo: "warning"}} /> </div>}
              {listaDeOm.length === 0 ? '' :

                  modoTabela == true ? //Verifica se o modo é table ou card
                  <div style={{ width: smDownMediaQ && '100vw' || smUpMediaQ && 'calc(100vw - 240px)', background: '#fff' }}>
                    <RelatorioTable TableDimension={ { tWidth: '100%', tHeight: '100%' } } relatorio={listaDeOm} customColumns={omColuns} />
                  </div>
                  :

                  renderCard && // para forçar a Re-renderização
                  <div style={{
                    padding: xsDownMedia && '0px' || '0px 10px 0px 5px', 
                    width: xsDownMedia && '100vw' || smDownMedia && 'calc(100vw - 10px)' || smUpMediaQ && 'calc(100vw - 258px)',
                    background: "#eeeeee", 
                    marginTop: 5
                  }}>
                    <GridList cellHeight={'100%'} cols={defineCols()} spacing={10}>
                        {quantidadeDeContatos.map( om => (
                          <GridListTile key={om.id} cols={1}>
                            <Card  om={om} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal}/>
                          </GridListTile>
                        ))}
                    </GridList>
                    

                  </div>

              }

              { !modoTabela && <div style={{marginTop: 5, background: '#fff'}}>

              <Grid container direction="row" alignItems="center" justify="flex-start">

              {!xsDownMedia && <Grid item xs={6}  sm={2} style={{padding: 10}}>

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
                        
                    </Grid>}

                    <Grid item xs={12} sm={7} style={{margin: xsDownMedia && '10px 0px'}}>
                      <Grid container alignItems="center" justify="center">
                        <Paginacao contatosPorPagina={contatosPorPagina} contatos={listaDeOm.length} paginar={paginar} paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual} zerarPaginacao={zerarPaginacao}></Paginacao>
                      </Grid>
                    </Grid>

                    {!xsDownMedia &&
                      <Grid item xs={12} sm={3} style={{marginBottom: xsDownMedia && 10}}>
                        <Grid container alignItems="center" justify="center">
                          <MenuOrderBy listaDeOm={listaDeOm} setListaDeOm={setListaDeOm} setListaDeOmState={setListaDeOmState} setRenderCard={setRenderCard} setPaginaAtual={setPaginaAtual}/>
                        </Grid>
                      </Grid>
                    }
                    </Grid>
                
                </div>
              }

          </Grid>
        </Grid>
    );
    
}

