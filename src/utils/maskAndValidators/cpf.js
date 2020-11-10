export function validateCpf( cpfParaFormatar ){

    if( !cpfParaFormatar ){
        return false;
    }

    let cpf = cpfParaFormatar.toString();

    let regex = /^\d{11}$/
    let regex2 = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/


    let testeRegex1 = regex.test(cpfParaFormatar);
    let testeRegex2 = regex2.test(cpfParaFormatar);

    if( testeRegex1 ){

        let cpf = cpfParaFormatar.toString();
    
        let cpf1 = cpf.substring(0,3);
        let cpf2 = cpf.substring(3,6);
        let cpf3 = cpf.substring(6,9);
        let cpf4 = cpf.substring(9,11);
    
        let cpfMask = cpf1 + '.' + cpf2 + '.' + cpf3 + '-' + cpf4
    
        return cpfValido(cpfMask);

    }else if( testeRegex2 ){

        return cpfValido(cpfParaFormatar);

    }

    return false;

}

export function cpfValido(cpf){
                
    cpf = !cpf || cpf.replace(/\D/g, '');
    let cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;
    
    if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {
        return false;
    } 
    
    let x = cpf.length - 1;
    let digitosTemp = 0;
    let e = 0;
    let h = '';
    
    for (let i = 0; i <= cpf.length - 3; i++) {
        digitosTemp = cpf.substring(i, i + 1);
        e = e + (digitosTemp * x);
        x -= 1;
        h = h + digitosTemp;
    }
    
    let digitos = 11 - (e % 11);
    if (digitos === 10 || digitos === 11) {
        digitos = 0;
    }

    let cpfSemDigVer = cpf.substring(0, cpf.length - 2) + digitos;
    x = 11;
    e = 0;
    for (let j = 0; j <= (cpf.length - 2); j++) {
        e += (cpfSemDigVer.substring(j, j + 1) * x);
        x -= 1;
    }
    
    let digVerificador = 11 - (e % 11);
    if (digVerificador === 10 || digVerificador === 11) {
        digVerificador = 0;
    }
    
    return ((digitos + '' + digVerificador) === cpf.substring(cpf.length, cpf.length - 2));
}

export function maskCpf( _cpf ){

    let regex = /^\d{11}$/
    let testeRegex1 = regex.test(_cpf);

    if( testeRegex1 ){
    
        let cpf = _cpf.toString();
        
        let cpf1 = cpf.substring(0,3);
        let cpf2 = cpf.substring(3,6);
        let cpf3 = cpf.substring(6,9);
        let cpf4 = cpf.substring(9,11);
    
        let cpfMask = cpf1 + '.' + cpf2 + '.' + cpf3 + '-' + cpf4
    
        
    
        return cpfMask;
    }else{
        return _cpf;
    }

}

export function retirarMaskCpf( _cpf ){

    var cpf = _cpf.replace(/\D/g, '');

    return cpf;

}