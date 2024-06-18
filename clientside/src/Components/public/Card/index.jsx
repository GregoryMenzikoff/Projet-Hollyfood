import React from "react";
import { Link } from "react-router-dom";
import FavButton from "../Buttons/FavButton";
import { RatedBar } from "../ratingBar";



const Card = ({ score, picture, name, difficulty, slug, workTitle, id }) => {
  return (
    <section className="mb-2 mx-auto pb-2 sm:flex-col lg:flex shadow-md size-fit rounded-lg">
      <article className="flex flex-col">
        <RatedBar score={score} />
        <Link to={`/recettes/${slug}`}>
          <img
            src={picture}
            alt="image de la recette"
            className="pt-1 aspect-square shadow-lg max-w-64 hover:brightness-75"
          />
        </Link>
      </article>
      <article className="ml-1">
          <h2 className="mt-2 font-medium text-xl">{name.length > 25 ? name.substring(0, 24) + '...' : name}</h2>
        <div className="pt-2 mt-2">
          <h2 className="font-extrabold text-xl ">{workTitle.length > 25 ? name.substring(0, 24) + '...' : workTitle}</h2>
        </div>
        <div className="mx-1 flex items-end mt-5 justify-between">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-400 size-min ">
          <p className="font-medium text-lg mx-2  ">{difficulty}</p>
        </div>
        <div className="hover:underline hover:underline-offset-4 hover:text-lg mr-2">
          <Link to={`/recettes/${slug}`}>Détails...</Link>
        </div>
        </div>
        <hr className="h-px my-4 bg-yellow-400 border-0"/>
        <div className="my-2 text-center">
          <FavButton recipeId={id} />
        </div>
      </article>
    </section>
  );
};

export default Card;
