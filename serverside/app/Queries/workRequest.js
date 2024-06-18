import { Work } from "../Models/index.js";


const getAllWorks = async (req, res) => {
    try {
        const works = await Work.findAll(); // Trouver tous les tags
        res.json({ works }); // Renvoyer tous les tags
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des tags.' });
    }
};
const createWork = async (req, res) => {
    try {
        const work = await Work.create(req.body);
        res.json({ work });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création de 'l'oeuvre'." });
    }
};

const updateWork = async (req,res)=>  {

    const { id } = req.params
    const { title, synopsis } = req.body

    try {
    
        const work = await Work.findByPk(id, {
            include: 'recipes'
        });

            await work.update({
                title : title,
                synopsis: synopsis
            }, {
                where: {
                    id: id
                }
            });

            res.json({ work });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de 'l'oeuvre'." });
    }
};


const deleteWork = async (req, res) => {
    try {
        const {id} = req.params; // ID du commentaire à supprimer
        // Rechercher le commentaire par son ID
        const work = await Work.findByPk(id);

        // Supprimer le recette
        await work.destroy();

        // Retourner une réponse réussie
        return res.status(200).json({ success: true, message: "recette supprimé avec succès." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Une erreur est survenue lors de la suppression du recette." });
    }
};

export { updateWork , createWork, deleteWork, getAllWorks };