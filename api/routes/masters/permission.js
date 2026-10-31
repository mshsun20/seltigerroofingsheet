import express from 'express';
const permissionRouter = express.Router();
import Permission from '../../handlers/masters/permission.js';
import { jwtHybridProtect, basicAuth } from '../../middlewares/auth.js';

// permissionRouter.use(jwtHybridProtect);
// permissionRouter.use(basicAuth);

permissionRouter.post('/', Permission.create);
permissionRouter.get('/', Permission.read);
permissionRouter.get('/:id', Permission.readById);
permissionRouter.patch('/:id', Permission.update);
permissionRouter.delete('/:id', Permission.remove);

export default permissionRouter;