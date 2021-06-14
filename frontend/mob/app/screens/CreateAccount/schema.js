import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
        .max(255, "O máximo de caracteres permitido é: 255")
        .required("O nome é obrigatório"),
    email: yup.string()
        .max(255, "O máximo de caracteres permitido é: 255")
        .required("O e-mail é obrigatório")
        .email("E-mail inválido"),
    password: yup.string()
        .min(8, "A senha deve ter no minímo 8 caracteres")
        .max(255, "O máximo de caracteres permitido é: 255")
        .required("A senha é obrigatória"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], "As senhas estão diferentes")
        .required('A confirmação da senha é obrigatória')
})