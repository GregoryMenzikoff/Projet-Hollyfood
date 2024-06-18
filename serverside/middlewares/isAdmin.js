import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';



dotenv.config()

const isAdmin = async (req,res,next) => {
                console.log(req.user)   
                // Si le role est bien un admin passer au prochain middleware ou à la route suivante
                if (req.user.role === 2) {
                    next();
                } else {
                    res.status(403).json({ message: 'Rôle non autorisé' });
                }
};



export default isAdmin;