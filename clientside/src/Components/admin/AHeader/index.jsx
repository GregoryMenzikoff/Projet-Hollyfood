import React from "react";
import { Link } from 'react-router-dom';

const AHeader = () => {
  return (
    <div className="text-center mt-8 mr-8 ml-8">
      <div className="flex items-center justify-center bg-black rounded-md text-yellow-400 p-5 mb-4">
        <img 
          src="https://images.wakelet.com/resize?id=lkE5xT8W_y2sf6i0rF9AV&h=1536&w=1536&q=85" 
          alt="image_chaise_realisateur" 
          className="h-10 w-10 mr-2"
        />
        <h2 className="font-roboto font-bold text-4xl">
          DASHBOARD
        </h2>
      </div>
      <div className="flex justify-center mt-6">
        <Link to="/admin/user/index" className="mr-2">
          <button className="bg-yellow-400 border border-black text-black px-4 py-2 rounded shadow-xl hover:bg-black hover:text-yellow-400 transition duration-300">
            MEMBRES
          </button>
        </Link>
        <Link to="/admin/recipe/index">
          <button className="bg-yellow-400 border border-black text-black px-4 py-2 rounded shadow-xl hover:bg-black hover:text-yellow-400 transition duration-300">
            RECETTES
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AHeader;
