import React from "react";
import { Link } from "react-router-dom";



const SideMenu = () => {
    return (
<div className="SideMenu">
    <ul>
        {/* <li><Link to="/">Accueil</Link></li>
        <li>&nbsp;</li> */}
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li className="uppercase">
            Membres
            <ul className="list-disc">
                <li className="normal-case"><Link to="/admin/user/index">Liste </Link></li>
                <li className="normal-case"><Link to="/admin/user/add">Ajouter</Link></li>
                <li className="normal-case"><Link to="/admin/user/delete">Supprimer</Link></li>
                <li className="normal-case"><Link to="/admin/user/edit">Mettre à jour</Link></li>
            </ul>
        </li>
        <li className="uppercase">
            Recettes
            <ul className="list-none">
                <li className="normal-case"><Link to="/admin/recipe/index">Recettes</Link></li>
                <li className="normal-case"><Link to="/admin/recipe/work">Oeuvres</Link></li>
                <li className="normal-case"><Link to="/admin/recipe/ingredient">Ingrédients</Link></li>
            </ul>
        </li>
    </ul>


</div>

    )
}

export  default SideMenu;



