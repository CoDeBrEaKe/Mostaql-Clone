import {faker} from "@faker-js/faker";
import {Seeder} from "../umzug"

const users = Array.from({length:10} , (_,index)=>({
    id:index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    description: faker.lorem.sentence(),
    specialization: faker.person.jobTitle(),
    created_at: new Date(),
    updated_at: new Date(),
}))

const notifications = Array.from({length:10} , (_,index)=>({
    id:index + 1,
    user_id: faker.number.int({min:1, max:10}),
    content: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    created_at: new Date(),
    updated_at: new Date(),
}))

export const up: Seeder = async({context:sequelize}) => {
    const queryInterface = await sequelize.getQueryInterface()
    queryInterface.bulkInsert('users', users, )
    queryInterface.bulkInsert('notifications',notifications, )
}