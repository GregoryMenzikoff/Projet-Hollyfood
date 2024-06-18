import React, { useState, useEffect } from "react";
import apiFetch from "../../../Utils/apiFetch";

const EditRecipe = ({ recipe, onCancel, onUpdate }) => {
  const [editName, setEditName] = useState(recipe.name);
  const [editSlug, setEditSlug] = useState(recipe.slug);
  const [editWork, setEditWork] = useState(recipe.work.title);
  const [editSynopsis, setEditSynopsis] = useState(recipe.work.synopsis);
  const [editDifficulty, setEditDifficulty] = useState(recipe.difficulty);
  const [editImage, setEditImage] = useState(recipe.picture);
  const [editIngredients, setEditIngredients] = useState(recipe.Ingredients.map(ingredient => ingredient.name));
  const [editTags, setEditTags] = useState(recipe.Tags.map(tag => tag.name));
  const [editTime, setEditTime] = useState(recipe.total_time);
  const [editInstruction, setEditInstruction] = useState(recipe.instruction);
  const [editServings, setEditServings] = useState(recipe.servings);
  const [editQuote, setEditQuote] = useState(recipe.quote);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...editIngredients];
    newIngredients[index] = value;
    setEditIngredients(newIngredients);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...editTags];
    newTags[index] = value;
    setEditTags(newTags);
  };

  const addIngredient = () => {
    setEditIngredients([...editIngredients, ""]);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...editIngredients];
    newIngredients.splice(index, 1);
    setEditIngredients(newIngredients);
  };

  const addTag = () => {
    setEditTags([...editTags, ""]);
  };

  const removeTag = (index) => {
    const newTags = [...editTags];
    newTags.splice(index, 1);
    setEditTags(newTags);
  };

  const handleUpdate = async () => {
    const updateData = {
      name: editName,
      slug: editSlug,
      work: {
        title: editWork,
        synopsis: editSynopsis,
      },
      difficulty: editDifficulty,
      picture: editImage,
      Ingredients: editIngredients,
      Tags: editTags,
      total_time: editTime,
      instruction: editInstruction,
      servings: editServings,
      quote: editQuote,
    };
    console.log(updateData);
    try {
      const data = await apiFetch("admin/recettes",{recipe_id: recipe.id, updateData: updateData}, "PUT");
      if (data) {
        onUpdate(recipe.id, updateData);
        onCancel();
      } else {
        console.log({ message: "Modification échouée" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <td><input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} /></td>
      <td><input type="text" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} /></td>
      <td><input type="text" value={editWork} onChange={(e) => setEditWork(e.target.value)} /></td>
      <td><input type="text" value={editSynopsis} onChange={(e) => setEditSynopsis(e.target.value)} /></td>
      <td><input type="text" value={editDifficulty} onChange={(e) => setEditDifficulty(e.target.value)} /></td>
      <td><input type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} /></td>
      <td>
        {editIngredients.map((ingredient, index) => (
          <div key={index}>
            <input type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} />
            <button onClick={() => removeIngredient(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addIngredient}>Add Ingredient</button>
      </td>
      <td>
        {editTags.map((tag, index) => (
          <div key={index}>
            <input type="text" value={tag} onChange={(e) => handleTagChange(index, e.target.value)} />
            <button onClick={() => removeTag(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addTag}>Add Tag</button>
      </td>
      <td><input type="text" value={editTime} onChange={(e) => setEditTime(e.target.value)} /></td>
      <td><input type="text" value={editInstruction} onChange={(e) => setEditInstruction(e.target.value)} /></td>
      <td><input type="text" value={editServings} onChange={(e) => setEditServings(e.target.value)} /></td>
      <td><input type="text" value={editQuote} onChange={(e) => setEditQuote(e.target.value)} /></td>
      <td>
        <button onClick={handleUpdate}>Enregistrer</button>
        <button onClick={onCancel}>Annuler</button>
      </td>
    </>
  );
};

export default EditRecipe;
