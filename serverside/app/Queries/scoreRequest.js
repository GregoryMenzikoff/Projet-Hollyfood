import { Recipe, Score } from "../Models/index.js";


// Vérifier si l'utilisateur a déjà noté la recette
const checkRating = async (req, res) => {
    try {
        const userId = req.user.id;

            const { slug } = req.params;    // Récupérer le slug de la recette à partir des paramètres de la requête pour trouver l'id de la recette    
            const recipe = await Recipe.findOne({ where: { slug } });
            if (!recipe) {
                return res.status(404).json({ error: "Recette non trouvée." });
            }
            const recipe_id = recipe.id; // Récupérer l'ID de la recette

            const existingScore = await Score.findOne({ // Vérifier si l'utilisateur a déjà noté la recette
                where: {
                    recipe_id,
                    user_id: userId
                }
            });
            if (existingScore) {
                return res.status(200).json({ hasRated: true}); // Retourner true si l'utilisateur a déjà noté la recette.
            } else {
                return res.status(200).json({ hasRated: false }); // Retourner false si l'utilisateur n'a pas encore noté la recette.
            }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "CheckRating Internal server error." });
    }
};
 
// Noter une recette
const recipeRating = async (req, res) => {
    try {
        const { recipe_id } = req.body; // Récupérer l'ID de la recette à partir du corps de la requête
        const userId = req.user.id;     // Récupérer l'ID de l'utilisateur à partir de la requête

        if (!recipe_id) { // Vérifier si l'ID de la recette est fourni
            return res.status(400).json({ error: "Recipe ID is required." });
        }

        // Créer une nouvelle note
        await Score.create({
            recipe_id,
            user_id: userId,
            rating: req.body.rating
        });
        res.json({ message: "La recette a bien été notée." });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Recipe Rating Internal server error." });
}
};


export { recipeRating, checkRating };