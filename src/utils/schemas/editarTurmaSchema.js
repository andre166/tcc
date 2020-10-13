import * as Yup from 'yup';

export default Yup.object().shape({
    turma: Yup.string().required('Selecione o ano da Turma.')
});