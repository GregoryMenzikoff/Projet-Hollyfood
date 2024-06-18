import {Model, DataTypes} from 'sequelize';

import sequelize from '../database.js';

class Work extends Model {}

Work.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    quote: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    picture: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Work',
    tableName: 'work'
});
export default Work;
