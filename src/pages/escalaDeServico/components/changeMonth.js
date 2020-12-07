import addDays from 'date-fns/addDays';

const nextMonth = ( setCalendarInfo, diasDaSemana, calendarInfo ) => {

    let arr = [];

    const { numAno, numMes, numDias, objData } = calendarInfo;

    let nextMonth = numMes + 1;

    let numDias2 = new Date(numAno, nextMonth, 0).getDate();

    let dataEmString = numAno + "," + nextMonth + "," + 1;
    let objData2 = new Date(dataEmString);
    
    for(let i = 1; i <= numDias2; i ++ ){
    
        if( i == 1 ){
            arr.push(
                {dia: i, data: objData2, diaDaSemana: diasDaSemana[objData2.getDay()]}
            )
        }else{
            arr.push(
                {dia: i, data: addDays(objData2, i - 1), diaDaSemana: diasDaSemana[addDays(objData2, i - 1).getDay()]}
            )
        }
    
    }

    setCalendarInfo({
        diasDoMes: arr,
        numAno: numAno,
        numMes: nextMonth,
        numDias: numDias2,
        objData: objData2
    })

}

const previusMonth = ( setCalendarInfo, diasDaSemana, calendarInfo ) => {

    let arr = [];

    const { numAno, numMes, objData } = calendarInfo;

    let previuMonth = numMes - 1;

    let numDias2 = new Date(numAno, previuMonth, 0).getDate();

    let dataEmString = numAno + "," + previuMonth + "," + 1;
    let objData2 = new Date(dataEmString);

    
    for(let i = 1; i <= numDias2; i ++ ){
    
        if( i == 1 ){
            arr.push(
                {dia: i, data: objData2, diaDaSemana: diasDaSemana[objData2.getDay()]}
            )
        }else{
            arr.push(
                {dia: i, data: addDays(objData2, i - 1), diaDaSemana: diasDaSemana[addDays(objData2, i - 1).getDay()]}
            )
        }
    
    }

    setCalendarInfo({
        diasDoMes: arr,
        numAno: numAno,
        numMes: previuMonth,
        numDias: numDias2,
        objData: objData2
    })

}

export { nextMonth, previusMonth }