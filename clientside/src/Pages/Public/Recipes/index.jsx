import React, { useEffect, useContext, useState } from 'react';
import SortForm from '../../../Components/public/sortForm';
import apiFetch from '../../../Utils/apiFetch';
import MyState from '../../../Components/public/MyContext';
import PaginateCard from '../../../Components/public/PaginateCard';


const Recipes = () => {


  const { recipes, setRecipes, checked } = useContext(MyState);

  const getRecipes = async () => {
    try {
      const data = await apiFetch('recettes', {}, 'GET');
      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const selectedTags = Object.keys(checked).filter((key) => checked[key]);

  const filteredRecipes = recipes.filter((recipe) =>
    selectedTags.every((tag) =>
      recipe.Tags.some((recipeTag) => recipeTag.name === tag)
    )
  );

  
  return (
    <main>
      <SortForm />
      <PaginateCard recipes={filteredRecipes} />
      </main>
  );
};

export default Recipes;
