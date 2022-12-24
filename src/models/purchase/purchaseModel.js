import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';
import UserModel from '../user/userModels.js'

const PurchaseModel = sequelize.define('purchase', {
  id: {
    type: DataTypes.INTEGER(6).ZEROFILL,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  payment_type: {
    type: DataTypes.ENUM('C', 'P', 'B'), // C - Cartão, P - Pix, B - Boleto
    allowNull: true
  },

  situation: {
    type: DataTypes.ENUM('FA', 'CA', 'CO'), // FA - Favorito, CA - Carrinho, CO - Compra,
    allowNull: false,
  },

  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  gross_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  net_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  shipping: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
});

PurchaseModel.belongsTo(UserModel, {
  constraints: true,
  targetKey: 'id',
  foreignKey: {
    name: 'id_user',
    allowNull: false
  }
});

export default PurchaseModel