import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

export const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Usuário precisa estar autenticado!' });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido!' });
    } else {
      return next();
    }
  });
};