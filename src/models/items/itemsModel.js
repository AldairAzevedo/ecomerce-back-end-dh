import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';
import PurchaseModel from '../purchase/purchaseModel.js'
import ProductModel from '../product/productModel.js'

const ItemModel = sequelize.define('item', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

ItemModel.belongsTo(ProductModel, {
  constraints: true,
  targetKey: 'id',
  foreignKey: {
    name: 'id_prod',
    allowNull: false
  }
});

ItemModel.belongsTo(PurchaseModel, {
  constraints: true,
  targetKey: 'id',
  foreignKey: {
    name: 'id_purc',
    allowNull: false
  }
});

export default ItemModel