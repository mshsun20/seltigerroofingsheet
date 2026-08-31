import express from "express";
const stateRouter = express.Router();
import State from "../../handlers/masters/state.js";
import { jwtHybrdProtect, basicAuth } from "../../middlewares/auth.js";

// stateRouter.use(jwtHybrdProtect);
// stateRouter.use(basicAuth);

stateRouter.post("/", State.create);
stateRouter.get("/", State.read);
stateRouter.get("/:id", State.readById);
stateRouter.patch("/:id", State.update);
stateRouter.delete("/:id", State.remove);

export default stateRouter;