import { Sequelize } from 'sequelize';
import * as  dotenv from 'dotenv';

dotenv.config(); // Permet de lire le fichier .env

const sequelize = new Sequelize(process.env.DATABASE_URL) // Créer une nouvelle instance de Sequelize en utilisant la variable d'environnement DATABASE_URL

export default sequelize;