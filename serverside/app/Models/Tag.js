import {Model, DataTypes} from 'sequelize';

import sequelize from '../database.js';

class Tag extends Model {}

Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Tag",
    tableName: "tag"
});

export default Tag;