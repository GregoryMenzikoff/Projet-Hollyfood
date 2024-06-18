import { Ingredient, Recipe} from "../Models/index.js";

const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll({include: [{model: Recipe, through: 'recipe_has_ingredient'}]});
        res.json({ ingredients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création de 'l'oeuvre'." });
    }
};
const createIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.create(req.body);
        res.json({ ingredient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création de 'l'oeuvre'." });
    }
};

const updateIngredient = async (req,res)=>  {

    const {id} = req.params;
    const {name} = req.body;


    try {
    
        const ingredient = await Ingredient.findByPk(id, {
            include: [
                {
                    model: Recipe,
                    through: 'recipe_has_ingredient'
                }
            ]
        },);
        
        if (ingredient) {
            await ingredient.update({
                name
            },
            {
                where: {id: id}
            }
        );
        }
       
            
            res.json({ ingredient });
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de 'l'oeuvre'." });
    }
};


const deleteIngredient = async (req, res) => {
    try {
        const {id} = req.params; // ID du commentaire à supprimer

        // Rechercher le commentaire par son ID
        const ingredient = await Ingredient.findByPk(id,
            {include : [
                {
                    model: Recipe,
                    through: 'recipe_has_ingredient'
                },
            ]}
        );

        await  ingredient.removeRecipes(ingredient.Recipes);

        // Supprimer le recette
        await ingredient.destroy();

        // Retourner une réponse réussie
        return res.status(200).json({ success: true, message: "recette supprimé avec succès." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Une erreur est survenue lors de la suppression du recette." });
    }
};



export { updateIngredient , createIngredient, deleteIngredient, getAllIngredients };