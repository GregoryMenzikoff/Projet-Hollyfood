import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import Layout from "../Pages/Public/Layout";
import ALayout from "../Pages/Admin/ALayout";
import Dashboard from "../Pages/Admin/Dashboard/index";
import { User, UserEdit, UserAdd, UserDelete } from "../Pages/Admin/User";
import { Recipe, HandleIngredient, HandleWork } from "../Pages/Admin/Recipe"; 
import NotFound from '../Pages/Public/404';
import MyState from '../Components/public/MyContext';


const AdminRouter = () => {
    const [recipes, setRecipes] = useState([]); // On crée une state recipes pour stocker les recettes
    const [recipe, setRecipe] = useState(""); // On crée une state recipe pour stocker une recette
    const [checked, setChecked] = useState({serie: false, film: false, salé: false, sucré:false}) // On crée une state checked pour stocker les filtres
    const [search, setSearch] = useState(""); // On crée une state search pour stocker la recherche
    const [searchAdmin, setSearchAdmin] = useState(""); // On crée une state search pour stocker la recherche
    const [users, setUsers] = useState([]); // Informations de l'utilisateur
    const [favorites, setFavorites] = useState([]); // Recettes favorites de l'utilisateur
    
    return (
        <MyState.Provider value={{
            recipes, setRecipes, recipe, setRecipe, search, setSearch,searchAdmin, setSearchAdmin, checked, setChecked, users, setUsers, favorites, setFavorites
        }}>
            <Routes>
                <Route element={<Layout/>}>
                    <Route element={<ALayout/>}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="user">
                            <Route path="index" element={<User/>}/>
                            <Route path="add" element={<UserAdd/>}/>
                            <Route path="edit" element={<UserEdit/>}/>
                            <Route path="delete" element={<UserDelete/>}/>
                        </Route>
                        <Route path="recipe">
                            <Route path="index" element={<Recipe/>}/>
                            <Route path="work" element={<HandleWork/>}/>
                            <Route path="ingredient" element={<HandleIngredient/>}/>
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </MyState.Provider>
    );
};

export default AdminRouter;
