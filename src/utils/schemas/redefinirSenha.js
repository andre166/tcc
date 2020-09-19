import * as Yup from 'yup';

export default Yup.object().shape({
    senha1: Yup.string().required('Digite a nova senha.'),
    senha2: Yup.string().required('Repita a nova senha.'),
});
