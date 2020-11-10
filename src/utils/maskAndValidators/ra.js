export function maskRa( _ra ){

    let regex = /^\d{12}$/
    let testeRegex1 = regex.test( _ra );

    if( testeRegex1 ){

        let t1 = _ra.substr(0, 11);
        let t2 = _ra.substr(11, 12);

        let raFormatado = `${t1}-${t2}`

        return raFormatado;

    }

    return _ra;

}