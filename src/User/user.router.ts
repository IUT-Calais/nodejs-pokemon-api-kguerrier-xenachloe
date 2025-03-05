import { Router } from 'express';
import { createUser } from './user.controller';

export const UserRouter = Router();

//Route pour créer le User
UserRouter.post('/users', createUser);

