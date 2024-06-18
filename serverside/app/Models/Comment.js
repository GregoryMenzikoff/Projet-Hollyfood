import {Model, DataTypes} from 'sequelize';

import sequelize from '../database.js';

class Comment extends Model {}

Comment.init({
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: "Comment",
    tableName: "comment"
});
export default Comment