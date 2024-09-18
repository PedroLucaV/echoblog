import sequelize from '../config/dbconfig.js'
import { DataTypes, UUIDV4 } from 'sequelize'
import Posts from './posts.js';
import Users from './users.js';

const Comments = sequelize.define('Comments',
{
    comment_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'Comments'
})

Posts.belongsToMany(Users, {through: {model: Comments, unique: false}});
Users.belongsToMany(Posts, {through: {model: Comments, unique: false}});

export default Comments;