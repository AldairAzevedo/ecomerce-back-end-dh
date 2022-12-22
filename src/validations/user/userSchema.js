import * as yup from 'yup'

export const createUserSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório!').typeError('Digite um valor válido!'),
  email: yup.string().required('Email é obrigatório!').matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, 'Email inválido!'),
  password: yup.string().required('Senha é obrigatório!').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%])[0-9a-zA-Z$*&@#%]{8,}$/, 'Informe uma senha mais forte! Ex:(&%Ab100&&)'),
});

export const authUserSchema = yup.object().shape({
  email: yup.string().required('Email é obrigatório!').matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, 'Email inválido!'),
  password: yup.string().required('Senha é obrigatório!').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%])[0-9a-zA-Z$*&@#%]{8,}$/, 'Sua senha é mais forte! Ex:(&%Ab100&&)'),
});

// export const createAcountUserSchema = yup.object().shape({
//     matricula: yup.number().required('Matrícula é obrigatório*').typeError('Digite um valor válido!'),
//     senha: yup.string().required('Senha é obrigatório*').min(7, 'Senha deve possuir acima de 6 caracteres!'),
//     confSenha: yup.string().required('Senha é obrigatório*').min(7, 'Senha deve possuir acima de 6 caracteres!').oneOf([yup.ref('senha'), null], 'As senhas não são iguais!'),
//     telefone: yup.string().required('Telefone obrigatório*').matches(/^\d+$/, 'Telefone inválido!'),
// });

// export const createAcountUserTerceiroSchema = yup.object().shape({
//     nome: yup.string().required('Nome é obrigatório*'),
//     matricula: yup.number().required('Matrícula obrigatório*').typeError('Digite um valor válido!'),
//     senha: yup.string().required('Senha é obrigatório*').min(7, 'Senha deve possuir acima de 6 caracteres!'),
//     confSenha: yup.string().required('Senha é obrigatório*').min(7, 'Senha deve possuir acima de 6 caracteres!').oneOf([yup.ref('senha'), null], 'As senhas não são iguais!'),
//     telefone: yup.string().required('Telefone obrigatório*').matches(/^\d+$/, 'Telefone inválido!'),
// });

// export const forgotPasswordSchema = yup.object().shape({
//     matricula: yup.number().required('Campo obrigatório!').typeError('Valor inválido!'),
//     telefone: yup.string().required('Telefone obrigatório*').matches(/^\d+$/, 'Telefone inválido!'),
// });