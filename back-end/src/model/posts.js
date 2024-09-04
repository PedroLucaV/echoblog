import sequelize from '../config/dbconfig.js'
import { DataTypes } from 'sequelize'

const Posts = sequelize.define(
    'Posts', 
    {
        post_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
            required: true
        },
        content: {
            type: DataTypes.TEXT(),
            allowNull: false,
            required: true
        },
        author: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
            required: true
        },
        image: {
            type: DataTypes.TEXT('medium'),
            allowNull: true
        }
},
{
    tableName: "Posts",
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

export default Posts;