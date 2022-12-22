import {
  createUserService,
  loginUserService,
  deleteUser,
  listUsers,
  updateUser
} from "../../services/user/userService.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    return res.status(user.status).json(user.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    return res.status(user.status).json(user.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const listUsersController = async (req, res) => {
  try {
    const users = await listUsers();
    return res.status(users.status).json(users.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteUser(id);

    if (success) {
      return res.status(204).json();
    }

    return res.status(404).json({ message: "usuário não encontrado" });

  } catch (e) {
    console.log('caiu no erro do create')
    return res.status(400).json({ message: e.message });
  }
};


export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const user = await updateUser(id, data);

    if (!user) {
      return res.status(404).json({ message: "usuário não encontrado" })
    }

    return res.json(user);

  } catch (e) {
    console.log('caiu no erro do create')
    return res.status(400).json({ message: e.message });
  }
};