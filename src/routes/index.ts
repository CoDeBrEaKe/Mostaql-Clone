import {Express} from 'express';
import {userRoutes} from './user';

export const createRoutes = (app: Express) => {
    userRoutes(app);
}