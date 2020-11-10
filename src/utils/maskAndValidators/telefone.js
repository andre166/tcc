export function maskTelefone( _telefone ){

    let telefone = _telefone.replace(/\D/g, '');

    console.log("_telefone", telefone)

    let regex = /^\d{9}$/
    let regex2 = /^\d{10}$/
    let testeRegex1 = regex.test(telefone);
    let testeRegex2 = regex2.test(telefone);

    if( testeRegex1 ){

        let t1 = telefone.substr(0, 2);
        let t2 = telefone.substr(2, 4);
        let t3 = telefone.substr(4, 7);

        let telFormatado = `(${t1})${t2}-${t3}`

        return telFormatado;

    }else if(testeRegex2){

        let t1 = telefone.substr(0, 2);
        let t2 = telefone.substr(2, 4);
        let t3 = telefone.substr(6, 8);

        let telFormatado = `(${t1})${t2}-${t3}`

        return telFormatado;

    }

    return _telefone;

}