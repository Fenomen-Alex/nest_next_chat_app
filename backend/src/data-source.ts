import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import 'dotenv/config';

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User],
    synchronize: true,
});
