import React, {useState, useEffect, useRef} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useParams, useHistory} from 'react-router-dom';
import { listarOm } from '../../../../../../../components/services/omServices';
import { listarSubunidades } from '../../../../../../../components/services/subunidadeService';
import { Paper } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ContactsIcon from '@material-ui/icons/Contacts';
import SubjectIcon from '@material-ui/icons/Subject';
import DescriptionIcon from '@material-ui/icons/Description';
// import { maskCnpj } from '../../../../utils/maskAndValidators/cnpj';
// import { maskCep } from '../../../../utils/maskAndValidators/cep';
// import InfoMenu from './infoMenu';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    verifiOm: {
        width: '100%',
        height: '100%',
    },
    teste:{
        position: 'relative',
        height: '100%'
    },
    containerGeral: {
        width: '100%',
        maxWidth: 1100,
        marginTop: 70,
    },
    leftNavBar:{
        height: 'calc(100% - 77px) !important',
        borderRight: '1px solid #d6e0f0',
    },
    root: {
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
      divInfo:{
        height: 'calc(100% )',
      },
      geral:{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500
      },
      tituloGeral:{
          fontWeight: 'bold'
      },
      rootList: {
        width: '100%',
        maxWidth: 360,
        minWidth: 200,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 600,
      },
      demo: {
        // backgroundColor: theme.palette.background.paper,
      },
      title: {
        padding: 20,
        background: '#eeeeee',
        // margin: theme.spacing(4, 0, 2),
      },
      search: {
        border: '1px solid #eeeeee',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        // marginRight: theme.spacing(2),
        // margin: '10px 0px 10px 0px',

        width: '100%',
        maxWidth: 300,
        [theme.breakpoints.up('sm')]: {
          // marginLeft: theme.spacing(3),
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
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '20ch',
        },
      }
  }));

export default function VerificarOm( props ){
    
    const classes = useStyles();
    let idParams = useParams();
    const history = useHistory();
    const { id, idOm } = idParams;

    let [om, setOm] = useState("");
    let [subunidade, setSubunidade] = useState("");

    let [turmasOrdenadas, setTurmasOrdenadas] = useState("");
 
    const [open, setOpen] = React.useState(false);
    let [loading, setLoading] = useState(true);

    let [searchInput, setSearchInput] = useState("");
    let [error, setError] = useState("");

    const handleClick = () => {
      setOpen(!open);
    };

    function handleClickBread(event) {
      event.preventDefault();
      console.info('You clicked a breadcrumb.');
    }
      
    useEffect(() => {

      const loadPage = async () => {

        let getOm = await listarOm(idOm);
        let getSu = await listarSubunidades(id);

        if( getOm && getSu){

          let getSuOrdenado = getSu.turma.sort(function(a, b){

            return ( a['turma'] < b['turma']) ? 1 : ((a['turma'] > b['turma']) ? -1 : 0);

          })

          setTurmasOrdenadas(getSuOrdenado)
          setSubunidade(getSu);
          setOm(getOm);
          setLoading(false);

        }

      }

      loadPage();
        
    }, []); 

    const filterOm = (e) => {

      setSearchInput(e)

      // if(e == ''){
      //   if(error){
      //     setError(false);
      //   }
      //   setListaDeOm( listaDeOmState );
      //   return;
      // }

      let newList = [];

      // listaDeOmState.map( o => {

      //   let nomeOmFind = o.nomeAbrev.toUpperCase().indexOf(e.toUpperCase());

      //   let findCnpj = o.cnpj.toUpperCase().indexOf(e);

      //   let findCep = o.cep.toUpperCase().indexOf(e);

      //   if( nomeOmFind != -1 || findCnpj != -1 || findCep != -1){

      //     newList.push(o)

      //   }
      // });

      // if( newList.length === 0){
      //   setListaDeOm( [] );
      //   setError(true);
      // }else{
      //   if(error){
      //     setError(false);
      //   }
      //   setListaDeOm(newList);
      //   setZerarPaginacao( !zerarPaginacao );

      // }

    }

    const clearFilter = () => {
      if(searchInput != ''){
        setSearchInput('');
      }

    }


    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="loading-container">
            <CircularProgress />
          </div>
        )
    }

    return(
        <Grid container direction="row" justify="center" align="center" className={classes.verifiOm}>
            {subunidade && om && <Grid  className={classes.containerGeral}>
            <Grid container spacing={2} justify="center" align="center" direction="row" style={{padding: 10}}>

              <Grid item xs={6} md={6}>

                <Paper style={{padding: 10, minWidth: 420}}>
                    <Typography variant="h4" className={classes.title}>
                      {subunidade.nomeSubunidade}
                    </Typography>

                    <Grid container justify="space-between" align="center" direction="row" style={{padding: '15px 5px 15px 5px'}}>

                        <Link to={`/Subunidade/${idOm}`}  style={{textDecoration: 'none'}}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<KeyboardReturnIcon />}
                            >
                                Voltar
                            </Button>
                        </Link>

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
                         
                          inputProps={{ 'aria-label': 'search' }}
                        />
                        
                      </div>
                    </Grid>

                    <Divider style={{margin: '5px 0px 5px 0px'}}/>
                    <div className={classes.demo}>
                      {turmasOrdenadas && <List dense={true} className={classes.rootList}>
                        {turmasOrdenadas.map( (s, index ) => (
                          <>
                          <ListItem>
                            <ListItemText
                              primary={s.turma}
                              secondary={'Efetivo: ' + s.cidadao.length}
                              />
                            <Button variant="contained">Listar efetivo</Button>
                          </ListItem>
                          {index < turmasOrdenadas.length - 1 && <Divider/> }
                          </>
                        ))}
                      </List>}
                    </div>
                </Paper>
              </Grid>
              </Grid>
            </Grid>}
        </Grid>
    );
    
}
  
  

