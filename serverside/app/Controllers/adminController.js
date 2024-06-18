import { createUser, updateUser, deleteUser, getAllUsers, getOneUser } from "../Queries/userRequest.js"
import { createRecipe,  updateRecipe,  deleteRecipe} from "../Queries/recipeRequest.js";
import { getAllWorks,createWork, updateWork, deleteWork } from "../Queries/workRequest.js";
import { getAllTags, createTag, updateTag, deleteTag} from "../Queries/tagRequest.js";
import { getAllIngredients, createIngredient, updateIngredient, deleteIngredient } from "../Queries/ingredientRequest.js";


const adminController = {
    getOneUser: async(req,res) =>{

        try {
          await getOneUser(req,res);
          
        } catch (error) {
          console.error('Erreur lors de la recherche de l\'utilisateur :', error);
          res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
        }
        },
        
        getAllUsers: async(req,res) => {
        
          try {
            const users = await getAllUsers(req,res);
            return {
              users: res.json(users), // Renvoyer tous les users
            };
          } catch (error) {
            console.error('Erreur lors de la recherche de l\'utilisateur :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
          }
        },
        
        recipeRating: async(req,res) => {
          try {
            await recipeRating(req,res);
          } catch (error) {
            console.error('Erreur lors de la recherche de l\'utilisateur :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
          }
        }, 
    // Fonction pour la gestion des utilisateurs    
    createUser: async(req,res) =>{

        try {
          await createUser(req,res);
          
        } catch (error) {
          console.error('Erreur lors de la creation de  l\'utilisateur :', error);
          res.status(500).json({ message: 'Erreur serveur lors de la creation de  l\'utilisateur' });
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

    deleteUser: async(req,res) =>{

        try {
            await deleteUser(req,res);
            
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
        }
        },

    // Fonction pour la gestion des recettes
    createRecipe: async(req,res) =>{

            try {
            await createRecipe(req,res);
            
            } catch (error) {
            console.error('Erreur lors de la création de la recette :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la création de la recette' });
            }
            },
            
    updateRecipe: async(req,res) =>{

            try {
                await updateRecipe(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la recette :', error);
                res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la recette' });
            }
            },

    deleteRecipe: async(req,res) =>{

            try {
                
                await deleteRecipe(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la suppression de la recette:', error);
                res.status(500).json({ message: 'Erreur serveur lors de la suppression de la recette' });
            }
            },

        // Fonction pour la gestion des oeuvres


        getAllWorks: async(req,res) =>{

            try {
            await getAllWorks(req,res);
            
            } catch (error) {
            console.error('Erreur lors de la recherche de l\'oeuvre :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'oeuvre' });
        }},


    createWork: async(req,res) =>{


            try {
            await createWork(req,res);
            
            } catch (error) {
            console.error('Erreur lors de la création de la recette :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la création de la recette' });
            }
            },
            
    updateWork: async(req,res) =>{

            try {
                await updateWork(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la recette :', error);
                res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la recette' });
            }
            },
    
    deleteWork: async(req,res) =>{

            try {
                await deleteWork(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la suppression de la recette:', error);
                res.status(500).json({ message: 'Erreur serveur lors de la suppression de la recette' });
            }
            }, 


        // Fonction pour la gestion des tags

        getAllTags: async(req,res) => {
            try {
                 await getAllTags(req,res);
              
            } catch (error) {
              console.error('Erreur lors de la recherche de l\'utilisateur :', error);
              res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
            }
          },
        
    createTag: async(req,res) =>{

            try {
            await createTag(req,res);
            
            } catch (error) {
            console.error('Erreur lors de la création de la recette :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la création de la recette' });
            }
            },
            
    updateTag: async(req,res) =>{

            try {
                await updateTag(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la recette :', error);
                res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la recette' });
            }
            },

    deleteTag: async(req,res) =>{

            try {
                await deleteTag(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la suppression de la recette:', error);
                res.status(500).json({ message: 'Erreur serveur lors de la suppression de la recette' });
            }
            }, 

        

        // Fonction pour la gestion des ingredients

        getAllIngredients: async(req,res) =>{

            try {
            await getAllIngredients(req,res);
            
            } catch (error) {
            console.error('Erreur lors de la recherche de l\'oeuvre :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'oeuvre' });      

        }},
        
   

    createIngredient: async(req,res) =>{


            try {
            await createIngredient(req,res);
            
            } catch (error) {
            console.error('Erreur lors de la création de la recette :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la création de la recette' });
            }
            },
            
    updateIngredient: async(req,res) =>{

            try {
                await updateIngredient(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la recette :', error);
                res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la recette' });
            }
            },

    deleteIngredient: async(req,res) =>{

            try {
                await deleteIngredient(req,res);
                
            } catch (error) {
                console.error('Erreur lors de la suppression de la recette:', error);
                res.status(500).json({ message: 'Erreur serveur lors de la suppression de la recette' });
            }
            }, 

        
}

export default adminController;
