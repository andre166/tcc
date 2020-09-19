import * as Yup from 'yup';

export default Yup.object().shape({
    nome: Yup.string().required('Digite um nome de usuário.'),
    senha: Yup.string().required('Digite uma senha.'),
});

