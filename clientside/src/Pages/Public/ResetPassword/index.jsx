import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiFetch from "../../../Utils/apiFetch";

const ResetPassword = () => {
    const [password, setPassword] = useState(''); // Initialiser le mot de passe à une chaîne de caractères vide
    const navigate = useNavigate(); // Hook de navigation
    const {id, token} = useParams(); // Récupérer les paramètres de l'URL

    const onChange = (e) => {
        setPassword(e.target.value); // Mettre à jour le mot de passe avec la valeur de l'input
    }

    const onSubmit = async (e) => { // Fonction pour envoyer le mot de passe à l'API
        e.preventDefault();
        const data = await apiFetch(`reset-password/${id}/${token}`, { password: password }, 'POST'); // Envoyer le mot de passe à l'API
        console.log('Réponse de l\'API :', data);
        navigate('/connexion'); // Naviguer vers la page de connexion
    }

    return (
        <main className='flex flex-col text-center'>
            <h2 className="text-lg font-medium my-2 underline underline-offset-4">Réinitialisation du mot de passe</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400' type="password" name="password" id="password" required value={password} onChange={onChange} />
                </div>
            
                
                <button className='my-4 bg-yellow-400 px-6 py-2 rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400'>Valider</button>                
                <br />
                <Link className='italic hover:underline hover:underline-offset-4' to="/connexion">Retour à la connexion</Link>
            </form>
        </main>
    );



}

export default ResetPassword;