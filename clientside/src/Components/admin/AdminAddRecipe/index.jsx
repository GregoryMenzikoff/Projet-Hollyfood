import React, { useState } from "react";

const CreateRecipe = ({ onCancel, onCreate, works, difficulties, ingredientsList, tagsList }) => {
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
  const [editQuote, setEditQuote] = useState("");




  const handleCreate = () => {
    const newRecipe = {
      name: editName,
      slug: editSlug,
      work: {
        title: editWork,
        synopsis: editSynopsis,
      },
      difficulty: editDifficulty,
      picture: editImage,
      Ingredients: editIngredients.map((ingredient) => ({ name: ingredient })),
      Tags: editTags.map((tag) => ({ name: tag })),
      total_time: editTime,
      instruction: editInstruction,
      servings: editServings,
      quote: editQuote,
    };

    console.log("Creating recipe with data: ", newRecipe);
    onCreate(newRecipe);
  };

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



  return (
    <section className="flex flex-wrap text-center justify-center items-center my-4">
      <article className="m-2 size-1/4 ">
      <div className="flex flex-col">
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" type="text" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="image">Image</label>
        <input id="image" name="image" type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} />
      </div>
      <div className="flex flex-col items-center m-1">
        <label className="mr-2" htmlFor="quote">Citation</label>
        <textarea id="quote" name="quote" type="text" value={editQuote} onChange={(e) => setEditQuote(e.target.value)} />
      </div>
      </article>
      <article className="m-2 size-1/4">
      <div className="flex flex-col">
        <label htmlFor="work">Oeuvre</label>
        <select value={editWork} onChange={(e) => setEditWork(e.target.value)}>
          {works.map((work) => (
            <option key={work} value={work}>{work}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="difficulty">Difficulté</label>
        <select type="text" value={editDifficulty} onChange={(e) => setEditDifficulty(e.target.value)}>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </div>
      <div className="m-2">
        <label htmlFor="ingredients">Ingrédients</label>
        {editIngredients.map((ingredient, index) => (
          <div className="flex flex-col" key={index}>
            <select type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)}>
              {ingredientsList.map((ingredient) => (
                <option key={ingredient} value={ingredient}>{ingredient}</option>
              ))}
            </select>
            <button onClick={() => removeIngredient(index)}>Retirer un ingrédient</button>
          </div>
        ))}
        <button onClick={addIngredient}>Rajouter un ingrédient</button>
      </div>
      <div className="m-2">
      <label htmlFor="tags">Tags</label>
        {editTags.map((tag, index) => (
          <div className="flex flex-col" key={index}>
            <select type="text" value={tag} onChange={(e) => handleTagChange(index, e.target.value)}>
              {tagsList.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <button onClick={() => removeTag(index)}>Retirer un tag</button>
          </div>
        ))}
        <button onClick={addTag}>Ajouter un tag</button>
      </div>
      </article>
      <article className="m-2 size-1/4">
      <div className="flex flex-col">
        <label htmlFor="time">Temp de préparation</label>
        <input id="time" type="text" value={editTime} onChange={(e) => setEditTime(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="servings">Nombre de personnes</label>
        <input id="servings" type="text" value={editServings} onChange={(e) => setEditServings(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="instruction">Instruction</label>
        <textarea id="instruction" name="instruction" type="text" value={editInstruction} onChange={(e) => setEditInstruction(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <button onClick={handleCreate}>Enregistrer</button>
        <button onClick={onCancel}>Annuler</button>
      </div>
      </article>
    </section>
  );
};

export default CreateRecipe;
