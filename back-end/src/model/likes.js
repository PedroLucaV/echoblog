import sequelize from '../config/dbconfig.js'
import { DataTypes, UUIDV4 } from 'sequelize'
import Posts from './posts.js';
import Users from './users.js';

const Likes = sequelize.define('Likes',
{
    like_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    }
},
{
    tableName: 'Likes'
})

Posts.belongsToMany(Users, {through: {model: Likes, unique: false}});
Users.belongsToMany(Posts, {through: {model: Likes, unique: false}});

export default Likes;