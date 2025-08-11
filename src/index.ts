import { CreateServer } from "./server";
import repository from "./sequelize";

const server = CreateServer();  
const port = process.env.PORT || 3000;

server.listen(port, () => {
    try {
        repository.sequelizeClient.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }   
    console.log(`Server is running on port ${port}`);
})