import * as Yup from 'yup';

export default Yup.object().shape({
    senha1: Yup.string().required('Digite a nova senha.').min(5, 'Deve conter no mínimo 5 caracteres').max(20, 'Deve conter no máximo 20 caracteres'),
    senha2: Yup.string().required('Repita a nova senha.').min(5, 'Deve conter no mínimo 5 caracteres').max(20, 'Deve conter no máximo 20 caracteres'),
});
