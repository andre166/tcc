import * as Yup from 'yup';

import { validateCnpj } from '../maskAndValidators/cnpj';
import { pesquisacep } from '../maskAndValidators/cep';

export default Yup.object().shape({
    nomeOm: Yup.string().required('Digite um nome para a OM.'),
    cnpj: Yup.string().required('Digite um CNPJ.').length(14, "Deve conter 14 números.").test( '', "Não é um CNPJ válido.", value => validateCnpj(value)),
    cep: Yup.string().required('Digite um CEP.').length(8, "Deve conter 8 números.").test( '', "Não é um CEP válido.", value => pesquisacep(value)),
    nomeAbrev: Yup.string().max(15, "Deve conter no máximo 15 letras.").required('Digite um nome abreviado.'),
});