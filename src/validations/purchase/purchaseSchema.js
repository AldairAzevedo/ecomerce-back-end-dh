import * as yup from 'yup';

const type = {
  add: "add",
  decrease: "decrease",
}

export const createPurchaseSchema = yup.object().shape({
  id_user: yup.number().integer().required('Usuário é obrigatório!').typeError('Digite um valor válido para usuário!'),
  purchase: yup.object().shape({
    situation: yup.string().required('Situação é obrigatório!').matches(/[CA FA]/, 'Situação inválida!'),
  }),
  product: yup.object().shape({
    id: yup.number().integer().required('Produto é obrigatório!').typeError('Digite um valor válido para produto!'),
    quantity: yup.number().integer().required('Quantidade é obrigatório!').typeError('Digite um valor válido para quantidade!'),
    discount: yup.number().required('Disconto é obrigatório!').typeError('Digite um valor válido para disconto!'),
    price: yup.number().required('Preço é obrigatório!').typeError('Digite um valor válido para preço!')
  })
});

export const listPurchaseSchema = yup.object().shape({
  id_user: yup.number().integer().required('Usuário é obrigatório!').typeError('Digite um valor válido para usuário!'),
});

export const finalizePurchaseSchema = yup.object().shape({
  id_purchase: yup.number().integer().required('Purchase é obrigatório!').typeError('Digite um valor válido para Purchase!'),
  payment_type: yup.string().required('Situação é obrigatório!').matches(/[P C B]/, 'Situação inválida!'),
  shipping: yup.number().required('Frete é obrigatório!').typeError('Digite um valor válido para frete!')
});

export const updatePurchaseSchema = yup.object().shape({
  id_purchase: yup.number().integer().required('Purchase é obrigatório!').typeError('Digite um valor válido para Purchase!'),
  id_product: yup.number().integer().required('Produto é obrigatório!').typeError('Digite um valor válido para produto!'),
  option: yup.mixed().oneOf(Object.values(type)).required('Opção é obrigatório!'),
});

export const deletePurchaseSchema = yup.object().shape({
  id_purchase: yup.number().integer().required('Purchase é obrigatório!').typeError('Digite um valor válido para purchase!'),
  id_product: yup.number().integer().required('Produto é obrigatório!').typeError('Digite um valor válido para produto!')
});