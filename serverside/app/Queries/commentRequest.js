import  {Comment, Recipe}  from "../Models/index.js";

const getComments = async (req,res) => {
    const {slug} = req.params

    try {
        const comments = await Comment.findAll({
            include: [{
                model: Recipe,
                as: "recipe",
                where: {slug: slug},
            }]
        })

        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: "Aucun commentaire trouvé." });
        }

        res.json(comments)
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'affichage des commentaires'." });
    }
};

const addComment = async (req, res) => {
    try {
        const { id } = req.user; // ID de l'utilisateur connecté
        const { slug } = req.params; // Slug de la recette
        const { description } = req.body

        // Rechercher la recette par son slug
        const recipe = await Recipe.findOne({ where: { slug: slug } });

        // Vérifier si la recette existe
        if (!recipe) {
            return res.status(404).json({ error: "Recette non trouvée." });
        }

        // Vérifier si le corps de la requête contient les informations nécessaires
        if (!description) {
            return res.status(400).json({ error: "Le champ 'description' est requis." });
        }

        // Créer le commentaire
        const createComment = await Comment.create({
            description: description,
            user_id: id,
            recipe_id: recipe.id
        });

        // Retourner le commentaire créé
        res.status(201).json(createComment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création du commentaire." });
    }
};

const updateComment = async (req, res) => {
    console.log("updateComment");
    try {
        const  userId  = req.user.id; // ID de l'utilisateur connecté
        const {  id } = req.params; // Slug de la recette
        const { description } = req.body; // Description du commentaire, ID de l'utilisateur ayant créé le commentaire et date de création du commentaire
       
        // Trouver le commentaire avec l'ID utilisateur fourni et la date de création
        const userComment = await Comment.findByPk(id, 
            {
                include: 'recipe'       
            }
                      
        );

        // Vérifier si le commentaire existe et si l'utilisateur connecté est l'auteur du commentaire
        if (!userComment || userComment.user_id !== userId) {
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier ce commentaire." });
        }

        // Mettre à jour le commentaire avec la nouvelle description
        await Comment.update({ description: description }, { where: { id: id } });

        // Retourner une réponse indiquant que la mise à jour du commentaire a réussi
        res.json({ success: true, message: "Commentaire mis à jour avec succès." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la modification du commentaire." });
    }
};



const deleteComment = async (req, res) => {
    try {
        const userId = req.user.id; // ID de l'utilisateur connecté
        const id = req.params.id; // ID du commentaire à supprimer

        // Rechercher le commentaire par son ID
        const comment = await Comment.findByPk(id);

        // Vérifier si le commentaire existe
        if (!comment) {
            return res.status(404).json({ success: false, message: "Commentaire non trouvé." });
        }

        // Vérifier si l'utilisateur connecté est le propriétaire du commentaire
        if (comment.user_id !== userId) {
            return res.status(403).json({ success: false, message: "Vous n'êtes pas autorisé à supprimer ce commentaire." });
        }

        // Supprimer le commentaire
        await comment.destroy();

        // Retourner une réponse réussie
        return res.status(200).json({ success: true, message: "Commentaire supprimé avec succès." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Une erreur est survenue lors de la suppression du commentaire." });
    }
};

export { getComments, addComment, updateComment, deleteComment };