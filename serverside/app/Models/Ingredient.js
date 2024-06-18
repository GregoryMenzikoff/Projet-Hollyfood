import {Model, DataTypes} from 'sequelize';

import sequelize from '../database.js';

class Ingredient extends Model {}

Ingredient.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Ingredient",
    tableName: "ingredient"
});

export default Ingredient;