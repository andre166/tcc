export function validateCnpj( cnpjParaFormatar ){
    
    if( !cnpjParaFormatar ){
        cnpjParaFormatar = ''
    }
    
    let regex = /^\d{14}$/
    let regex2 = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

    let testeRegex1 = regex.test(cnpjParaFormatar);
    let testeRegex2 = regex2.test(cnpjParaFormatar);

    let cnpj = cnpjParaFormatar.toString();

    if( testeRegex1 ){
 
        let cnpj1 = cnpj.substring(0,2);
        let cnpj2 = cnpj.substring(2,5);
        let cnpj3 = cnpj.substring(5,8);
        let cnpj4 = cnpj.substring(8,12);
        let cnpj5 = cnpj.substring(12,14);
    
        let cnpjMask = cnpj1 + '.' + cnpj2 + '.' + cnpj3 + '/' + cnpj4 + '-' + cnpj5;

        return cnpjValido(cnpjMask);

    }else if( testeRegex2 ){

        return cnpjValido(cnpj);
        
    }

    // return false;
    return 'a ';

}

// 05.684.074/0001-08

function cnpjValido(cnpj){

    cnpj = !cnpj || cnpj.replace(/\D/g, '');
    
    let cnpjsInvsRegex = /1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}|0{14}/;

    if (!cnpj || cnpj.length !== 14 || cnpjsInvsRegex.test(cnpj)) {
        return false;
    }
         
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0), 10)) {
        return false;
    }
         
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    
    return (resultado === parseInt(digitos.charAt(1), 10));
}

export function maskCnpj( _cnpj ){

    let cnpj = _cnpj.toString();

    let cnpj1 = cnpj.substring(0,2);
    let cnpj2 = cnpj.substring(2,5);
    let cnpj3 = cnpj.substring(5,8);
    let cnpj4 = cnpj.substring(8,12);
    let cnpj5 = cnpj.substring(12,14);

    let cnpjMask = cnpj1 + '.' + cnpj2 + '.' + cnpj3 + '/' + cnpj4 + '-' + cnpj5;

    return cnpjMask;

}

export function retirarMasckCnpj( _cnpj ){

    let regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

    let testeRegex = regex.test(_cnpj);

    let cnpj = _cnpj.toString();

    if( testeRegex ){

        let cnpj1 = cnpj.substring(0,2);
        let cnpj2 = cnpj.substring(3,6);
        let cnpj3 = cnpj.substring(7,10);
        let cnpj4 = cnpj.substring(11,15);
        let cnpj5 = cnpj.substring(16,18);
        
        let cnpjMask = cnpj1 + cnpj2 + cnpj3 + cnpj4 + cnpj5;
    
        return cnpjMask;

    }

    return _cnpj;


}