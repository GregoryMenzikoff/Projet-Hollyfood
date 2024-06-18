import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';



dotenv.config()

const jwtToken = async (req,res,next) => {

        // Je controle si un token est bien dans le headers
        // Récupérer le token JWT depuis le header Authorization
        const token = req.headers.authorization
        
      
        // Vérifier si le token JWT est présent
        if (token) {
    
            const tokenVerif = token.split('Bearer')[1].trim();
            
            try {
                // Vérifier et décoder le token JWT
                const decoded = jwt.verify(tokenVerif, process.env.SECRET_TOKEN);

                console.log(decoded);

                // On décode le playload
                const userId = decoded.userId;
                const userRole = decoded.userRole;

                req.user = {
                    id: userId,
                    role: userRole
                } 


                // Passer au prochain middleware ou à la route suivante
                  next()

            } catch (error) {
                // Si une erreur se produit lors de la vérification du token JWT
                res.status(401).json({ message: 'Token JWT invalide' });
            }


        } else {
            res.status(403).json({message: 'Aucun Token existant'})
        };
};



export default jwtToken;

