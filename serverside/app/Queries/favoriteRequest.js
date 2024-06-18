import { Recipe,  Favorite, Work} from "../Models/index.js";

// Function to get user's favorite recipes
const getFavorite = async (req, res) => {
    try {
        const userId = req.user.id; 
        const userFavorites = await Favorite.findAll({ 
            where: { user_id: userId },
            include: [
                {
                    model: Recipe,
                    as: "recipe",
                    include: [
                        {
                            model: Work,
                            as: "work",
                        },
                    ],
                },
            ],
        });
        // Extracting the list of recipe objects from userFavorites
        const favoriteRecipes = userFavorites.map(favorite => favorite.recipe);
        res.json({ favoriteRecipes }); // Sending the favorite recipes
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching favorite recipes." });
    }
};

// Function to add a recipe to user's favorites
const addFavorite = async (req, res) => { // Fonction pour ajouter une recette aux favoris de l'utilisateur
    try {
        const { recipe_id } = req.body; // Récupérer l'ID de la recette à partir du corps de la requête
        const userId = req.user.id;     // Récupérer l'ID de l'utilisateur à partir de la requête

        if (!recipe_id) { // Vérifier si l'ID de la recette est fourni
            return res.status(400).json({ error: "Recipe ID is required." });
        }

        // Check if the recipe exists
        const recipe = await Recipe.findByPk(recipe_id); // Vérifier si la recette existe
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found." });
        }

        // Check if the recipe is already in favorites
        const existingFavorite = await Favorite.findOne({ where: { user_id: userId, recipe_id } }); // Vérifier si la recette est déjà dans les favoris
        if (existingFavorite) {
            return res.status(409).json({ error: "Recipe already in favorites." });
        }

        // Add to favorites
        await Favorite.create({ user_id: userId, recipe_id }); // Ajouter aux favoris

        res.json({ message: "Recipe has been added to your favorites." });
    } catch (error) {
        console.error('Error adding recipe to favorites:', error);
        res.status(500).json({ error: "An error occurred while adding the recipe to favorites." });
    }
};

// Function to delete a recipe from user's favorites
const deleteFavorite = async (req, res) => {
    try {
        const { recipe_id } = req.body; // Récupérer l'ID de la recette à partir du corps de la requête
        const userId = req.user.id;     // Récupérer l'ID de l'utilisateur à partir de la requête

        if (!recipe_id) { // Vérifier si l'ID de la recette est fourni
            return res.status(400).json({ error: "Recipe ID is required." });
        }

        // Check if the recipe exists in user's favorites
        const existingFavorite = await Favorite.findOne({ where: { user_id: userId, recipe_id } }); // Vérifier si la recette existe dans les favoris de l'utilisateur
        if (!existingFavorite) {
            return res.status(404).json({ error: "Recipe is not in your favorites." });
        }

        // Delete the recipe from user's favorites
        await existingFavorite.destroy(); // Supprimer la recette des favoris de l'utilisateur

        res.json({ message: "Recipe has been removed from your favorites." });
    } catch (error) {
        console.error('Error deleting recipe from favorites:', error);
        res.status(500).json({ error: "An error occurred while deleting the recipe from favorites." });
    }
};

export { getFavorite, addFavorite, deleteFavorite };