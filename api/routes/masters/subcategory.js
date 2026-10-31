import express from "express";
const subcategoryRouter = express.Router();
import Subcategory from "../../handlers/masters/subcategory.js";
import { jwtHybridProtect, basicAuth } from "../../middlewares/auth.js";

// subcategoryRouter.use(jwtHybridProtect);
// subcategoryRouter.use(basicAuth);

subcategoryRouter.post("/", Subcategory.create);
subcategoryRouter.get("/", Subcategory.read);
subcategoryRouter.get("/:id", Subcategory.readById);
subcategoryRouter.patch("/:id", Subcategory.update);
subcategoryRouter.delete("/:id", Subcategory.remove);

export default subcategoryRouter;