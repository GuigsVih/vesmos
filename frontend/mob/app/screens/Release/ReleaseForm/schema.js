import * as yup from 'yup';

export default yup.object().shape({
    value: yup.number()
        .typeError("O valor é inválido")
        .min(0.01, "O valor precisa ser maior que zero")
        .required("O valor é obrigatório"),
    description: yup.string()
        .required("A descrição é obrigatória"),
    categoryId: yup.string()
        .required("Selecione uma categoria"),
    paymentDate: yup.date()
        .required("Selecione uma data de pagamento"),
    payment: yup.object({
        id: yup.number()
            .typeError("Forma de pagamento é inválida")
            .required("Selecione uma forma de pagamento"),
        type: yup.string()
            .required("Selecione uma forma de pagamento")
    })
});