import {React, useState, useEffect} from 'react';
import {Route, Routes, useLocation } from "react-router-dom";

import Layout from '../Pages/Public/Layout';


import Home from '../Pages/Public/Accueil';
import About from '../Pages/Public/About';
import Connect from '../Pages/Public/Connexion';
import Contact from '../Pages/Public/Contact';
import Subscribe from '../Pages/Public/Inscription';
import LegalMention from '../Pages/Public/Legal';
import SiteMap from '../Pages/Public/SiteMap';
import Profile from '../Pages/Public/Profil';
import Recipes from '../Pages/Public/Recipes';
import OneRecipe from '../Pages/Public/Recipe';
import NotFound from '../Pages/Public/404';
import ForgotPassword from '../Pages/Public/ForgotPassword';
import ResetPassword from '../Pages/Public/ResetPassword';
import MyState from '../Components/public/MyContext/index'


const PublicRouter = () => {


  const [recipes, setRecipes] = useState([]); // On crée une state recipes pour stocker les recettes
  const [recipe, setRecipe] = useState(""); // On crée une state recipe pour stocker une recette
  const [checked, setChecked] = useState({Série: false, Film: false, Salé: false, Sucré:false}) // On crée une state checked pour stocker les filtres
  const [search, setSearch] = useState(""); // On crée une state search pour stocker la recherche
  const [user, setUser] = useState({}); // Informations de l'utilisateur
  const [favorites, setFavorites] = useState([]); // Recettes favorites de l'utilisateur
  const [nameEdit, setNameEdit] = useState(""); // On stock la string qui sera dans le champs name du profil
  const [firstnameEdit, setFirstnameEdit] = useState("");// On stock la string qui sera dans le champs firstname du profil
  const [updateName, setUpdateName] = useState(false);// Je controle que la mise à jour pour le name est valider
  const [updateFirstname, setUpdateFirstname] = useState(false);// Je controle que la mise à jour pour le firstname est valider 
  const [comments, setComments] = useState([])
  const [postContent, setPostContent] = useState("");
  const [isValid, setIsValid] = useState(false)
  const [updateComment, setUpdateComment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const location= useLocation(); // On utilise le hook useLocation pour récupérer la location de la page


  useEffect(() => {
    return () => {
      setSearch(''),
      setRecipes([]);
    }
  }, [location]) // On utilise un hook useEffect pour indiqué que a chaque changement de location on lui envoie la fonction api


  
    return (
      <MyState.Provider value={{
        recipes , setRecipes , recipe , setRecipe , search , setSearch, checked, setChecked, user, setUser, favorites, setFavorites, nameEdit, setNameEdit, firstnameEdit, setFirstnameEdit, updateName, setUpdateName, updateFirstname, setUpdateFirstname, comments, setComments, postContent, setPostContent, isValid, setIsValid, updateComment, setUpdateComment, newComment, setNewComment
        }} >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/accueil" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/connexion" element={<Connect />} />
            <Route path="/mdp-oublie" element={<ForgotPassword />} />
            <Route path='/nouveau-mot-de-passe/:id/:token' element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription" element={<Subscribe />} />
            <Route path="/mentions-legales" element={<LegalMention />} />
            <Route path="/plandusite" element={<SiteMap />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/recettes" element={<Recipes />} />
            <Route path="/recettes/:slug" element={<OneRecipe />} />
    

            <Route path="*" element={<NotFound />} />
          </Route>
          
        </Routes>
      </MyState.Provider>
       
    );
};

export default PublicRouter;