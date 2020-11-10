import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
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
import AddBoxIcon from '@material-ui/icons/AddBox';
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

        inicializarForm();

    }, []);

    const inicializarForm = async () => {
  
        let turma = getTurma();
        let turmaId = turma.id;

        let cidadaoList = await listarCidadaoPorTurma( turmaId );

        console.log("cidadaoList ===>", cidadaoList)
  
        let colunas = colunaCidadao( setRowInfo, setOpenAlterKey, handleClickOpen, classes );
        
        setData(cidadaoList);
        setColumns(colunas);
        setLoading(false);
  
    }

  if(loading){ return <LoadingPage/>}

  return(
        <div className={classes.container} >
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
                                    {/* <Button className={classes.buttonSuccess} onClick={excluirUsuario} color="primary" variant="contained">
                                    Sim
                                    </Button> */}
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