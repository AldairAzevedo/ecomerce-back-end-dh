import bycript from "bcryptjs";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import UserModel from "../../models/user/userModels.js";

dotenv.config();

export const createUserService = async (data) => {
  let status = 400;
  let message = '';
  try {
    const hash = bycript.hashSync(data.password, 10);
    data.password = hash;
    const userCreate = await UserModel.create({
      ...data
    });

    status = 201;
    message = 'Usuário criado com sucesso!';
    return { status, message };

  } catch (e) {
    throw new Error(e);
  }
};

export const loginUserService = async (data) => {
  let status = 400;
  let message = '';
  try {
    const user = await UserModel.findAll({
      attributes: { exclude: ['name', 'telephone', 'photo', 'sexo', 'createdAt', 'updatedAt'] },
      where: {
        email: { [Op.eq]: `${data.email}` },
      },
    });
    if (user.length > 0) {
      const passwordUser = user[0].dataValues.password;
      const id = user[0].dataValues.id;
      if (passwordUser !== null) {
        const compare = bycript.compareSync(data.password, passwordUser);
        if (compare) {
          const token = jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '60m' });
          status = 200;
          message = token;
          return { status, message };
        } else {
          status = 404;
          message = 'Email ou senha incorretos!';
          return { status, message };
        }
      } else {
        status = 401;
        message = 'Usuário não cadastrado!';
        return { status, message };
      }
    } else {
      status = 404;
      message = 'Erro desconhecido!';
      return { status, message };
    }
  } catch (e) {
    throw new Error(e);
  }
};


export const listUsers = async () => {
  let status = 400;
  let message = '';
  try {
    const listUsers = await UserModel.findAll({
      where: {
        active: "A"
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    });
    status = 200;
    message = listUsers;
    return { status, message };
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await UserModel.destroy({
      where: {
        id: id
      }
    })

    return result ? true : false;

  } catch (e) {
    throw new Error(e.message)
  }
};

export const updateUser = async (id, data) => {
  try {
    await UserModel.update(data, {
      where: {
        id
      }
    })

    const [user] = await UserModel.findAll({
      where: {
        id
      }
    })

    return user;

  } catch (e) {
    throw new Error(e.message)
  }
};