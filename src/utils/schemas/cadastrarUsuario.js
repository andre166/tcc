import * as Yup from 'yup';

import { validateCpf } from '../maskAndValidators/cpf';

export default Yup.object().shape({
    nome: Yup.string().required('Digite o nome completo.'),
    subunidade: Yup.string().required('Escolha uma subunidade.'),
    userName: Yup.string().required('Digite um nome de usuário.').min(5, 'Deve conter no mínimo 5 caracteres').max(14, 'Deve conter no máximo 14 caracteres'),
    perfil: Yup.string().required('Selecione um perfil.'),
    cpf: Yup.string().required('Digite o cpf.').length(11, "Deve conter 11 números.").test( '', "Não é um CPF válido.", value => validateCpf(value)),
    senha: Yup.string().required('Digite um senha.').min(5, 'Deve conter no mínimo 5 caracteres').max(20, 'Deve conter no máximo 20 caracteres'),
});