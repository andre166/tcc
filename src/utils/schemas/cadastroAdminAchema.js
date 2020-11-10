import * as Yup from 'yup';

import { validateCpf } from '../maskAndValidators/cpf';

export default Yup.object().shape({
    nome: Yup.string().required('Digite o nome completo.'),
    userName: Yup.string().required('Digite um nome de usuário.').min(5, 'Deve conter no mínimo 5 caracteres').max(14, 'Deve conter no máximo 14 caracteres'),
    perfil: Yup.string().required('Selecione um perfil.'),
    cpf: Yup.string().required('Digite o cpf.').test( '', "Não é um CPF válido.", value => validateCpf(value)),
    senha: Yup.string().required('Digite um senha.').min(5, 'Deve conter no mínimo 5 caracteres').max(20, 'Deve conter no máximo 20 caracteres'),
    om: Yup.string().required('Selecione uma OM.'),
});