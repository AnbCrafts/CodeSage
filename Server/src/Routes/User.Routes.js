import {Router} from 'express';
import { getChats, getUserData, login, register } from '../Controller/User.Controller.js';
import authMiddleware from '../Middlewares/Auth.Middleware.js';

const UserRouter = Router();

UserRouter.post('/register',register)
UserRouter.post('/login',login)
UserRouter.get('/chats',authMiddleware,getChats);
UserRouter.get('/info',authMiddleware,getUserData);

export default UserRouter