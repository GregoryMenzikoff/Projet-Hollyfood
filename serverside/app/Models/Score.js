import {Model, DataTypes} from 'sequelize';
import Recipe from './Recipe.js';
import User from './User.js';
import sequelize from '../database.js';

class Score extends Model {}

Score.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        validate: {
          min: 0.5,
          max: 5
        }
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
      modelName: 'Score',
      tableName: 'score',
      timestamps: true,
      updatedAt: 'updatedAt',
      createdAt: 'createdAt',
    }
  );

export default Score;  
 