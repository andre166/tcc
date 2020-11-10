import * as Yup from 'yup';

import { validateCpf } from '../maskAndValidators/cpf';

export default Yup.object().shape({
    nomeCompleto: Yup.string(),
    cpf: Yup.string().required('Digite o cpf.').test( '', "Não é um CPF válido.", value => validateCpf(value)),
    rg: Yup.string(),
    genero: Yup.string(),
    dataNasc: Yup.string(),
    email: Yup.string(),
    nomeMae: Yup.string(),
    nomePai: Yup.string(),
    estadoCivil: Yup.string(),
    tipo:  Yup.string(),
    telefone:  Yup.string(),
    numero: Yup.string(),
    ra: Yup.string().required('Digite o RA.'),
    nomeDeGuerra: Yup.string().required('Digite o nome de guerra.'),
    qm: Yup.string(),
    cpto: Yup.string(),
    dataPraca: Yup.string(),
    postGrad: Yup.string().required("Selecione uma graduação."),
    estado:  Yup.string(),
    cidade:  Yup.string(),
    bairro: Yup.string(),
    ruaLote: Yup.string(),
});
