import {Model, DataTypes} from 'sequelize';

import sequelize from '../database.js';


class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    firstname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }, 
}, {
    sequelize,
    modelName: "User",
    tableName: "user"
});


export default User;