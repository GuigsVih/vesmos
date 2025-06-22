import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
        .required("O apelido é obrigatório"),
    creditLimit: yup.number()
        .typeError("O limite é inválido")
        .min(0.01, "O limite precisa ser maior que zero")
        .required("O limite é obrigatório"),
    closure: yup.number()
        .typeError("O fechamento é inválido")
        .min(1, "O dia de fechamento precisa ser maior que 0")
        .max(31, "O dia de fechamento não pode ser maior que 31")
        .required("Digite um dia para o fechamento do cartão"),
    dueDate: yup.number()
        .typeError("O vencimento é inválido")
        .min(1, "O dia do vencimento precisa ser maior que 0")
        .max(31, "O dia do vencimento não pode ser maior que 31")
        .required("Digite um dia para o vencimento do cartão"),
    accountId: yup.string()
        .required("A conta de pagamento é obrigatória")
});