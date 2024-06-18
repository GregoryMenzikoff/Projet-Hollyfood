import express from 'express';

// Import des controlleurs ici
import tagController from './Controllers/tagController.js';
import mainController from './Controllers/mainController.js';
import recipeController from './Controllers/recipeController.js';
import authController from './Controllers/authController.js';
import profilController from './Controllers/profilController.js';
import adminController from './Controllers/adminController.js';
import jwtToken from '../middlewares/jwtToken.js';
import isAdmin from '../middlewares/isAdmin.js';
import emailUnique from '../middlewares/emailUnique.js';



const router = express.Router();

// Route pour la page d'accueil
router.get('/',mainController.home);

// Route pour afficher toutes les recettes
router.get('/recettes', recipeController.getAllRecipes); 

// Route pour afficher une recette spécifique en utilisant le slug
router.get('/recettes/:slug', recipeController.getOneRecipe);
// Route pour afficher les commentaires d'une recette
router.get('/recettes/:slug/comments', recipeController.getComments)
router.post('/recettes/:slug/comments',jwtToken, recipeController.addComment)
router.put('/recettes/:slug/comments/:id',jwtToken, recipeController.updateComment)
router.delete('/recettes/:slug/comments/:id',jwtToken, recipeController.deleteComment)
//route pour verifier si un user a noté la recette
router.get('/recettes/:slug/user-rating', jwtToken, recipeController.checkRating);
//route pour noter une recette
router.post('/recettes/:slug', jwtToken, recipeController.recipeRating);

// Route pour la vérification de l'email unique
router.post('/checkEmail', emailUnique);
// Route pour afficher le formulaire d'inscription
router.post('/inscription', emailUnique ,authController.processSubForm);


// Route pour traiter les données du formulaire de connexion
router.post('/connexion', authController.processLoginForm);

// Route pour mot de passe oublié
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:id/:token', authController.resetPassword);


// Route pour afficher les recettes par tag
router.get('/tag/:name', tagController.getOneTag);

// Route pour afficher la page profil
router.route('/profil')
.get(jwtToken, profilController.getOneUser)
.put(jwtToken, profilController.updateUser);


//Routes pour gérer les favoris
router.route('/favorites')
.get(jwtToken, profilController.getFavorite)
.post(jwtToken, profilController.addFavorite)
.delete(jwtToken, profilController.deleteFavorite);

// Route pour les pages de gestion des users, recipes, works, tags, ingredients et porportions de l'administrateur
router.route('/admin/users')
.get(jwtToken, jwtToken, isAdmin, adminController.getAllUsers)


// Methode pour créer,mettre à jour et supprimer des utilisateurs
router.route('/admin/user')
.post(jwtToken, isAdmin, adminController.createUser);

router.route('/admin/user/:id')
.put(jwtToken, isAdmin, adminController.updateUser)
.delete(jwtToken, isAdmin, adminController.deleteUser);


// Methode pour créer,mettre à jour et supprimer des recettes
router.route('/admin/recettes')

.get(jwtToken, isAdmin, recipeController.getAllRecipes)
.post(jwtToken, isAdmin, adminController.createRecipe)

router.route('/admin/recettes/:id')
.put(jwtToken, isAdmin, adminController.updateRecipe)
.delete(jwtToken, isAdmin, adminController.deleteRecipe);

router.route('/admin/work')
.get(jwtToken, isAdmin, adminController.getAllWorks)
.post(jwtToken, isAdmin, adminController.createWork)
router.route('/admin/work/:id')
.put(jwtToken, isAdmin, adminController.updateWork)
.delete(jwtToken, isAdmin, adminController.deleteWork);

// Methode pour créer,mettre à jour et supprimer des tags
router.route('/admin/tag')
.get(jwtToken, isAdmin, adminController.getAllTags)
.post(jwtToken, isAdmin, adminController.createTag)
router.route('/admin/tag/:id')
.put(jwtToken, isAdmin, adminController.updateTag)
.delete(jwtToken, isAdmin, adminController.deleteTag);

// Methode pour créer,mettre à jour et supprimer des ingredients
router.route('/admin/ingredient')
.get(jwtToken, isAdmin, adminController.getAllIngredients)
.post(jwtToken, isAdmin, adminController.createIngredient)
router.route('/admin/ingredient/:id')
.put(jwtToken, isAdmin, adminController.updateIngredient)
.delete(jwtToken, isAdmin, adminController.deleteIngredient);



export default router;