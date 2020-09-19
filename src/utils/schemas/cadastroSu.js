import * as Yup from 'yup';

export default Yup.object().shape({
    nomeSubunidade: Yup.string().nullable().required('Digite um nome abreviado.').max(14, "Deve conter 14 números."),
    nomeCompleto: Yup.string().nullable().required('Digite o nome completo.'),
});