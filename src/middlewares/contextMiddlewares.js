import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

export const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const query = req.query;
  const body = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Usuário precisa estar autenticado!' });
  };
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido!' });
    } else {
      if (query.id_user || body.id_user) {
        if (query.id_user == decoded.id || body.id_user == decoded.id) {
          return next();
        } else {
          return res.status(403).json({ message: 'O usuário é diferente da sessão atual!' });
        }
      } else {
        return next();
      };
    }
  });
};