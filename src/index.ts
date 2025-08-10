import { CreateServer } from "./server";
import repository from "./sequelize";
import { createRoutes } from "./routes";

const server = CreateServer();  
const port = process.env.PORT || 3000;

createRoutes(server);
server.listen(port, () => {
    // try {
    //     repository.sequelizeClient.authenticate();
    //     console.log('Database connection has been established successfully.');
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }   
    console.log(`Server is running on port ${port}`);
})