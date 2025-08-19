import {Express} from 'express';
import {userRoutes} from './user';
import {createNoticiationRoutes} from './notification';

export const createRoutes = (app: Express) => {
    userRoutes(app);
    createNoticiationRoutes(app);
}