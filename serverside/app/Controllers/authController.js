import { processLoginForm, processSubForm, forgotPassword, resetPassword } from "../Queries/authRequest.js";

const authController = {

    // Fonction pour traiter le formulaire de connexion
    processLoginForm: async (req, res) => { 
        try {
            await processLoginForm(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
        }
    },

    // Fonction pour traiter le formulaire de soumission
    processSubForm: async (req, res) => {
        try {
            await processSubForm(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur' });
        }
    },

    // Fonction pour gérer la demande de réinitialisation de mot de passe
    forgotPassword: async (req, res) => {
        try {
            await forgotPassword(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
        }
    },

    // Fonction pour réinitialiser le mot de passe
    resetPassword: async (req, res) => { 
        try {
            await resetPassword(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur lors de la réinitialisation du mot de passe' });
        }
    },
}; 

export default authController;
