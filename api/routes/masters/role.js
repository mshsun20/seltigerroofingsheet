import express from 'express';
const roleRouter = express.Router();
import Role from '../../handlers/masters/role.js';
import { jwtHybrdProtect, basicAuth } from '../../middlewares/auth.js';

// roleRouter.use(jwtHybrdProtect);
// roleRouter.use(basicAuth);

roleRouter.post('/', Role.create);
roleRouter.get('/', Role.read);
roleRouter.get('/:id', Role.readById);
roleRouter.patch('/:id', Role.update);
roleRouter.delete('/:id', Role.remove);

export default roleRouter;