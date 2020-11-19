import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { listarTurmaPorSu } from '../../../components/services/turmaService';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {getUserName, getUserPerfil, getUserSu } from '../../../components/services/localStorgeService';
import { masckPerfil } from '../../../utils/maskAndValidators/perfil';
import { useStyles } from './efetivoStyle';
import LoadingPage from  '../../../components/loading';
import Card from './card/card';
import withWidth from '@material-ui/core/withWidth';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Snackbar from '../../../components/snackbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import verifyUserAuth from '../../../utils/verificarUsuarioAuth';

//redux
import { connect } from 'react-redux';
import { 
    renderNavbar, renderLeftDrawner
} from '../../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function Efetivo( props ){

    props.renderNavbar(false);

    const perfil = getUserPerfil();

    const history = useHistory();
    
    const classes = useStyles();

    let userName = getUserName(); 
    
    let [loading, setLoading] = useState(true);

    let [listaTurma, setListaTurma] = useState([]);
    let [turma, setTurma] = useState('');
    let [showTable, setShowTable] = useState('');
    let [ renderSnackBar, setRenderSnackBar] = useState(false);

    let [ nenhumCadastroMsg, setNenhumCadastroMsg] = useState({
        show: false,
        txt: ''
    });


    useEffect(() => {
        async function isAutenticated(){

            let autenticated = await verifyUserAuth();
        
            if( !autenticated ){
              history.push('/')
            }else{
              loadPage();
            }
        
          } 
        
          isAutenticated();
    }, []);


    const loadPage = async ( ) =>{

        let uSu = getUserSu();

        console.log("uSU", uSu)

        let response = await listarTurmaPorSu( uSu );

        if( localStorage.getItem("snackBarAlert") ){

            let msg = JSON.parse(localStorage.getItem("snackBarAlert"));
    
            setRenderSnackBar(msg)
            
        }

        if(response !== undefined){
                
            response.sort(function(a, b) {
                return b.turma - a.turma;
            });

            setTurma(response[0]);
            setListaTurma(response);
            setNenhumCadastroMsg(false);
            setLoading(false);
            setLoading(false);
            

        }else{
            setNenhumCadastroMsg({
                show: true,
                txt: `Bem vindo ${userName}, Não encontramos uma subunidade vinculada ao senhor, favor contactar o administrador do sistema de sua OM.`
            });
            setLoading(false);
        }

    }


    const defineCols = () => {

        let wd = props.width;
  
        if(wd == 'xl' ){
          return 2;
        }else if(wd == 'lg' ){
          return 2;
        }else if(wd == 'md' ){
          return 2;
        }else if(wd == 'sm' ){
          return 2;
        }if(wd == 'xs' ){
          return 1;
        }
  
    }

    const listaDeEfetivo = () => {

        let info = { 
            id: turma.id,
            turma: turma.turma 
        }
          
        localStorage.setItem("turma", JSON.stringify(turma)); 
        localStorage.setItem("navBarItem", 1);

        history.push(`/UserHome`);

    }

    const listarEfetivo = () => {
         return (

            <>
                Pode ser alterado a qualquer momento.
             <div className={classes.selecionarEfetivoContainer}>

                {renderSnackBar && <Snackbar info={renderSnackBar} />}

                <div className={classes.formControlContainer}>

                    <h3 style={{marginBottom: -8}}>Efetivo: </h3>
                    

                    <FormControl className={classes.formControl}>
                        <InputLabel style={{textAlign: 'center'}}>Ano</InputLabel>
                        <Select
                            disabled={listaTurma.length > 0 ? false : true}
                            value={turma}
                            onChange={(e) => setTurma(e.target.value)} 
                        >
                            {listaTurma && listaTurma.map( t =>(
                                
                                <MenuItem value={t}>{t.turma}</MenuItem>
                            ))}
                    
                        </Select>
                    </FormControl>
        
                
                </div>

                <Button 
                    disabled={listaTurma.length > 0 ? false : true}
                    style={{width: '100%'}}
                    className={classes.buttonSelecionar}  
                    size="small"
                    variant="contained" color="default"
                    onClick={() => listaDeEfetivo()}
                >
                    Selecionar
                </Button>

             </div>
            </>

         )
    }

    const colunas =  [

        { 
            icon: <SupervisedUserCircleIcon className={classes.avatarIcon}/>, 
            title: 'Listar Efetivo', desc: 'Selecione um ano para listar seu efetivo', 
            subDesc: listarEfetivo(),
            link: '/userConfig',
            func: () => ''
        },
        { 
            icon: <AddCircleIcon className={classes.avatarIcon}/>, 
            title: 'Cadastrar', desc: 'Cadastrar Efetivo', 
            subDesc: 'Cadastra um ano para alocar o efetivo referente ao mesmo. Ex: 2012, 2013...',
            link: '/userConfig',
            button: 
            <Link to={{pathname: `/cadastrarTurma`}} style={{textDecoration: 'none'}}>
                <Button size="small" color="primary" variant="contained" className={classes.buttonSuccess} >
                    Cadastrar
                </Button>
            </Link>,
            func: () => ''
        },
        { 
            icon: <EditIcon className={classes.avatarIcon}/>, 
            title: 'Editar', desc: 'Editar Efetivo', 
            subDesc: 'Edita o ano referente a um efetivo já criado. EX: mudar o efetivo de 2012 para 2014.',
            link: '/EditarTurma',
            button: <Button size="small" color="primary" variant="contained" className={classes.buttonInfo} >Editar</Button>,
            func: () => ''
        },
        { 
            icon: <DeleteForeverIcon className={classes.avatarIcon}/>, 
            title: 'Excluir', desc: 'Excluir Efetivo', 
            subDesc: 'Exclui um ano e todo o efetivo relacionado ao mesmo.',
            link: '/ExcluirTurma',
            button: <Button size="small" color="primary" variant="contained" className={classes.buttonDanger} >Exluir</Button>,
            func: () => ''

        },
    ]

    if( perfil !== 'ROLE_SGTE' ){ //retira os editar e excluir turma
        colunas.splice(2,4)
    }

    const sair = ( ) => {
        localStorage.removeItem("navBarItem");
        localStorage.removeItem("userInfo");
        window.location.assign("/")
    }

    if(loading){ return <LoadingPage bg={"#bdbfc1"}/>}

    let userPerfil = getUserPerfil();

    return(

        <div className={classes.root}>

            {nenhumCadastroMsg.show && 
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10}}>
                 
                    {nenhumCadastroMsg.txt}
                    <div style={{marginTop: 10}}>
                        <Button variant="outlined" color="secondary" onClick={sair}>Sair</Button>
                    </div>

            </div>
            }

            {turma != '' && <div style={{ width: '100%', maxWidth: 1100, padding: 10}}>

                <div>
                    <List>
                        <ListItem>
                            <ListItemText primary={`Bem vindo ${userName}`} secondary={`Perfil: ${ masckPerfil(userPerfil) }`} />
                        </ListItem>
                        {listaTurma.length == 0 && <ListItem style={{background: '#f8e4b7', marginBottom: 10, borderRadius: 5, color: '#db6400'}}>
                            <ListItemText primary={`Nenhum efetivo cadastrado, para proseguir cadastre um ano para alocar um efetivo.`} />
                        </ListItem>}
                        <Divider/>
                    </List>
                </div>

                <GridList cellHeight={ props.width == 'sm' ? 260 : 220} cols={defineCols()} spacing={5}>
                    {colunas.map( (col, i) => (
                        <GridListTile key={i} cols={1} style={{padding: 5}}>
                            <Card info={col}/>
                        </GridListTile>
                    ))}
                </GridList>

                <Divider style={{marginTop: 10}}/>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    <div style={{width: '100%', maxWidth: 440}}>
                        <Button fullWidth variant="outlined" color="secondary" onClick={sair}>Sair</Button>
                    </div>
                </div>


            </div>}
            
        </div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(Efetivo))
  

