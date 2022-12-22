import { DataTypes } from "sequelize";

import sequelize from "../../config/db.js";

const UserModel = sequelize.define("user", {
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

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  sexo: {
    type: DataTypes.ENUM('M', 'F', 'O'), // M - Masculino, F - Femenino, O - Outros
    allowNull: true,
    defaultValue: null
  },

  active: {
    type: DataTypes.ENUM('A', 'I'),
    allowNull: false,
    defaultValue: 'A'
  }
});

export default UserModel;
