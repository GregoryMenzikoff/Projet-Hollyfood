import User from "./User.js";
import Role from "./Role.js";
import Recipe from "./Recipe.js";
import Work from "./Work.js";
import Comment from "./Comment.js"
import Ingredient from "./Ingredient.js";
import Tag from "./Tag.js";
import Score from "./Score.js";
import Favorite from "./Favorite.js";

// Relation de l'utilisateur avec son role
User.belongsTo(Role, { foreignKey: "role_id", as: "role"});
Role.hasMany(User, { foreignKey: "role_id", as: "users"});

// Relation de la recette avec son oeuvre
Recipe.belongsTo(Work, { foreignKey: "work_id", as: "work"});
Work.hasMany(Recipe, { foreignKey: "work_id", as: "recipes"});


// Relation de la recette avec son utilisateur
Recipe.belongsTo(User, { foreignKey: "user_id", as: "user"});
User.hasMany(Recipe, { foreignKey: "user_id", as: "recipes"});

// Relation des favoris entre les utilisateurs et les recettes
User.belongsToMany(Recipe, {foreignKey:"user_id", through: Favorite });
Recipe.belongsToMany(User, {foreignKey:"recipe_id", through: Favorite });

// Relation du commentaire avec sa recette
Comment.belongsTo(Recipe, { foreignKey: "recipe_id", as: "recipe"});
Recipe.hasMany(Comment, { foreignKey: "recipe_id", as: "comments"});

// Relation du commentaire avec son utilisateur
Comment.belongsTo(User, { foreignKey: "user_id", as: "user"});
User.hasMany(Comment, { foreignKey: "user_id", as: "comments"});

// Relation entre les recette et les ingredients
Recipe.belongsToMany(Ingredient, {foreignKey:"recipe_id", through: 'recipe_has_ingredient' });
Ingredient.belongsToMany(Recipe, {foreignKey:"ingredient_id",through: 'recipe_has_ingredient' });


// Relation entre les recettes et les tags
Recipe.belongsToMany(Tag, {foreignKey:"recipe_id", through:'recipe_has_tag' });
Tag.belongsToMany(Recipe, {foreignKey:"tag_id", through: 'recipe_has_tag' });

// Relation des notes entre les utilisateurs et les recettes
User.belongsToMany(Recipe, { foreignKey: 'user_id',  through: Score });
Recipe.belongsToMany(User, {  foreignKey: 'recipe_id', through: Score });

Favorite.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });

export {User, Role, Recipe, Work, Comment, Ingredient, Tag, Score, Favorite};


