import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './listaEfetivoStyle';
import LoadingPage from  '../../../../components/loading';
import withWidth from '@material-ui/core/withWidth';
import { getTurma } from  '../../../../components/services/localStorgeService';
import { colunaCidadao } from '../../../../utils/columns/colunaCidadao';
import { listarCidadaoPorTurma } from '../../../../components/services/cidadaoService';
import ShowRelatorio from '@lestetelecom/showrelatorio/lib/index';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { maskCpf } from '../../../../utils/maskAndValidators/cpf';
import { maskTelefone } from '../../../../utils/maskAndValidators/telefone';
import { maskRa } from '../../../../utils/maskAndValidators/ra';
import { maskRg } from '../../../../utils/maskAndValidators/rg';
import Snackbar from '../../../../components/snackbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import verifyUserAuth from '../../../../utils/verificarUsuarioAuth';
//redux
import { connect } from 'react-redux';
import { 
    renderNavbar, renderLeftDrawner
} from '../../../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function ListaEfetivo( props ){

    if( !props.navbarState.renderNavBar ){
        props.renderNavbar(true);
    }
    
    const classes = useStyles();

    const history = useHistory();

    let [loading, setLoading] = useState(true);
    let [ renderSnackBar, setRenderSnackBar] = useState(false);
    const [data, setData] = useState([]);
    const [openAlterKey, setOpenAlterKey] = useState(false);
    const [ rowInfo, setRowInfo] = useState(false);
    const [open, setOpen] = useState(false);

    const [ nenhumaMilitarCadastrado, setNenhumaMilitarCadastrado] = useState(false);

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

        if( localStorage.getItem("snackBarAlert") ){

            let msg = JSON.parse(localStorage.getItem("snackBarAlert"));
    
            setRenderSnackBar(msg)
            
        }

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

    const loadPage = async () => {
  
        let turma = getTurma();
        let turmaId = turma.id;

        let cidadaoList = await listarCidadaoPorTurma( turmaId );

        if( cidadaoList[0] == undefined ){

            setNenhumaMilitarCadastrado(true);
            setLoading(false);
            return;
        }

        cidadaoList.map( c => {

            c.cpf = maskCpf( c.cpf );
            c.telefone = maskTelefone( c.telefone );
            c.ra = maskRa( c.ra );
            c.rg = maskRg( c.rg );

        })
  
        let colunas = colunaCidadao( setRowInfo, setOpenAlterKey, handleClickOpen, classes );
        
        setData(cidadaoList);
        setColumns(colunas);
        setLoading(false);
  
    }

  if(loading){ return <LoadingPage/>}

  const goToAnotherPage = () => {

    localStorage.setItem("navBarItem", 5);

    props.renderNavbar(false);

    history.push('/CadastrarMilitar')

  }

  return(
        <div className={classes.container} >

            {renderSnackBar && <Snackbar info={renderSnackBar} />}
            {nenhumaMilitarCadastrado && 
                <div style={{borderTop: '1px solid gray', borderBottom: '1px solid #bdbfc1', padding: 5}}> 
                    <List>
                        <ListItem>
                            <ListItemText 
                                primary="Nenhum Militar cadastrado." 
                                secondary={
                                    <>
                                        Click 
                                        <Button onClick={goToAnotherPage} size="small" color="default" variant="contained" style={{marginLeft: 5, marginRight: 5}} to={'/CadastrarMilitar'}> Aqui </Button>
                                        para cadastrar um militar.
                                    </>

                                } 
                            />
                        </ListItem>
                    </List>

                </div>
            }


            {columns.lenght === 0 ? '' : 
                <>

                    {data.length > 0 && columns.length > 0 && 
                        <div style={{background: '#fff'}}>
                            <ShowRelatorio  relatorio={data} customColumns={columns}/>
                        </div>
                    }
        
                    {rowInfo &&
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            style={{overflow: 'hidden'}}
                        >

                            <>
                                <DialogTitle id="alert-dialog-title">{`Deseja excluir ${rowInfo.userName} ?`}</DialogTitle>
                                
                                <Divider style={{marginBottom: 10}}/>
                                
                                <DialogActions style={{justifyContent: 'center', marginBottom: 5}}>
                                    <Button className={classes.buttonDanger} onClick={handleClose} color="primary" variant="contained" autoFocus>
                                        não
                                    </Button>
                                </DialogActions>
                            
                            </>

                        </Dialog>
                    }
                </>
            }
        </div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(ListaEfetivo))