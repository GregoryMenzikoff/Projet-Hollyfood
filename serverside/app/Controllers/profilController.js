import { getOneUser, updateUser } from '../Queries/userRequest.js';
import { getFavorite, addFavorite, deleteFavorite} from '../Queries/favoriteRequest.js';

const profilController =  {

    // Fonction pour récupérer un utilisateur
    getOneUser: async (req,res) => {
        
        try {
            await getOneUser(req,res);

        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du profil utilisateur" });
        }
    },

    updateUser: async(req,res) =>{

        try {
            await updateUser(req,res);
            
        } catch (error) {
            console.error('Erreur lors de la mise à jour de  l\'utilisateur :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de  l\'utilisateur' });
        }
        },

    notFound : (req,res)=>  {
        res.status(404).json({ error: 'Ressource introuvable' });
      },
    
    

    getFavorite: async (req,res) => {
        try {
            await getFavorite(req,res);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des favoris" });
        }
    },

    addFavorite: async (req,res) => {
        try {
            await addFavorite(req,res);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'ajout de la recette aux favoris" });
        }
    },

    deleteFavorite: async (req,res) => {
        try {
            await deleteFavorite(req,res);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la recette des favoris" });
        }
    }
};

 export default profilController;