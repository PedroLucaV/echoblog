import { Sequelize } from "sequelize";
import db from "./dbs.js";

const sequelize = new Sequelize(
    db.db,
    db.user,
    db.password,
    {
        host: process.env.DB_HOST,  
        dialect: "mysql"
    }
)

export default sequelize;