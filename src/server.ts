import express , {Request, Response} from 'express';
// for logging
import morgan from 'morgan';
// for cors
import cors from 'cors';
import { createRoutes } from "./routes";
import errorHandler from './middleware/error-handler';
export const CreateServer = () => {
    const app = express();
    app.disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.urlencoded())
    .use(express.json())
    .use(cors())

    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'Welcome to the API'
        }); 
    })
    
    createRoutes(app);
    app.use(errorHandler);
    return app;
}