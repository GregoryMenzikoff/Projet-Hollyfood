import { addComment, deleteComment, getComments, updateComment } from "../Queries/commentRequest.js";
import { getOneRecipe, getAllRecipes } from "../Queries/recipeRequest.js";
import { recipeRating, checkRating } from "../Queries/scoreRequest.js";


const recipeController = {


getOneRecipe: async(req,res) =>{

try {
  await getOneRecipe(req,res);
  
} catch (error) {
  console.error('Erreur lors de la recherche de l\'utilisateur :', error);
  res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
}
},

getAllRecipes: async(req,res) => {

  try {await getAllRecipes(req,res)
  
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


checkRating: async(req,res) => {
  try {
    await checkRating(req,res);
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
  }
},

getComments: async(req,res) => {
  try {
    await getComments(req,res);
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
  }
},

addComment: async(req,res) => {
  try {
    await addComment(req,res);
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
  }
},

updateComment: async (req,res) => {
  try {
    await updateComment(req,res);
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
  }
},

deleteComment: async (req,res) => {
  try {
    await deleteComment(req,res);
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
  }
},

};

export default recipeController;
