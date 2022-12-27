import dotenv from "dotenv";

import app from "./app.js";
import sequelize from "./config/db.js";

dotenv.config();

try {
  sequelize.sync(); // comentar após criar as tabelas / {force:true} para força a recriação da modelagem
  app.listen(process.env.PORT || process.env.APLICATION_PORT, () => {
    console.log(`App is running in port ${process.env.APLICATION_PORT}...`);
  });
} catch (e) {
  console.log(e);
};