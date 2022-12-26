import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório!').trim(),
  price: yup.number().required('Preço é obrigatório!').typeError('Digite um valor válido para preço!'),
  discount: yup.number().required('Desconto é obrigatório!').typeError('Digite um valor válido para disconto!'),
  inventory: yup.number().integer('Digite um valor válido para inventário!').required('Inventário é obrigatório!'),
  id_cat: yup.number().integer('Digite um valor válido para categoria!').required('Categoria é obrigatório!'),
});