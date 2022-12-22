import express from "express";
import cors from 'cors';

import userRoute from "./routes/user/user.routes.js";
import categoryRoute from "./routes/category/category.routes.js";
import productRoute from "./routes/product/products.routes.js";
import purchaseRoute from "./routes/purchase/purchase.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/purchase', purchaseRoute);

export default app;