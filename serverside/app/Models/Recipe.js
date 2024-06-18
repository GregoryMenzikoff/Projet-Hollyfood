import {Model, DataTypes} from 'sequelize';

import sequelize from '../database.js';

class Recipe extends Model {}

Recipe.init({
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    picture: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    instruction: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    total_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    difficulty: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipe'
});
export default Recipe;