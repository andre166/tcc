import React, {useState} from 'react';
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

let diasDoMes = [];

const objData = new Date(),
numAno = objData.getFullYear(),
numMes = objData.getMonth()+1,
numDias = new Date(numAno, numMes, 0).getDate();

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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

const Escala = () => {

    let [ diasParaContarServico, setDiasParaContarServico] = useState(0);
    let [ showCalendar, setShowCalendar ] = useState({
        show: true,
        isForecast: 'zero',
    });

    const classes = useStyles();

    let militar = [
        {id: 1, grad: 'SD EP', nome: 'mesquita', diasDeServico: [
            {id: 1, data: 1},
            {id: 2, data: 7},
            {id: 3, data: 14},
        ] },

        {id: 2, grad: 'CB', nome: 'Billi', diasDeServico: [
            {id: 4, data: 2},
            {id: 5, data: 8},
            {id: 6, data: 15},
        ] },

        // {id: 3, grad: 'SD EV', nome: 'Kid', diasDeServico: [
        //     {id: 7, data: 3},
        //     {id: 8, data: 7},
        //     {id: 9, data: 10},
        // ] },

        // {id: 4, grad: 'SD EP', nome: 'Rugal', diasDeServico: [
        //     {id: 10, data: 4},
        //     {id: 11, data: 6},
        //     {id: 12, data: 10},
        // ] },
    ]

    const verificarServico = ( militar, data, classes, diasPrevistosDeServico ) => {

        let isService = false;
        let isFinalDeSemana = false;

        if(  militar.diasDeServico ){
            
            militar.diasDeServico.map( ( d, i ) => {
    
                if( data.dia == d.data){
                    isService = true;
                }
    
                if( data.diaDaSemana == 'Dom' || data.diaDaSemana == 'Sáb'){
                    isFinalDeSemana = true;
                }

                if( militar.diasDeServico.length -1 == i ){
                    Object.assign(militar, {ultimoDiaDeServico: d.data});

                }
    
            })
        }
        
        if( showCalendar.isForecast == 'dia' && militar.ultimoDiaDeServico && diasPrevistosDeServico !== 0){

            if( parseInt(militar.ultimoDiaDeServico) + parseInt(diasPrevistosDeServico) + 1 == data.dia){
                return classes.serviceForecast;
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
                return classes.serviceForecast; 
            }


        }


        if( isService ){

            return classes.isService;

        }else if(isFinalDeSemana){

            return classes.diasDaSemanaFeriado;

        }

        return classes.dias;

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
        }, 1000)

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

            for(let i = ultimoServico; i < numDias;){

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

    return(
        <div className={classes.containerPrincipal}>


            <div style={{display: 'flex', margin: 10}}>
                <Button style={{marginRight: 5}} color="primary" variant="outlined" onClick={gerarPrevisaoDeServico}>Gerar Previsão de serviço</Button>
                <Button color="secondary" variant="outlined" onClick={gerarPrevisaoDeServicoMensal}>Gerar Previsão de serviço Mensal</Button>
                <Button color="secondary" variant="contained" onClick={() => console.log("showCalendar", showCalendar)}>Militar</Button>
            </div>

            <div style={{display: 'flex'}}>
                A escala está quanto? <input style={{width: 50}} value={diasParaContarServico} onChange={(e) => setDiasParaContarServico(e.target.value)} type="number"></input> por 1.
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

                            { diasDoMes.map( d => (
                                <div className={d.diaDaSemana == 'Dom' || d.diaDaSemana == 'Sáb' ? classes.diasDaSemanaHeaderFeriado : classes.diasDaSemanaHeader} > { d.diaDaSemana } </div>
                            ))}

                        </div>

                    </div>

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

                                        { diasDoMes.map( d => (

                                            <div className={verificarServico( m, d, classes,  showCalendar.diasPrevistos )}>{d.dia}</div>

                                        ))}

                                    </div>
                                }

                                { showCalendar.show && showCalendar.isForecast == 'dia' && 
                                    <div className={classes.calendarioRow}>

                                        { diasDoMes.map( d => (

                                            <div className={verificarServico( m, d, classes,  showCalendar.diasPrevistos )}>{d.dia}</div>

                                        ))}

                                    </div>
                                }

                                { showCalendar.show && showCalendar.isForecast == 'mensal' && 

                                    <div className={classes.calendarioRow}>

                                        { diasDoMes.map( d => (

                                            <div className={verificarServico( showCalendar.militarComPrevisaoMensal[i], d, classes,  showCalendar.diasPrevistos)} onClick={() => console.log(m)}>{d.dia}</div>

                                        ))}

                                    </div>
                                }

                            </div>


                            { i !== militar.length - 1 && <Divider/>}

                        </>
                        ))}
                </div>

            </Paper>
        </div>
    )
}

export default Escala;