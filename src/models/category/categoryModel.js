import { DataTypes } from 'sequelize'

import sequelize from '../../config/db.js'

const CategoryModel = sequelize.define('category', {
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
    allowNull: true
  },

  active: {
    type: DataTypes.ENUM('A', 'I'),
    allowNull: false,
    defaultValue: 'A'
  }

});


export default CategoryModel;
