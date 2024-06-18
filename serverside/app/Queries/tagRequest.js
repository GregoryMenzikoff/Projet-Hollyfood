import {Tag, Recipe} from "../Models/index.js";
// 

// Fonction pour obtenir tous les tags
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll(); // Trouver tous les tags
        res.json({ tags }); // Renvoyer tous les tags
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des tags.' });
    }
};

// Fonction pour obtenir un tag
const getOneTag = async (req, res) => {

    const tagName = req.params.name; // Récupérer le nom du tag à partir de la requête
    const tag = await Tag.findOne( // Trouver le tag par son nom et inclure les recettes
        {
            where : {name : tagName}, 
            include: [
                {
                    model: Recipe,
                    through: 'recipe_has_tag',
                    
                },
            ],
        }
    );
    try {
       
        if (tag) {
            res.json({ tag });          // Renvoyer le tag
        } else {
            res.status(404).json({ error: 'Tag non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du tag.' });
    }
};

const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.json({ tag });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du tag.' });
    }
};


const updateTag = async (req, res) => {
    const { id} = req.params;
    const {name} = req.body;

    try {
    
        const tag = await Tag.findByPk(id, {
            include: [
                {
                    model: Recipe,
                    through: 'recipe_has_tag'
                }
            ]
            
        });
        
            await tag.update({
                name
            }, {
                where: {id: id}
            });
            
            res.json({ tag });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du Tag.' });
    }
};

// Fonction pour supprimer un tag
const deleteTag = async (req, res) => {
    try {
        const {id} = req.params; // ID du commentaire à supprimer

        // Rechercher le commentaire par son ID
        const tag = await Tag.findByPk(id);

        // Supprimer le recette
        await tag.destroy();

        // Retourner une réponse réussie
        return res.status(200).json({ success: true, message: "recette supprimé avec succès." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Une erreur est survenue lors de la suppression du recette." });
    }
};

export { getAllTags, getOneTag, updateTag, createTag, deleteTag };
