import {Recipe, Ingredient, Work, Tag, Score} from "../Models/index.js";
import { Sequelize} from 'sequelize';
import sequelize from '../database.js';


const getAllRecipes = async (req, res) => {


    try {
        // Récupère toutes les recettes avec leurs associations
        const recipes = await Recipe.findAll({
            include: [
                {
                    model: Work,
                    as: "work",  
                },
                {
                    model: Ingredient,
                    through: 'recipe_has_ingredient',
                },
                {
                    model: Tag,
                    through: 'recipe_has_tag'
                }
            ]
        });

        // Pour chaque recette, récupère la note moyenne
        const recipesWithScores = await Promise.all(recipes.map(async (recipe) => {
            const result = await Score.findOne({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
                ],
                where: {
                    recipe_id: recipe.id
                },
                raw: true
            });

            // Ajoute la note moyenne à l'objet recette
            recipe.dataValues.averageRating = result && result.averageRating !== null ? parseFloat(result.averageRating).toFixed(2) : null;

            return recipe;
        }));

        res.json({ recipes: recipesWithScores });
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des recettes.' });
    }
};

const getOneRecipe = async (req, res) => {
    try {
        const recipeSlug = req.params.slug;

        // Fetch the recipe by slug and include associations
        const recipe = await Recipe.findOne({
            where: { slug: recipeSlug },
            include: [
                {
                    model: Work,
                    as: "work",
                },
                {
                    model: Ingredient,
                    through: 'recipe_has_ingredient',
                },
            ],
        });

        const rating = await Score.findOne({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
            ],
            where: {
                recipe_id: recipe.id
            },
            raw: true
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Recette non trouvée.' });      }        

        res.json({ recipe, rating: rating && rating.averageRating !== null ? parseFloat(rating.averageRating).toFixed(2) : null});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la recette.' });
    }
};



const createRecipe = async (req, res) => {
  
    const userId = req.user.id
    const {slug, name, description, picture, instruction, total_time, servings, difficulty, work_id, score, Tags, Ingredients} = req.body

    try {
         // Créer le commentaire
         const recipe = await Recipe.create({
                slug: slug, 
                name: name, 
                picture: picture, 
                instruction: instruction, 
                total_time: total_time, 
                servings: servings,
                description: description,  
                difficulty: difficulty,
                score: score,
                work_id: work_id,
                user_id: userId,
            },
            {
                include: [Ingredient],
            },
            {
                include: [Tag]
            }
        );

        if (Ingredients) {
            await recipe.addIngredients(Ingredients);
        } 

        if (Tags) {
            await recipe.addTags(Tags);
        } 

         // Récupérer la recette avec les détails de l'œuvre et des relations
         const recipeWithDetails = await Recipe.findOne({
            where: { id: recipe.id },
            include: [
                {
                    model: Work,
                    as: "work",
                    attributes: ["title", "synopsis"]
                },
                {
                    model: Ingredient,
                    as: "Ingredients"
                },
                {
                    model: Tag,
                    as: "Tags"
                }
            ]
        });


         // Retourner le commentaire créé
         res.status(201).json({ recipe: recipeWithDetails  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la recette.' });
    }
};

const updateRecipe = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    // Appelle les propriétés de mon formulaire
    const { slug, name, description, picture, instruction, total_time, servings, difficulty, score, title, synopsis, Tags, Ingredients} = req.body;

    const transaction = await sequelize.transaction();

    try {
 
        // Recherche dans la base de données si la recette correspond à l'id
        const recipe = await Recipe.findByPk(id, {
            include: [
                {
                    model: Work,
                    as: 'work',
                },
                {
                    model: Ingredient,
                    through: 'recipe_has_ingredient',
                },
                {
                    model: Tag,
                    through: 'recipe_has_tag',
                },
            ],
            transaction
        },
    );



        // Si la recette est trouvée, mets à jour les propriétés
        if (recipe) {
            await recipe.update({
                slug: slug,
                name: name,
                description: description,
                picture: picture,
                instruction: instruction,
                total_time: total_time,
                servings: servings,
                difficulty: difficulty,
                score: score,
            }, {transaction}
        );

        if (recipe.work) {
            await recipe.work.update({
                title: title,
                synopsis: synopsis
            }, { transaction });
        }

        if (Ingredients) {
            await recipe.setIngredients(Ingredients, {transaction})
        }

        if (Tags) {
            await recipe.setTags(Tags, {transaction})
        }
    
        await transaction.commit();

        const updatedRecipe = await Recipe.findByPk(id, {
            include: [
                {
                    model: Work,
                    as: 'work',
                },
                {
                    model: Ingredient,
                    through: 'recipe_has_ingredient',
                },
                {
                    model: Tag,
                    through: 'recipe_has_tag',
                },
            ],
        });

            res.json({updatedRecipe });
        } else {
            await transaction.rollback();
            res.status(404).json({ error: 'Recipe non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la recette.' });
    }
};


const deleteRecipe = async (req, res) => {
    try {
        const {id} = req.params; // ID du commentaire à supprimer

        // Rechercher le commentaire par son ID
        const recipe = await Recipe.findByPk(id, {
            include: [
                {
                    model: Ingredient,
                    through: 'recipe_has_ingredient',
                },
                {
                    model: Tag,
                    through: 'recipe_has_tag',
                },
            ],
        });
        
        await recipe.removeIngredients(recipe.Ingredients);

        await recipe.removeTags(recipe.Tags);

        // Supprimer le recette
        await recipe.destroy();

        // Retourner une réponse réussie
        return res.status(200).json({ success: true, message: "recette supprimé avec succès." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Une erreur est survenue lors de la suppression du recette." });
    }
};


export { getAllRecipes, getOneRecipe, updateRecipe, createRecipe, deleteRecipe};

