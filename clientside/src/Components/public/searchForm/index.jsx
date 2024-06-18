import {useState, useEffect, useContext} from 'react';
import apiFetch from '../../../Utils/apiFetch';
import MyState from '../MyContext';

const SearchBar = () => {

const {search, setSearch, setRecipes} = useContext(MyState) // On utilise le hook useContext pour récupérer les states de MyState

const [value, setValue] = useState('') // On crée une state qui prendra par defaut une string vide


const getRecipesList = async () => { // On crée une fonction pour utiliser l'api qui renverra nos recettes 
  try {
    const data = await apiFetch('recettes', {}, 'GET');  // On utilise la fonction apiFetch pour récupérer les recettes
    setRecipes(data.recipes); // On met à jour la state recipes avec les données récupérées

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => { // On utilise un hook useEffect pour indiqué que a chaque changement de search on lui envoie la fonction api
  if (search.trim() !== '') { // Cette fonction contient une condition ou si le champs de recherche n'est pas vide elle s'active
    getRecipesList();
  }
}, [search]); // On lui passe en paramètre search pour qu'il s'active a chaque changement de search



    const handleChange = (e) => { // On crée une fonction qui prend en paramètre un événement
      setValue(
        e.target.value)
     
    }

    const handleSubmit = async (e) => { // On crée une fonction qui prend en paramètre un événement
      e.preventDefault();
      if (!value) {
        return;
      }
      setSearch(value) // On met à jour la state search avec la valeur de value
      setValue('') // On remet la valeur de value à vide
    }
    
 
    return (
        <form  className="flex" onSubmit={handleSubmit} >
            <label htmlFor=""></label>
            <input className='rounded-lg text-black md:px-10 lg:px-28 lg:ml-20' type="search" name="search" id="search" placeholder="Recherche par Films, Séries,..."  value={value} onChange={handleChange}/>
            <button aria-label="bouton pour rechercher" className='hidden hover:text-yellow-400  lg:block' type="submit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </button>
        </form>
        )
};


export default SearchBar;




