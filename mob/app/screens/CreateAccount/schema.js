import * as yup from 'yup';

export default yup.object().shape({
    nickname: yup.string()
        .required("O apelido é obrigatório"),
    balance: yup.number()
        .typeError("O limite é inválido")
        .required("O limite é obrigatório"),
    type: yup.string()
        .required("O tipo da conta é obrigatório"),
    companyId: yup.string()
        .required("A instituição é obrigatória")
});