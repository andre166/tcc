import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams, useHistory} from 'react-router-dom';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { listarCidadaoPorTurma } from '../../../components/services/cidadaoService';
import ShowRelatorio from '@lestetelecom/showrelatorio';
import { colunaCidadao } from '../../../utils/columns/colunaCidadao';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { withStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { listarTurma } from '../../../components/services/turmaService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HelpIcon from '@material-ui/icons/Help';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getUserPerfil } from '../../../components/services/localStorgeService';
import LightTooltip from '../../../utils/toolTip';
import { useStyles } from './efetivoStyle';
import LoadingPage from  '../../../components/loading';
import Card from './card/card';
import SettingsIcon from '@material-ui/icons/Settings';
import withWidth from '@material-ui/core/withWidth';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

function Efetivo( props ){
    
    const classes = useStyles();

    let [loading, setLoading] = useState(true);

    let [listaTurma, setListaTurma] = useState([]);
    let [turma, setTurma] = useState('');
    let [showTable, setShowTable] = useState('');

    let [ nenhumCadastroMsg, setNenhumCadastroMsg] = useState(false);

    useEffect(() => {
        loadPage();
    }, []);

    const loadPage = async ( ) =>{

        let response = await listarTurma( );

        if(response.length > 0){
            
            response.sort()
            setTurma(response[response.length - 1])
            setListaTurma(response);
            setNenhumCadastroMsg(false);
            setLoading(false);

        }else{
            setNenhumCadastroMsg(true);
            setLoading(false);
        }

    }

    const perfil = getUserPerfil();

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

    const listarEfetivo = () => {
         return (
             <div className={classes.selecionarEfetivoContainer}>
                <div className={classes.formControlContainer}>

                    <h3 style={{marginBottom: -8}}>Efetivo: </h3>

                    <FormControl className={classes.formControl}>
                        <InputLabel style={{textAlign: 'center'}}>Ano</InputLabel>
                        <Select
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
                    style={{width: '100%'}}
                    className={classes.buttonSuccessSm}  
                    size="small"
                    variant="contained" color="primary"
                    onClick={() => setShowTable(true)}
                >
                    Selecionar
                </Button>

             </div>

         )
    }

    const colunas =  [

        { 
            icon: <SupervisedUserCircleIcon className={classes.avatarIcon}/>, 
            title: 'Listar Efetivo', desc: 'Selecione um ano para listar seu efetivo', 
            subDesc: listarEfetivo(),
            link: '/userConfig',
            // button: <Button size="small" color="primary" variant="contained" >teste</Button>,
            func: () => ''
        },
        { 
            icon: <AddCircleIcon className={classes.avatarIcon}/>, 
            title: 'Cadastrar', desc: 'Cadastrar Efetivo', 
            subDesc: 'Cadastra um ano para alocar o efetivo referente ao mesmo. Ex: 2012, 2013...',
            link: '/userConfig',
            button: <Button size="small" color="primary" variant="contained" className={classes.buttonSuccess} >Cadastrar</Button>,
            func: () => ''
        },
        { 
            icon: <EditIcon className={classes.avatarIcon}/>, 
            title: 'Editar', desc: 'Editar Efetivo', 
            subDesc: 'Edita o ano referente a um efetivo já criado. EX: mudar o efetivo de 2012 para 2014.',
            link: '/userConfig',
            button: <Button size="small" color="primary" variant="contained" className={classes.buttonInfo} >Editar</Button>,
            func: () => ''
        },
        { 
            icon: <DeleteForeverIcon className={classes.avatarIcon}/>, 
            title: 'Excluir', desc: 'Excluir Efetivo', 
            subDesc: 'Exclui um ano e todo o efetivo relacionado ao mesmo.',
            link: '/userConfig',
            button: <Button size="small" color="primary" variant="contained" className={classes.buttonDanger} >Exluir</Button>,
            func: () => ''

        },
    ]

    if(loading){ return <LoadingPage/>}

    return(

        <div className={classes.root}>
            <GridList cellHeight={'100%'} cols={defineCols()} spacing={10}>
                {colunas.map( (col, i) => (
                    <GridListTile key={i} cols={1}>
                        <Card info={col}/>
                    </GridListTile>
                ))}
            </GridList>
            
        </div>
        // <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '100%', heigth: '100%'}}>
        //     <div className={classes.containerPrincipal}>
        //             <Grid container direction="column" justify="center" alignItems="center">
        //                     <Paper  className={classes.containerPrincipal2Paper}>

        //                         { !showTable && listaTurma.length > 0 && <Grid container direction="column" justify="center" alignItems="center">
        //                             <Paper className={classes.selecionarEfetivoContainer}>

        //                                 <h3 style={{marginBottom: -8}}>Efetivo: </h3>

        //                                 <FormControl className={classes.formControl}>
        //                                     <InputLabel style={{textAlign: 'center'}}>Ano</InputLabel>
        //                                     <Select
        //                                         value={turma}
        //                                         onChange={(e) => setTurma(e.target.value)} 
        //                                     >
        //                                     {listaTurma && listaTurma.map( t =>(
                                               
        //                                         <MenuItem value={t}>{t.turma}</MenuItem>
        //                                     ))}
                                           
        //                                     </Select>
        //                                 </FormControl>

        //                                 <Button 
        //                                     className={classes.buttonSuccessSm}  
        //                                     size="small" style={{marginBottom: -13}} 
        //                                     variant="contained" color="primary"
        //                                     onClick={() => setShowTable(true)}
        //                                 >
        //                                     Selecionar
        //                                 </Button>
                                    
        //                             </Paper>

        //                             <Paper className={classes.datepickerPaper}>
        //                                 <Link to={{pathname: `/cadastrarTurma`}} className={classes.btnLinkContainer} style={{textDecoration: 'none'}}>
        //                                     <Button variant="contained" color="primary" className={classes.buttonSuccess}>
        //                                         <div className={classes.helpContainer}>
        //                                             <AddBoxIcon style={{marginRight: 5, marginTop: -2}}/>
        //                                             <h4>Cadastrar Efetivo</h4> 
        //                                         </div>
        //                                     </Button>
        //                                 </Link>
        //                             </Paper>

        //                             <Paper className={classes.datepickerPaper}>
        //                                 <Link to={{pathname: `/EditarTurma`}} className={classes.btnLinkContainer} style={{textDecoration: 'none'}}>
        //                                     <Button variant="contained" color="primary" className={classes.buttonInfo}>
        //                                         <div className={classes.helpContainer}>
        //                                             <EditIcon style={{marginRight: 7, marginTop: -2}}/>
        //                                             <h4>Editar efetivo </h4> 
        //                                         </div>
        //                                     </Button>
        //                                 </Link>
        //                             </Paper>

        //                             <Paper className={classes.datepickerPaper}>
        //                                 <Link to={{pathname: `/ExcluirTurma`}} className={classes.btnLinkContainer} style={{textDecoration: 'none'}}>
        //                                     <Button variant="contained" color="primary" className={classes.buttonDanger}>
        //                                         <div className={classes.helpContainer}>
        //                                             <RemoveCircleIcon style={{marginRight: 7, marginTop: -2}}/>
        //                                             <h4>Excluir efetivo </h4> 
        //                                         </div>
        //                                     </Button>
        //                                 </Link>
        //                             </Paper>

        //                             <Paper className={classes.datepickerPaper}>
        //                                 <Button variant="outlined" color="primary">
        //                                     <div className={classes.helpContainer}>
        //                                         <HelpIcon style={{marginRight: 7, marginTop: -2}}/>
        //                                         <h4>Ajuda</h4> 
        //                                     </div>
        //                                 </Button>
        //                             </Paper>

        //                         </Grid>}

        //                         {nenhumCadastroMsg == true && showTable && <Grid container direction="row" justify="center" alignItems="center" style={{heigth: 'calc(100% - 80px)'}}>
        //                             <Paper className={classes.nenhumEfetivoContainer}>
        //                                 <div style={{padding: 15}}>
        //                                     <strong >Nenhum efetivo em {selectedDate && selectedDate.getFullYear()}</strong>
        //                                     <Button
        //                                         style={{marginLeft: 10}}
        //                                         onClick={() => window.location.reload()}
        //                                         variant="outlined"
        //                                         color="primary"
        //                                         startIcon={<KeyboardReturnIcon />}
        //                                     >
        //                                         Voltar
        //                                     </Button>
        //                                 </div>
        //                             </Paper> 
        //                         </Grid>}

        //                         {showTable && <Paper  style={{padding: 10, marginTop: 90}}>
        //                         <Grid item style={{maxWidth: 'calc(100vw - 260px)'}}>
        //                             <ShowRelatorio TableDimension={ { tWidth: '100%', tHeight: 400 } } relatorio={turma.cidadao} customColumns={colunaCidadao}/>
        //                         </Grid>

        //                         </Paper>}
        //                     </Paper>

        //             </Grid>
        //     </div>
        // </MuiPickersUtilsProvider>
    );
    
}

export default withWidth()(Efetivo);

  
  

