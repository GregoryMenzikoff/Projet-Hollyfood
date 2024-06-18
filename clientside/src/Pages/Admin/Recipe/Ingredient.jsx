import React, { useState, useEffect, useContext } from 'react';
import apiFetch from '../../../Utils/apiFetch';
import MyState from '../../../Components/public/MyContext';
import ASearchBar from '../../../Components/admin/AsearchBar';
import RecipeHeader from '../../../Components/admin/AHeader/RecipeHeader';
const ManageIngredient = () => {

  const {searchAdmin} = useContext(MyState);
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredient, setFilteredIngredient] = useState([]);
  const [addNameIngredient, setAddNameIngredient] = useState("");
  const [ingredientName, setIngredientName] = useState('');
  const [editUpdate, setEditUpdate] = useState(null)
  const [addIngrdient, setAddIngredient] = useState(false);
  const [editIngredientError, setEditIngredientError] = useState("");
  

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await apiFetch('admin/ingredient');
      const sortedIngredients = data.ingredients.sort((a, b) => a.id - b.id);
      setIngredients(sortedIngredients);
      setFilteredIngredient(sortedIngredients);
    };
    fetchIngredients();
  }, []);


  useEffect(() => {
    if (searchAdmin.trim() === '') {
        setFilteredIngredient(ingredients);
    } else {
        console.log(searchAdmin);
        const newList = ingredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(searchAdmin.toLowerCase()));
        setFilteredIngredient(newList);
        console.log(newList);
    }
}, [searchAdmin, ingredients]);

  const createIngredient = async (e) => {
    e.preventDefault();
    if (addNameIngredient.trim() === "") {
      setEditIngredientError("Le champ sont requis");
      return;
    }

    const ingredientData = {
      name: addNameIngredient
    };

    try {
      const data = await apiFetch('admin/ingredient', ingredientData, 'POST');
      setIngredients(prevIngredients => [...prevIngredients, data.ingredient]);
      setAddNameIngredient("");
      setEditIngredientError('');
      setAddIngredient(false); // Masquer le formulaire après l'ajout
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setEditIngredientError(error.response.data.error);
      } else {
        setEditIngredientError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  const handleUpdate = async (ingredientId) => {

    const updatedIngredient = { 
      name: ingredientName 
    };
    
    try {
     
      const data =await apiFetch(`admin/ingredient/${ingredientId}`, updatedIngredient, 'PUT');
      console.log(data);
      if (data) {
        setIngredients(prevIngredients =>
          prevIngredients.map(ingredient =>
              ingredient.id === ingredientId ? {
                  ...ingredient,
                  name: ingredientName,
              }
                  :
                  ingredient
        ));
        setFilteredIngredient(prevIngredients =>
          prevIngredients.map(ingredient =>
              ingredient.id === ingredientId ? {
                  ...ingredient,
                  name: ingredientName,
              }
                  :
                  ingredient
        ));
        setEditUpdate(null);
      } else {
        console.error("Erreur lors de la modification du commentaire :", "La mise à jour du commentaire a échoué.");
    }
    } catch (error) {
      console.error(error);
    }
  };

  const showAdd = () => {
    setAddNameIngredient("");
    setAddIngredient(true); // Afficher le formulaire
  };

  const showUpdate = (ingredient) => {
    setEditUpdate(ingredient.id);
    setIngredientName(ingredient.name);
}

  const handleCancel = () => {
    setEditUpdate(false);
    setAddIngredient(false);
  }

  const handleDelete = async (ingredientId) => {
    try {
      const data = await apiFetch(`admin/ingredient/${ingredientId}`, {}, 'DELETE');

      if (data && data.success) {
          setIngredients(prevIngredients => prevIngredients.filter(ingredient=> ingredient.id !== ingredientId));
          setFilteredIngredient(filteredIngredient.filter(ingredient => ingredient.id !== ingredientId));
      } else {
          console.error("Erreur lors de la suppression de l'utilisateur :", data.message);
      }
  } catch (error) {
      console.error('Error deleting user:', error);
  }
  };

  

  return (
    <main className="mr-10 ml-10 mb-10">
    <div className='flex-col'>
        <RecipeHeader/> 
        <ASearchBar />
        <h2 className='bg-black text-yellow-400 font-bold mt-8 pl-10 px-4 py-2 rounded'>LISTE DES INGREDIENTS</h2>
        
        {addIngrdient ?
          <form method='post' onSubmit={createIngredient}>
            <div className='flex flex-row'>
              <div>
                <label htmlFor="addNameIngredient">Titre</label>
                <input
                  type="text"
                  id="addNameIngredient"
                  value={addNameIngredient}
                  onChange={(e) => setAddNameIngredient(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
            </div>
            {editIngredientError && <div className="error text-red-400 mb-2">{editIngredientError}</div>}
            <button type="submit" className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300'>Valider</button>
            <button
              type="button"
              className='bg-red-500 text-white ml-4 px-3 py-1 rounded hover:bg-red-700 transition duration-300'
              onClick={handleCancel}
            >
              Annuler
            </button>
          </form>
          :
          <button onClick={showAdd} className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300 mt-4'>Ajouter</button>
        }

        <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
            <thead className='bg-gray-200'>
                <tr>
                    <th className="px-4 py-2 text-center">ID</th>
                    <th className="px-4 py-2 text-center">Nom</th>
                    <th className="px-4 py-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredIngredient.map(ingredient => (
                    <tr key={ingredient.id} className="border-t border-gray-200">
                        {editUpdate === ingredient.id ?
                            <>
                                <td className="px-4 py-2 text-center">{ingredient.id}</td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="text"
                                        name="name"
                                        value={ingredientName.trim()}
                                        onChange={(e) => setIngredientName(e.target.value)}
                                        className="border border-gray-300 rounded p-1"
                                    />
                                </td>
                                <td className="px-4 py-2 flex justify-center space-x-2">
                                    <button
                                        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300'
                                        onClick={() => handleUpdate(ingredient.id)}
                                    >
                                        Enregistrer
                                    </button>
                                    <button
                                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300'
                                        onClick={handleCancel}
                                    >
                                        Annuler
                                    </button>
                                </td>
                            </>
                            :
                            <>
                                <td className="px-4 py-2 text-center">{ingredient.id}</td>
                                <td className="px-4 py-2 text-center">{ingredient.name}</td>
                                <td className="px-4 py-2 flex justify-center space-x-2">
                                    <button
                                        className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300'
                                        onClick={() => showUpdate(ingredient)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300'
                                        onClick={() => handleDelete(ingredient.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</main>
);
};

export default ManageIngredient;
