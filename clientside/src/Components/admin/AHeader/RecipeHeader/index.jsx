import React from "react";
import { Link } from 'react-router-dom';

const  RecipeHeader = () => {
    return (
        <div className="text-center mt-8 mr-8 ml-8">
            <nav className="flex items-center justify-center bg-black rounded-md text-yellow-400 p-5 mb-4 gap-1">
            <div className="bg-yellow-400 border border-black text-black px-4 py-2 rounded shadow-xl hover:bg-black hover:text-yellow-400 transition duration-300 mx-1"><Link to="/admin/recipe/work">Oeuvres</Link></div>
            <div className="bg-yellow-400 border border-black text-black px-4 py-2 rounded shadow-xl hover:bg-black hover:text-yellow-400 transition duration-300 mx-1"><Link to="/admin/recipe/ingredient">Ingrédients</Link></div>
            </nav>
        </div>
    );
};
export default RecipeHeader;
