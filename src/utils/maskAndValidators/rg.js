export function maskRg( _rg ){

    let regex = /^\d{9}$/
    let testeRegex1 = regex.test( _rg );

    if( testeRegex1 ){

        let t1 = _rg.substr(0, 2);
        let t2 = _rg.substr( 2, 3);

        let t3 = _rg.substr( 5,3);

        let t4 = _rg.substr( 8, 1);

        let rgFormatado = `${t1}.${t2}.${t3}-${t4}`

        return rgFormatado;

    }

    return _rg;

}
