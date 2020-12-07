import React, {useState, useEffect } from 'react';
import { useStyles } from './estilo.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { Link, useHistory} from 'react-router-dom';
import addDays from 'date-fns/addDays';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import {militar} from './militar';
import moment from "moment";
import DetailsIcon from '@material-ui/icons/Details';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import LightTooltip from '../../../utils/toolTip';
import SpeedDial from './speedDial';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { diasDaSemana, meses } from './datasEmString';
import { nextMonth, previusMonth } from './changeMonth';

const Escala = () => {

    let [ diasParaContarServico, setDiasParaContarServico] = useState(0);
    let [ showCalendar, setShowCalendar ] = useState({
        show: true,
        isForecast: 'zero',
    });

    let [ calendarInfo, setCalendarInfo ] = useState({
        diasDoMes: [],
        numAno: '',
        numMes: '',
        numDias: '',
    });

    let [ militarOnService, setMilitarOnService ] = useState([]);

    useEffect(() => {

        loadPage();

    }, []);
    
    const loadPage = ( ) => {

        let diasDoMes = [];
        let objData = '';
        let numAno = '';
        let numMes = '';       
        
        let dataEmString = '';
        let objData2 = '';
        let mesAtual = '';
    
        objData = new Date();
        numAno = objData.getFullYear();
        numMes = objData.getMonth() + 1;        
        
        dataEmString = numAno + "," + numMes + "," + 1;
        objData2 = new Date(dataEmString);
        
        objData = objData2;
        numAno = objData.getFullYear();
        numMes = objData.getMonth() + 1;

        let numDias = new Date(numAno, numMes, 0).getDate();

        
        for(let i = 1; i <= numDias; i ++ ){
        
            if( i == 1 ){
                diasDoMes.push(
                    {dia: i, data: objData, diaDaSemana: diasDaSemana[objData.getDay()]}
                )
            }else{
                diasDoMes.push(
                    {dia: i, data: addDays(objData, i - 1), diaDaSemana: diasDaSemana[addDays(objData, i - 1).getDay()]}
                )
            }
        
        }

        setCalendarInfo({
            diasDoMes: diasDoMes,
            numAno: numAno,
            numMes: numMes,
            numDias: numDias,
            objData: objData
        })

    }

    const handleClick = ( militar, data, e ) => {

        let arr = [];
        let isSameMilitar = false;
        let militarPosition = 0;

        if( militarOnService.length === 0 ){
            arr.push({militar: militar, data: data})
        }

        militarOnService.map( ( m, i) => {

            if( m.militar.id == militar.id){
                isSameMilitar = true;
                m.data = data;
                militarPosition = i;
            }

            if( i === militarOnService.length - 1 && !isSameMilitar){
                arr.push({militar: militar, data: data});
            }
            
            arr.push({militar: m.militar, data: m.data});

        })
        
        setMilitarOnService(arr);

        setShowCalendar(( prevState ) => ({
            ...prevState,
            show: false,
        }));

        setTimeout( () => {
            setShowCalendar(( prevState ) => ({
                ...prevState,
                show: true,
            }));
        }, 500)
        

    };

    const classes = useStyles();

    const verificarServico = ( militar, data, classes, diasPrevistosDeServico, folgas, posicaoDoDiaDoMes, i ) => {

        let isService = false;
        let isFinalDeSemana = false;
        let folga = '';
        let militarInServiceList = false;

        militarOnService.map( m => {

            if( m.militar.id == militar.id &&  data.dia == m.data.dia){
                militarInServiceList = true;
            }

        });

        
        if( folgas[posicaoDoDiaDoMes] ){
            folga = folgas.length > 0 && folgas[posicaoDoDiaDoMes].folga || data.dia;
        }

        if(  militar.diasDeServico ){
            
            militar.diasDeServico.map( ( d, i ) => {
    
                if( data.dia == d.data){
                    isService = true;
                }
    
                if( militar.diasDeServico.length -1 == i ){
                    Object.assign(militar, {ultimoDiaDeServico: d.data});

                }
    
            })

        }

        if( militarInServiceList ){
            return(
                <div key={"calendarDay"+ militar.nome + data.dia + "-" + i} onClick={( e ) => handleClick(militar, data, e)} className={classes.activeForService}>

                    {isService ? 'SV' : folga}

                </div>

            )
        }

        if( data.diaDaSemana == 'Dom' || data.diaDaSemana == 'Sáb'){
            isFinalDeSemana = true;
        }
        
        if( showCalendar.isForecast == 'dia' && militar.ultimoDiaDeServico && diasPrevistosDeServico !== 0){

            if( parseInt(militar.ultimoDiaDeServico) + parseInt(diasPrevistosDeServico) + 1 == data.dia){
                return(
                    <div key={"calendarDay"+ militar.nome + data.dia + "-" + i} key={"calendarDay"+ militar.nome + data.dia + "-" + i} onClick={( e ) => handleClick(militar, data)} className={classes.serviceForecast}>

                        {folga}

                    </div>
                )
            }

        }

        
        else if( showCalendar.isForecast == 'mensal' && militar.previsaoDeServicoMensal && diasPrevistosDeServico !== 0 ){

            let hasService = false;

            militar.previsaoDeServicoMensal.map( d => {

                if( d == data.dia){
                    hasService = true;
                }

            });

            if( hasService ){
                return(
                    <div key={"calendarDay"+ militar.nome + data.dia + "-" + i} onClick={() => handleClick(militar, data)} className={classes.serviceForecast}>

                        {folga}

                    </div>
                )
            }


        }

        if( isService ){

            return(
                <div key={"calendarDay"+ militar.nome + data.dia + "-" + i} onClick={() => handleClick(militar, data)} className={classes.isService}>
                    SV
                </div>
            )

        }else if(isFinalDeSemana){

            return(
                <div key={"calendarDay"+ militar.nome + data.dia + "-" + i} onClick={(e ) => handleClick(militar, data, e)} className={classes.diasDaSemanaFeriado}>

                    {folga}

                </div>
            )
            

        }

        return(
            <div key={"calendarDay"+ militar.nome + data.dia + "-" + i} onClick={( e ) => handleClick(militar, data, e)} className={classes.dias}>

                {folga}

            </div>
        )
        

    }

    const gerarPrevisaoDeServico = () => {

        if( diasParaContarServico == 0){
            return;
        }

        setShowCalendar({
            show: false,
            isForecast: 'dia',
            diasPrevistos: diasParaContarServico,
        });

        setTimeout( () => {
            setShowCalendar({
                show: true,
                isForecast: 'dia',
                diasPrevistos: diasParaContarServico,
            });
        }, 500)

    }

    const gerarPrevisaoDeServicoMensal = () => {

        if( diasParaContarServico == 0){
            return;
        }

        let arr = [];
        let arrayMilitarFinal = [];

        let contadorAcumulativo = parseInt(diasParaContarServico);

        let arr2 = showCalendar.isForecast == 'mensal' && showCalendar.militarComPrevisaoMensal || militar;

        arr2.map( m => {

            arr = [];

            let ultimoServico = m.ultimoDiaDeServico;

            for(let i = ultimoServico; i < calendarInfo.numDias;){

                i = i + contadorAcumulativo + 1;

                arr.push(i);
            }

            if( m.previsaoDeServicoMensal ){
                m.previsaoDeServicoMensal = "aqui"
            }

            arrayMilitarFinal.push(Object.assign(m, {previsaoDeServicoMensal: arr}));

        });


        setShowCalendar({
            show: false,
            isForecast: 'mensal',
            diasPrevistos: diasParaContarServico,
            militarComPrevisaoMensal: arrayMilitarFinal
        });

        setTimeout( () => {
            setShowCalendar({
                show: true,
                isForecast: 'mensal',
                diasPrevistos: diasParaContarServico,
                militarComPrevisaoMensal: arrayMilitarFinal
            });
        }, 500)

    }

    const zerarPrevisao = () => {

        if( diasParaContarServico == 0){
            return;
        }

        setShowCalendar({
            show: false,
            isForecast: 'zero',
        });
        setDiasParaContarServico(0);

        setTimeout( () => {
            setShowCalendar({
                show: true,
                isForecast: 'zero',
            });
        }, 1000)

    }

    const teste = ( militar, classes,  diasPrevistos, i ) => {

        let diasServicos = militar.diasDeServico;

        let arr = [];

        if( diasServicos.length > 0 ){

            diasServicos.map( ( ds, i ) => {
    
                if( i === 0 ){
                    for(let i = 1; i < ds.data; i++){
                        arr.push({dia: i, isService: false, folga: i})
                    }
                    arr.push({ dia: arr.length + 1, isService: true, folga: 0 })
    
                }else{
    
                    for(let j = 1, i = arr.length + 1 ; i < ds.data; i++, j++){
    
                        arr.push({dia: i, isService: false, folga: j})
    
                    }
    
                    arr.push({ dia: arr.length + 1, isService: true, folga: 0 })
    
                }
    
            });
    
            if( arr.length < calendarInfo.numDias ){
    
                let ultimaFolga = arr[arr.length -1].folga + 1;
    
                for(let j = ultimaFolga, i = arr.length; i < calendarInfo.numDias; i++, j++){
    
                    let dia = arr[arr.length - 1].dia + 1
    
                    arr.push( {dia: dia, isService: false, folga: j} )
    
                }
            }

        }


        return (
            <>
               { calendarInfo.diasDoMes.map( ( d, posicaoDoDiaDoMes ) => (

                    verificarServico( militar, d, classes, diasPrevistos, arr, posicaoDoDiaDoMes, i  )

                ))}
            
            </>
        )

    }

    const handleNextMonth = () => {

        if( showCalendar.isForecast !== 'zero'){
            setShowCalendar( (prevState ) => ({
                ...prevState,
                isForecast: 'zero',
            }));
        }


        nextMonth( setCalendarInfo, diasDaSemana, calendarInfo );

    }

    const handlePreviusMonth = () => {

        if( showCalendar.isForecast !== 'zero'){
            setShowCalendar( (prevState ) => ({
                ...prevState,
                isForecast: 'zero',
            }));
        }

        previusMonth( setCalendarInfo, diasDaSemana, calendarInfo );

    }

    return(
        <div className={classes.containerPrincipal}>

            <div style={{display: 'flex', width: '99.9%', marginTop: 10}}>

                <Paper style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 190, fontSize: '8pt', padding: '0px 10px', marginRight: 3}}>

                    <Grid container spacing={1} alignItems="flex-end" justify="center">

                        <Grid item xs={2}>
                            <SearchIcon />
                        </Grid>

                        <Grid item xs={10}>
                            <TextField
                                label="Pesquisar..."
                                variant="standard"
                            />
                        </Grid>
                    </Grid>

                </Paper>

                <Paper className={classes.cabecalho}>

                    <div>
                        <Button 
                        size="small"
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DetailsIcon />}
                        >Detalhar</Button>
                    </div>

                    <div>
                        <ListItemText primary="Escala:" secondary="Praia"/>
                    </div>

                    <div style={{display: 'flex'}}>
                    

                        <IconButton size="small" onClick={handlePreviusMonth} disabled={calendarInfo.numMes == 1}>
                            <NavigateBeforeIcon />
                        </IconButton>

                        <ListItemText primary="Mês:" secondary={meses[ calendarInfo.numMes - 1]} style={{margin: '0px 5px'}}/>

                        <IconButton size="small" onClick={handleNextMonth} disabled={calendarInfo.numMes == 12}>
                            <NavigateNextIcon />
                        </IconButton>

                    </div>

                    <div>
                        <ListItemText primary="Efetivo total:" secondary={militar.length}/>
                    </div>

                    <div>
                        <ListItemText primary="De serviço hoje:" secondary="9"/>
                    </div>

                </Paper>

            </div>

            <Paper className={classes.root}>

                <div className={classes.calendario}>

                    <div style={{display: 'flex'}}>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60, fontSize: '8pt'}}>
                            Post/Grad
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, fontSize: '8pt'}}>
                            Nome
                        </div>

                        <div className={classes.calendarioRow}>

                            { calendarInfo.diasDoMes.map( d => (
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <div className={d.diaDaSemana == 'Dom' || d.diaDaSemana == 'Sáb' ? classes.diasDaSemanaHeaderFeriado : classes.diasDaSemanaHeader} > 

                                        <span>{ d.diaDaSemana } </span> 
                                        <span>{ d.dia } </span> 

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                    
                    <div style={{position: 'relative', height: 400, overflow: 'auto', width: '100%'}}>

                        {militar.map( (m, i) => (
                            <>
                                <div className={classes.teste}>

                                    <div className={classes.gradColumn}>
                                        {m.grad}
                                    </div>

                                    <div className={classes.namesColumn}>
                                        {m.nome}
                                    </div>

                                    { showCalendar.show && showCalendar.isForecast == 'zero' && 
                                        <div className={classes.calendarioRow}>

                                            { teste( m, classes,  showCalendar.diasPrevistos, i )}

                                        </div>
                                    }

                                    { showCalendar.show && showCalendar.isForecast == 'dia' && 
                                        <div className={classes.calendarioRow}>

                                            { teste( m, classes,  showCalendar.diasPrevistos, i )}

                                        </div>
                                    }

                                    { showCalendar.show && showCalendar.isForecast == 'mensal' && 

                                        <div className={classes.calendarioRow}>

                                            { teste( m, classes,  showCalendar.diasPrevistos, i )}

                                        </div>
                                    }

                                </div>


                                { i !== militar.length - 1 && <Divider/>}

                            </>
                            ))}
                 
                    </div>

                    <Divider style={{marginTop: 15}}/>

                    <div style={{display: 'flex', width: 400, marginTop: 10, background: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                        <h3>Lista de militares selecionados</h3>
                    </div>


                    <div style={{display: 'flex'}}>

                        <Paper elevation="4" style={{display: 'flex', height: 250, overflow: 'auto', width: 400, background: '#fff'}}>
                            
                            <div style={{display: 'flex', flexDirection: 'column', margin: 10}}>
                                {militarOnService.length === 0 ?
                                    <Alert severity="warning" style={{height: 'max-content'}}>
                                        Nenhum militar para ser posto de serviço no dia de hoje?
                                    </Alert>
                                :

                                    <div style={{display: 'flex'}}>
                                        <List dense="true" style={{width: 300}}>
                                            {militarOnService.map( m => (
                                                <>
                                                    <ListItem>

                                                        <ListItemText 
                                                            primary={m.militar.grad + ' '+  m.militar.nome } 
                                                            secondary={moment( m.data.data ).utc().format('DD/MM/YYYY')}>
                                                        </ListItemText>
                                                        
                                                        <ListItemSecondaryAction>

                                                            <LightTooltip title="Incluir de serviço">
                                                                <IconButton size="small" edge="end">
                                                                    <AssignmentTurnedInIcon size="small"/>
                                                                </IconButton>
                                                            </LightTooltip>

                                                            <LightTooltip title="Cancelar serviço">
                                                                <IconButton size="small" edge="end">
                                                                    <AssignmentReturnIcon size="small"/>
                                                                </IconButton>
                                                            </LightTooltip>


                                                            <LightTooltip title="Retirar da lista">
                                                                <IconButton size="small" edge="end">
                                                                    <ClearIcon size="small"/>
                                                                </IconButton>
                                                            </LightTooltip>

                                                        </ListItemSecondaryAction>

                                                    </ListItem>

                                                    <Divider/>
                                                
                                                </>

                                            ))}
                                        </List>

                                    
                                    </div>  
                                }
                            </div>

                        </Paper>

                        <Paper elevation="2">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <List dense="true">
                                    <LightTooltip title="Retira todos os militares da lista.">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <ClearIcon />
                                            </ListItemIcon>
                                           
                                            <ListItemText primary="Limpar lista" />
                                            
                                        </ListItem>
                                    </LightTooltip>

                                    <LightTooltip title="Coloca todos os militares da lista de serviço, nas datas selecionadas.">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <AssignmentTurnedInIcon />
                                            </ListItemIcon>
                                            
                                            <ListItemText primary="Colocar todos de serviço" />
                                            
                                        </ListItem>
                                    </LightTooltip>

                                    <LightTooltip title="Retira todos os militares da lista de serviço, nas datas selecionadas.">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <AssignmentReturnIcon />
                                            </ListItemIcon>
                                            
                                            <ListItemText primary="Retirar todos de serviço" />
                                            
                                        </ListItem>
                                    </LightTooltip>
                                        
                                    
                                </List>
                            </div>
                        </Paper>

                    </div>
                    


                </div>


            </Paper>

                <SpeedDial 
                    gerarPrevisaoDeServico={gerarPrevisaoDeServico} gerarPrevisaoDeServicoMensal={gerarPrevisaoDeServicoMensal}
                    zerarPrevisao={zerarPrevisao} diasParaContarServico={diasParaContarServico} setDiasParaContarServico={setDiasParaContarServico}
                /> 

        </div>
    )
}

export default Escala;

{/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
<div style={{display: 'flex', margin: 10}}>

    <Button style={{marginRight: 5}} color="primary" variant="outlined" onClick={gerarPrevisaoDeServico}>Gerar Previsão de serviço</Button>
    <Button style={{marginRight: 5}} color="secondary" variant="outlined" onClick={gerarPrevisaoDeServicoMensal}>Gerar Previsão de serviço Mensal</Button>
    <Button style={{marginRight: 5}} color="secondary" variant="outlined" onClick={zerarPrevisao}>Zerar Previsão</Button>

    <Button color="secondary" variant="contained" onClick={() => console.log("showCalendar", showCalendar)}>Militar</Button>
</div>

<div style={{display: 'flex'}}>
    A escala está quanto? <input style={{width: 50}} value={diasParaContarServico} onChange={(e) => setDiasParaContarServico(e.target.value)} min="0" type="number"></input> por 1.
</div>

</div> */}