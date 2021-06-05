import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido"),
    password: yup.string().min(8, "A senha deve ter no minímo 8 caracteres").required("A senha é obrigatória")
})