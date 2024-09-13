import dotenv from 'dotenv';

dotenv.config();

let db = {
    db: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

if(NODE_ENV == 'test'){
    db = {
        db: process.env.DB_TEST_DB,
        user: process.env.DB_TEST_USER,
        password: process.env.DB_TEST_PASS
    }
}

export default db;