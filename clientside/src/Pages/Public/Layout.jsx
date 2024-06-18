import React,{ useContext, useState, useEffect}  from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../Components/public/Header';
import Breadcrumbs from '../../Components/public/Breadcrumbs';
import Footer from '../../Components/public/Footer';
import MyState from '../../Components/public/MyContext';
import PaginateCard from '../../Components/public/PaginateCard';



const Layout = () => {
   

    const location = useLocation();
    const hideBreadcrumbs = location.pathname.startsWith('/nouveau-mot-de-passe/');
    const {search, recipes} = useContext(MyState)


    {/* fonction de filtration pour affichage des recettes selon la recherche */} 
const newList = recipes.filter((recipe) => ( // J'utilise la méthode filter pour filtrer les recettes en focntion des noms inscrits dans la barre de recherche
    
    recipe.name.toLowerCase().includes(search.toLowerCase()) // quand je mets le nom d'une recette
    ||
    recipe.work.title.toLowerCase().includes(search.toLowerCase()) // quand je mets le nom d'un film ou d'une série
    ||
    recipe.Ingredients.some(ingredient => ( // J'utilise la méthode some pour vérifier si au moins  l'ingredient fait partie d'au moins une recette
        ingredient.name.toLowerCase().includes(search.toLowerCase()) // quand je mets le nom d'e l'ingredientingredient
    )) 
    ));


    return (
        <div className='Layout min-h-screen flex flex-col'>
            <Header />
            {!hideBreadcrumbs && <Breadcrumbs />}
            
            {search ? // Utilisation d'une terner ou si search est vrai en renvoie une liste de recettes en fonction de la barre de recherche
               <PaginateCard recipes={newList} />
            :  
            <Outlet  /> // Sinon on reste sur l'affichage de base du main
            }
           
            <Footer />
        </div>
    );
};

export default Layout;
