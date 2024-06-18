import {Model, DataTypes} from 'sequelize';
import Recipe from './Recipe.js';
import User from './User.js';
import sequelize from '../database.js';


class Favorite extends Model {}

Favorite.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, 
          key: 'id',
        },
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Recipe, 
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
      tableName: 'favorite',
      timestamps: true,
      updatedAt: 'updatedAt',
      createdAt: 'createdAt',
    }
  );

export default Favorite;