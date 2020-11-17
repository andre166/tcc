import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { useStyles } from './listaEfetivoStyle';
import LoadingPage from  '../../../components/loading';
import withWidth from '@material-ui/core/withWidth';
import { getTurma } from  '../../../components/services/localStorgeService';
import { colunaCidadao } from '../../../utils/columns/colunaCidadao';
import { listarCidadaoPorTurma } from '../../../components/services/cidadaoService';
import ShowRelatorio from '@lestetelecom/showrelatorio/lib/index';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from './card';
import BarChart from './barGraph';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GavelIcon from '@material-ui/icons/Gavel';
import { listarSubunidades } from '../../../components/services/subunidadeService';
import { getUserSu } from '../../../components/services/localStorgeService';
import InfoIcon from '@material-ui/icons/Info';
import verifyUserAuth from '../../../utils/verificarUsuarioAuth';

//redux
import { connect } from 'react-redux';
import { 
    renderNavbar, renderLeftDrawner
} from '../../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function ListaEfetivo( props ){

    if( !props.navbarState.renderNavBar ){
        props.renderNavbar(true);
    }
    
    const classes = useStyles();
    const history = useHistory();

    let [loading, setLoading] = useState(true);
    let [userSu, setUserSu] = useState([]);
    const [data, setData] = useState([]);
    const [openAlterKey, setOpenAlterKey] = useState(false);
    const [ rowInfo, setRowInfo] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        new Promise((resolve, reject) => {
        setTimeout(() => {
            setOpenAlterKey(false);
            resolve();
        }, 100);
        })
    };

    const [columns, setColumns] = useState([]);

    useEffect(() => {

        let turma = getTurma();

        if( !turma ){
            history.push('/');
        }

        async function isAutenticated(){

            let autenticated = await verifyUserAuth();
        
            if( !autenticated ){
              history.push('/')
            }else{
                inicializarForm();
            }
          } 
        
        isAutenticated();

    }, []);

    const inicializarForm = async () => {
  
        let responseSu = getUserSu();
        // let turma = getTurma();
        // let turmaId = turma.id;

        // let cidadaoList = await listarCidadaoPorTurma( turmaId );

        // console.log("cidadaoList ===>", cidadaoList)
  
        // let colunas = colunaCidadao( setRowInfo, setOpenAlterKey, handleClickOpen, classes );
        
        // setData(cidadaoList);
        // setColumns(colunas);
        let su = await listarSubunidades( responseSu );
        console.log(su)
        setUserSu(su);
        setLoading(false);
  
    }


    const col = [
        {title: 'Justiça e disciplina', subtitle: 'Quantidade de transgressores que estão punidos disciplinarmente.', headerIcon: <GavelIcon/>, bg: "#a20a0a" },
        {title: 'Post/Grad', subtitle: 'Quantidade de militar por posto ou graduação.', headerIcon: <InfoIcon/>, bg: "#d37815" },
        {title: 'Comportamento', subtitle: 'Quantidade de militar por comportamento.', headerIcon: <GavelIcon/>, bg: "#a20a0a" },

    ]

  const defineCols = () => {

    let wd = props.width;

        if(wd == 'xl' ){
        return 3;
        }else if(wd == 'lg' ){
        return 3;
        }else if(wd == 'md' ){
        return 2;
        }else if(wd == 'sm' ){
        return 2;
        }if(wd == 'xs' ){
        return 1;
        }

    }

    if(loading){ return <LoadingPage/>}

  return(
        <div className={classes.container} >
            {/* <h3 style={{marginBottom: 2}}><DashboardIcon/>Dashboard</h3> */}
            <ListItem style={{marginTop: 10, background: '#fff', width: 'calc(100% - 20px)', borderRadius: 6, boxShadow: '1px 1px 1px #808080'}}>
                <ListItemAvatar >
                    <Avatar style={{background: '#2d6187'}}>
                        <DashboardIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Dashboard"/>
            </ListItem>

            <Divider style={{width: 'calc(100% - 20px)'}}/>

            <div style={{width: 'calc(100% - 20px)', margin: '10px 0px', borderRadius: 6, padding: 10, background: '#fff', boxShadow: '1px 1px 1px #808080'}}>
                <BarChart/>
            </div>

            <GridList cellHeight={'100%'} cols={defineCols()} spacing={10} style={{width: 'calc(100% - 12px)'}}>
                {col.map( (col, i) => (
                    <GridListTile key={i} cols={1}>
                        <Card info={col} userSu={userSu}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(ListaEfetivo))