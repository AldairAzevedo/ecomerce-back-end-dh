import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório!').typeError('Digite um valor válido!'),
  email: yup.string().required('Email é obrigatório!').matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, 'Email inválido!'),
  password: yup.string().required('Senha é obrigatório!').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%])[0-9a-zA-Z$*&@#%]{8,}$/, 'Informe uma senha mais forte! Ex:(&%Ab100&&)'),
});

export const authUserSchema = yup.object().shape({
  email: yup.string().required('Email é obrigatório!').matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, 'Email inválido!'),
  password: yup.string().required('Senha é obrigatório!').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%])[0-9a-zA-Z$*&@#%]{8,}$/, 'Sua senha é mais forte! Ex:(&%Ab100&&)'),
});