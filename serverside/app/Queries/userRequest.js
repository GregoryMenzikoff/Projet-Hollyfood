import {User, Role,  Favorite, Score}from "../Models/index.js";


// Fonction pour obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Trouver tous les utilisateurs
        return users               // Renvoyer tous les utilisateurs
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des users.' });
    }
};


// Fonction pour obtenir un utilisateur
const getOneUser = async (req, res) => {
    const {id} = req.user;                // Récupérer l'ID de l'utilisateur à partir de la requête
    try {
        const user = await User.findOne({  // Trouver l'utilisateur par son ID
            where: { id: id },
            include: [
                {
                    model: Role,
                    as: "role"
                }
            ]
        });

        if (user) {                         // Vérifier si l'utilisateur existe
            res.json({ user });           // Renvoyer l'utilisateur
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
    }
};



const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du user.' });
    }
};

const updateUser = async (req, res) => {
  
    try {
        // J'appelle les proprietés de mon formulaire

        const { id } = req.params;
        const { name, firstname, email, role_id } = req.body;

    
        // Je recherche dans ma base de donnée si un utilisateur correspond à l'id
        const user = await User.findByPk(id);

        // Si le user est trouvé je mets à jour la ou les propriété(s) 
        if (user) {
            await user.update({
                name: name,
                firstname: firstname,

                email: email,
                role_id: role_id
            },
            {
                where: {id: id}
            }
        )}
            
           // Retourner une réponse indiquant que la mise à jour du commentaire a réussi
        res.json({ success: true, message: "Commentaire mis à jour avec succès." });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du User.' });
    }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findByPk(id)

        await Favorite.destroy({ where: { user_id: id } });

        await Score.destroy({where: {user_id: id} })

        await user.destroy();

         return res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du user.' });
    }
};

export { getAllUsers, getOneUser, updateUser, createUser, deleteUser };
