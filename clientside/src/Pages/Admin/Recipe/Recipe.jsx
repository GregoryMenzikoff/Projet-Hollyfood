import React, { useState, useEffect, useContext } from "react";
import apiFetch from "../../../Utils/apiFetch";
import MyState from "../../../Components/public/MyContext";
import ASearchBar from "../../../Components/admin/AsearchBar";
import RecipeHeader from "../../../Components/admin/AHeader/RecipeHeader";

const AdminRecipe = () => {
  const {searchAdmin} = useContext(MyState);
  const [recipes, setRecipes] = useState([]); // Initialisé comme un tableau vide
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [addRecipe, setAddRecipe] = useState(false);
  const [editUpdate, setEditUpdate] = useState(null);
  const [recipeError, setRecipeError] = useState("");

const [addName, setAddName] = useState("");
const [addSlug, setAddSlug] = useState("");
const [addWork, setAddWork] = useState("");
const [addDifficulty, setAddDifficulty] = useState("");
const [addImage, setAddImage] = useState("");
const [addIngredients, setAddIngredients] = useState([]);
const [addTags, setAddTags] = useState([]);
const [addTime, setAddTime] = useState("");
const [addInstruction, setAddInstruction] = useState("");
const [addServings, setAddServings] = useState("");
const [addDescription, setAddDescription] = useState("");

  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editWork, setEditWork] = useState("");
  const [editSynopsis, setEditSynopsis] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editIngredients, setEditIngredients] = useState([]);
  const [editTags, setEditTags] = useState([]);
  const [editTime, setEditTime] = useState("");
  const [editInstruction, setEditInstruction] = useState("");
  const [editServings, setEditServings] = useState("");
  const [editDescription, setEditDescription] = useState("");


  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await apiFetch("admin/recettes");
      console.log(data);
      const sortedRecipes = data.recipes.sort((a, b) => a.id - b.id);
      setRecipes(sortedRecipes);
      setFilteredRecipes(sortedRecipes);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchAdmin.trim() === '') {
        setFilteredRecipes(recipes);
    } else {
        console.log(searchAdmin);
        const newList = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchAdmin.toLowerCase()));
        setFilteredRecipes(newList);
        console.log(newList);
    }
}, [searchAdmin, recipes]);

const createRecipe = async (e) => {
  e.preventDefault();
  if (addName.trim() === ""
  || addSlug.trim() === "" 
  || addWork.trim() === ""
  || addDifficulty.trim() === ""
  || addImage.trim() === ""
  || addIngredients === ""
  || addTags === ""
  || addTime.trim() === ""
  || addInstruction.trim() === ""
  || addServings.trim() === ""
  || addDescription.trim() === "") {
    setRecipeError("Les champs sont requis");
    return;
  }

  const recipeData = {
    name: addName,
    slug: addSlug,
    work_id: addWork,
    difficulty: addDifficulty,
    picture: addImage,
    Ingredients: addIngredients,
    Tags: addTags,
    total_time: addTime,
    instruction: addInstruction,
    servings: addServings,
    description: addDescription
  };

  try {
    console.log(recipeData);
    const data = await apiFetch('admin/recettes', recipeData, 'POST');
    setRecipes(prevRecipe => [...prevRecipe, data.recipe]);
    setAddName('');
    setAddSlug('');
    setAddWork("");
    setAddDifficulty('');
    setAddImage('');
    setAddIngredients([]);
    setAddTags([]);
    setAddTime('');
    setAddInstruction('');
    setAddServings('');
    setAddDescription('');
    setAddRecipe(false); // Masquer le formulaire après l'ajout
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      setRecipeError(error.response.data.error);
    } else {
      setRecipeError('Une erreur est survenue. Veuillez réessayer.');
    }
  }
};

const handleUpdate = async (recipeId) => {

  const updateRecipeData = { 
    name: editName,
    slug: editSlug,
    title: editWork,
    synopsis: editSynopsis,
    difficulty: editDifficulty,
    picture: editImage,
    Ingredients: editIngredients,
    Tags: editTags,
    total_time: editTime,
    instruction: editInstruction,
    servings: editServings,
    description: editDescription
  };

console.log(updateRecipeData);
  try {
      console.log('ingredients to update', editIngredients);
      const data = await apiFetch(`admin/recettes/${recipeId}`, updateRecipeData , 'PUT');

      if (data ) {
          setRecipes(prevRecipes =>
               prevRecipes.map(recipe => 
              recipe.id === recipeId ? {
                  ...data.updatedRecipe
                }
              
              : recipe
              
              
          ));

    
          setFilteredRecipes(prevRecipes =>
            prevRecipes.map(recipe => 
           recipe.id === recipeId ? {
               ...data.updatedRecipe
             }
           
           : recipe

       ));

          setEditUpdate(null);

          console.log({message: 'Modification reussie'})

      } else {
          console.error("Erreur lors de la modification de la recette :", "La mise à jour de la recette a échoué.");
      }
  } catch (error) {
      console.error("Erreur lors de la modification de la recette:", error);
  }
};

const handleDelete = async (recipeId) => {
  try {
    const data = await apiFetch(`admin/recettes/${recipeId}`, {}, 'DELETE');
    if (data && data.success) {
      setRecipes(prevRecipess => prevRecipess.filter(recipe => recipe.id !== recipeId));
      setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== recipeId));
    } else {
      console.error("Erreur lors de la suppression de l'œuvre :", data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const showAdd = () => {
  setAddRecipe(true)
  setAddName('')
  setAddSlug('')
  setAddWork("")
  setAddDifficulty('')
  setAddImage('')
  setAddIngredients([])
  setAddTags([])
  setAddTime('')
  setAddInstruction('')
  setAddServings('')
  setAddDescription('')
};

const showUpdate = (recipe) => {
  setEditUpdate(recipe.id)
  setEditName(recipe.name)
  setEditSlug(recipe.slug)
  setEditWork(recipe.work.title)
  setEditSynopsis(recipe.work.synopsis)
  setEditDifficulty(recipe.difficulty)
  setEditImage(recipe.picture)
  setEditIngredients(recipe.Ingredients.map((ingredient) => ingredient.id))
  setEditTags(recipe.Tags.map((tag) => tag.id))
  setEditTime(recipe.total_time)
  setEditInstruction(recipe.instruction)
  setEditServings(recipe.servings)
  setEditDescription(recipe.description)
}

const handleCancel = () => {
  setEditUpdate(false);
  setAddRecipe(false);
}


  return (
    <main className="mr-10 ml-10 mb-10">
        <div className='flex-col'>  
        <RecipeHeader/>     
        <ASearchBar/>    
        <h2 className='bg-black text-yellow-400 font-bold  mt-8 pl-10 px-4 py-2 rounded'>LISTE DES RECETTES</h2>

        {addRecipe ?
          <form method='post' onSubmit={createRecipe} className="flex flex-col w-4/5">
            <div className="flex flex-wrap">
              <div>
                  <label htmlFor="addName">Titre</label>
                  <input
                    type="text"
                    id="addName"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div>
                  <label htmlFor="addSlug">Slug</label>
                  <input
                    type="text"
                    id="addSlug"
                    value={addSlug}
                    onChange={(e) => setAddSlug(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div>
                  <label htmlFor="addWork">Work</label>
                  <input
                    type="text"
                    id="addWork"
                    value={addWork}
                    min={0}
                    onChange={(e) => setAddWork(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div>
                  <label htmlFor="addDifficulty">Difficulté</label>
                  <input
                    type="text"
                    id="addDifficulty"
                    value={addDifficulty}
                    onChange={(e) => setAddDifficulty(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div>
                  <label htmlFor="addImage">Image</label>
                  <input
                    type="text"
                    id="addImage"
                    value={addImage}
                    onChange={(e) => setAddImage(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
              
                <div>
                <label htmlFor="addIngredients">Ingredients</label>
                <input
                  type="text"
                  id="addIngredients"
                  value={addIngredients}
                  onChange={(e) => setAddIngredients(e.target.value.split(","))}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
              <div>
                <label htmlFor="addTags">Tags</label>
                <input
                  type="text"
                  id="addTags"
                  value={addTags}
                  onChange={(e) => setAddTags(e.target.value.split(","))}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
              <div>
                <label htmlFor="addTime">Temps</label>
                <input
                  type="text"
                  id="addTime"
                  value={addTime}
                  onChange={(e) => setAddTime(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
              <div>
                <label htmlFor="addInstruction">Instruction</label>
                <input
                  type="text"
                  id="addInstruction"
                  value={addInstruction}
                  onChange={(e) => setAddInstruction(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
              <div>
                <label htmlFor="addServings">Personnes</label>
                <input
                  type="text"
                  id="addServings"
                  value={addServings}
                  onChange={(e) => setAddServings(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
              <div>
                <label htmlFor="addPrice">Description</label>
                <input 
                  type="text"
                  id="addDescription"
                  value={addDescription} 
                  onChange={(e) => setAddDescription(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
            </div>     
            {recipeError && <div className="error text-red-400 mb-2">{recipeError}</div>}
            <div className="w-86">
              <button 
                type="submit" 
                className='bg-blue-500 text-white  px-3 py-1 rounded hover:bg-blue-700 transition duration-300'
                >
                  Valider
                </button>
              <button
                type="button"
                className='bg-red-500 text-white ml-4 px-3 py-1 rounded hover:bg-red-700 transition duration-300'
                onClick={handleCancel}
              >
                Annuler
              </button>
            </div>           
          </form>
          :
          <button onClick={showAdd} className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300 mt-4'>Ajouter</button>
        }


        <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
          <thead className='bg-gray-200'>
            <tr>
              <th className="px-4 py-2 text-center">Id</th>
              <th className="px-4 py-2 text-center">Nom</th>
              <th className="px-4 py-2 text-center">Slug</th>
              <th className="px-4 py-2 text-center">Œuvre</th>
              <th className="px-4 py-2 text-center">Synopsis</th>
              <th className="px-4 py-2 text-center">Difficulté</th>
              <th className="px-4 py-2 text-center">Image</th>
              <th className="px-4 py-2 text-center">Ingrédients</th>
              <th className="px-4 py-2 text-center">Tags</th>
              <th className="px-4 py-2 text-center">Temps</th>
              <th className="px-4 py-2 text-center">Instruction</th>
              <th className="px-4 py-2 text-center">Personnes</th>
              <th className="px-4 py-2 text-center">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map((recipe) => 
              <tr key={recipe.id} className="border-t border-gray-200">
                {editUpdate === recipe.id ?
                <>
                  <td className="px-4 py-2 text-center">{recipe.id}</td>
                  <td className="px-4 py-2 text-center">  
                    <input 
                      type="text" 
                      name="name" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}
                       className="border border-gray-300 rounded p-1"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="slug" 
                        value={editSlug} 
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="work" 
                        value={editWork} 
                        onChange={(e) => setEditWork(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="synopsis" 
                        value={editSynopsis} 
                        onChange={(e) => setEditSynopsis(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="difficulty" 
                        value={editDifficulty} 
                        onChange={(e) => setEditDifficulty(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="image" 
                        value={editImage} 
                        onChange={(e) => setEditImage(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td>
                    <input 
                        type="text" 
                        name="ingredient" 
                        value={editIngredients} 
                        onChange={(e) => setEditIngredients(e.target.value.split(","))}
                      />
                  </td>
                  <td>
                    <input 
                        type="text" 
                        name="tag" 
                        value={editTags} 
                        onChange={(e) => setEditTags(e.target.value.split(","))}
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="name" 
                        value={editTime} 
                        onChange={(e) => setEditTime(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="name" 
                        value={editInstruction} 
                        onChange={(e) => setEditInstruction(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="servings" 
                        value={editServings} 
                        onChange={(e) => setEditServings(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input 
                        type="text" 
                        name="quote" 
                        value={editDescription} 
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                  </td>
                  <td className="px-4 py-2 text-center">
                      <button className=' bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300' onClick={() => handleUpdate(recipe.id)}>Enregistrer</button>
                      <button className='ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300' onClick={handleCancel}>Annuler</button>
                  </td>
                </>
                :
                <>
                  <td  className="px-4 py-2 text-center">{recipe.id}</td>
                  <td  className="px-4 py-2 text-center">{recipe.name}</td>
                  <td  className="px-4 py-2 text-center">{recipe.slug}</td>
                  <td  className="px-4 py-2 text-center">{recipe.work.title}</td>
                  <td  className="px-4 py-2 text-center">{recipe.work.synopsis?.slice(0, 10) + "..."}</td>
                  <td  className="px-4 py-2 text-center">{recipe.difficulty}</td>
                  <td  className="px-4 py-2 text-center">{recipe.picture?.slice(0, 10) + "..."}</td>
                  <td  className="px-4 py-2 text-center">
                    {recipe.Ingredients.map((ingredient, index) => (
                      <span key={index}>
                        {ingredient.name}
                        {index < recipe.Ingredients.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>
                  <td>
                    {recipe.Tags.map((tag, index) => (
                      <span key={index}>
                        {tag.name}
                        {index < recipe.Tags.length - 1 ? ", " : ""}
                      </span>
                    ))} 
                  </td>
                  <td className="px-4 py-2 text-center">{recipe.total_time}</td>
                  <td className="px-4 py-2 text-center">{recipe.instruction?.slice(0, 10) + "..."}</td>
                  <td className="px-4 py-2 text-center">{recipe.servings}</td>
                  <td className="px-4 py-2 text-center">{recipe.description?.slice(0, 10) + "..."}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                      <button className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300' onClick={() => showUpdate(recipe)}>Modifier</button>
                      <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300' onClick={() => handleDelete(recipe.id)}>Supprimer</button>
                  </td>
                </>
                }
                  </tr>
            )}
          </tbody>
        </table>
        </div>
    </main>
  );
};

export default AdminRecipe;
