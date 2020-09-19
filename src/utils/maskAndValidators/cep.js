import axios from 'axios';

export async function pesquisacep( valor ) {

    if( !valor ){
        return false;
    }

    valor = valor.toString();

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            let response  = await axios.get(`https://viacep.com.br/ws/${cep}/json`)

            if( response.data.erro){
                return false;
            }else{
                return true;
            }
        }

    }

};

export function maskCep( _cep ){

    let cep = _cep.toString();

    let cep1 = cep.substring(0,5);
    let cep2 = cep.substring(5,8);

    let maskedCep = cep1 + '-' + cep2;

    return maskedCep;


}