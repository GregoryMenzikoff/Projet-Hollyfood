import React, { useEffect, useContext, useState, useCallback } from 'react';
import apiFetch from "../../../Utils/apiFetch";
import { useParams } from 'react-router-dom';
import MyState from '../../../Components/public/MyContext';
import { RatedBar } from '../../../Components/public/ratingBar';
import { Rating } from 'react-simple-star-rating';
import AllComment from '../../../Components/public/CommentList';

import FavButton from '../../../Components/public/Buttons/FavButton';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const OneRecipe = () => {
  const { recipe, setRecipe, setComments} = useContext(MyState); // Récupérer la recette et la fonction de définition de la recette
  const [rating, setRating] = useState(0); // Définir la note de la recette
  const [hasRated, setHasRated] = useState(false); // Définir si l'utilisateur a déjà noté la recette
  const { slug } = useParams();
  const shareUrl = window.location.href;

  const isAuthenticated = () => { // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    return !!token;
  };

  const getOneRecipe = async () => {
    try {
      const data = await apiFetch(`recettes/${encodeURIComponent(slug)}`, {}, 'GET'); // Récupérer les détails de la recette
      setRecipe(data.recipe); // Mettre à jour la recette
      setRating(data.rating); // Mettre à jour la note de la recette

      if (isAuthenticated()) {
        const userRatingResponse = await apiFetch(`recettes/${encodeURIComponent(slug)}/user-rating`, {}, 'GET'); // Vérifier si l'utilisateur a déjà noté la recette
        if (userRatingResponse && userRatingResponse.hasRated) { // Si l'utilisateur a déjà noté la recette
          setHasRated(true);  // Mettre hasRated à true
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingClick = useCallback(async (value) => {
    setRating(value); // Mettre à jour la note de la recette
    try {
      const response = await apiFetch(`recettes/${encodeURIComponent(slug)}`, { recipe_id: recipe.id, rating: value }, 'POST'); // Noter la recette
      if (response) {
        setHasRated(true); // Mettre hasRated à true après avoir noté
        await getOneRecipe(); // Recharger la recette pour mettre à jour la note
      } else {
        console.error('Erreur lors de la soumission de la note');
      }
    } catch (error) {
      console.error(error);
      if (error.message.includes("Vous avez déjà noté la recette.")) {
        setHasRated(true);
      }
    }
  }, [recipe, slug, hasRated]);

  useEffect(() => {
    getOneRecipe();
  }, [slug, setComments]);




  return (
    <main className='flex flex-col mb-2'>
      <h2 className="text-xl font-medium my-2 text-center uppercase">{recipe?.name}</h2>
      <div className='lg:flex'>
      <div className='touch-none text-center justify-center lg:w-3/6'>
        {isAuthenticated() ? (
          hasRated ? (
            <RatedBar score={rating} />
          ) : (
            <Rating
              initialValue={rating}
              name="Control"
              emptyStyle={{ display: "flex" }}
              SVGstyle={{ display: "inline-block", marginBottom: 5 }}
              style={{ marginBottom: -5 }}
              allowFraction={false}
              allowHover={false}
              disableFillHover={true}
              size={25}
              onClick={handleRatingClick}
            />
          )
        ) : (
          <RatedBar score={rating} />
        )}
        <div className='flex justify-center'>
          <img className='size-max rounded-lg px-1 shadow-lg shadow-slate-300 mb-4' src={recipe?.picture} alt="image de la recette" />
        </div>
      </div>
      <section className='mx-2 lg:w-3/6 text-center items-center justify-center lg:mt-8'>
        <p className='italic mb-2'><span className='font-medium'>Description:  </span>{recipe?.description}</p>
        <div className='flex flex-col lg:flex-row justify-center items-center my-4'>
        {recipe?.work?.picture ? (
        <img
          className="size-3/12 rounded-lg shadow-lg shadow-slate-300"
          src={recipe.work.picture}
          alt="photo de l'oeuvre"
        />
      ) : null}
      {recipe?.work?.quote ? (
        <p className='italic mb-2 '><span className='font-medium'>Citation: </span>{recipe?.work?.quote}</p>)
        : null}
      
        </div>
        <h3 className='font-bold mb-2'>Titre: {recipe?.work?.title}</h3>
        <p className='italic mb-2 '><span className='font-medium'>Synopsis: </span>{recipe?.work?.synopsis}</p>
        <hr className='h-px lg:h-0.5 items-end bg-yellow-400 border-0' />
        
      </section> 
         
      </div>
      <section className='mx-2 text-center lg:mt-8'>
      <div className='flex flex-col justify-center items-center'>
      <hr className='h-px lg:h-0.5 my-4 bg-yellow-400 border-0 w-60'  />
          <p><span className='font-medium'>Temps de préparation:  </span> {recipe?.total_time}</p>
          <p><span className='font-medium'>Nombre de personnes:</span> {recipe?.servings}</p>
          <div><span className='font-medium'>Difficulté : </span><span className="bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-400 px-2 ">{recipe?.difficulty} </span></div>
        <hr className='h-px lg:h-0.5 my-4 bg-yellow-400 border-0 w-60'  />
      </div>
        <div className='text-start m-2' >
          <h3 className='font-medium mb-2'>Liste des ingrédients :</h3>
          <ul>
            {recipe?.Ingredients?.map((ingredient, index) => (
              <li key={index}>
                 {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className='m-2'>
        <h3 className='font-medium mb-2' >Instructions :</h3>
        <div>    {recipe?.instruction?.split(/(?=\d+-)/).map((instr, index) => (
        <p key={index}>{instr}</p>
      ))}</div>
        <hr className='h-px my-8 bg-yellow-400 border-0' />
        <div className='text-center my-4'><FavButton recipeId={recipe.id}/></div>
      </section>
      <section className='text-center'>
        {/* Ici s'affichent les commentaires de la recette */}
        <h3 className='font-medium mb-2'>Commentaires : </h3>
        <AllComment/>
        </section>
      <section className='text-center'>
         {/* Ici s'affichent les partages de réseaux sociaux */}
        <div className='flex justify-center my-8'>
          <span className='font-medium mx-2'>Partagez : </span>
          <TwitterShareButton className='mx-2' url={shareUrl}><TwitterIcon size={32} round={true} /></TwitterShareButton>
          <FacebookShareButton className='mx-2' url={shareUrl}><FacebookIcon size={32} round={true} /></FacebookShareButton>
          <WhatsappShareButton className='mx-2' url={shareUrl}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
          <LinkedinShareButton className='mx-2' url={shareUrl}><LinkedinIcon size={32} round={true} /></LinkedinShareButton> 
          <EmailShareButton className='mx-2' url={shareUrl}><EmailIcon size={32} round={true} /></EmailShareButton>
        </div>
      </section>
    </main>
  );
};

export default OneRecipe;
