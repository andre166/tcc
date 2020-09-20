import * as Yup from 'yup';

export default Yup.object().shape({
    nome: Yup.string().required('Digite o nome completo.'),
    userName: Yup.string().required('Digite um nome de usuário.'),
    perfil: Yup.string().required('Selecione um perfil.'),
    cpf: Yup.string().required('Digite o cpf.'),
});