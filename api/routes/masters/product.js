import express from "express";
const productRouter = express.Router();
import Product from "../../handlers/masters/product.js";
import { jwtHybrdProtect, basicAuth } from "../../middlewares/auth.js";

// productRouter.use(jwtHybrdProtect);
// productRouter.use(basicAuth);

productRouter.post("/", Product.create);
productRouter.get("/", Product.read);
productRouter.get("/:id", Product.readById);
productRouter.patch("/:id", Product.update);
productRouter.delete("/:id", Product.remove);

export default productRouter;