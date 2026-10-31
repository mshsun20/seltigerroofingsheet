import express from "express";
const departmentRouter = express.Router();
import Department from "../../handlers/masters/department.js";
import { jwtHybridProtect, basicAuth } from "../../middlewares/auth.js";

// departmentRouter.use(jwtHybridProtect);
// departmentRouter.use(basicAuth);

departmentRouter.post("/", Department.create);
departmentRouter.get("/", Department.read);
departmentRouter.get("/:id", Department.readById);
departmentRouter.patch("/:id", Department.update);
departmentRouter.delete("/:id", Department.remove);

export default departmentRouter;