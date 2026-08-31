import express from "express";
const accountRouter = express.Router();
import Account from "../handlers/account.js";
import { jwtHybrdProtect, basicAuth } from "../middlewares/auth.js";

accountRouter.use(jwtHybrdProtect);
// accountRouter.use(basicAuth);

accountRouter.post("/", Account.create);
accountRouter.get("/", Account.read);
accountRouter.get("/:id", Account.readById);
accountRouter.patch("/:id", Account.update);
accountRouter.delete("/:id", Account.remove);

export default accountRouter;