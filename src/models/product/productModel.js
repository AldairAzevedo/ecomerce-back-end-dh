import { DataTypes } from 'sequelize'

import sequelize from '../../config/db.js'
import CategoryModel from '../category/categoryModel.js';

const ProductModel = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  inventory: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: true
  },

  active: {
    type: DataTypes.ENUM('A', 'I'),
    allowNull: false,
    defaultValue: 'A'
  }

});

ProductModel.belongsTo(CategoryModel, {
  constraints: true,
  foreignKey: {
    name: 'id_cat',
    allowNull: false
  }
});


export default ProductModel;