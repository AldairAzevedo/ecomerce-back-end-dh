import bycript from "bcryptjs";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import UserModel from "../../models/user/userModels.js";
import { messageErrors } from "../../errors/errors.js";

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
    const eJson = JSON.stringify(e);
    const eObject = JSON.parse(eJson);
    const error = messageErrors[eObject.errors[0].path];
    throw new Error(error);
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
      message = 'Email ou senha incorretos!';
      return { status, message };
    }
  } catch (e) {
    throw new Error(e);
  }
};