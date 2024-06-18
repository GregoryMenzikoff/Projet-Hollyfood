import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiFetch from "../../../Utils/apiFetch";

const ForgotPassword = () => {
    const navigate = useNavigate(); // Hook de navigation
    const [email, setEmail] = useState(''); // Initialiser l'email à une chaîne de caractères vide

    const onChange = (e) => {
        setEmail(e.target.value); // Mettre à jour l'email avec la valeur de l'input
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await apiFetch('forgot-password', { email: email }, 'POST'); // Envoyer l'email à l'API
        console.log('Réponse de l\'API :', data);
        
        // Vérifier si la réponse contient un message d'erreur
        if (data && data.message) {
            alert(data.message); // Afficher le message d'erreur à l'utilisateur
        } else {
            // Si aucune erreur, naviguer vers la page de connexion
            navigate('/connexion');
        }
    }
    

    return (
        <main className='flex flex-col text-center items-center'>
            <h2 className="text-lg font-medium my-2 underline underline-offset-4">Mot de passe oublié</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400' type="email" name="email" id="email" required value={email} onChange={onChange} />
                </div>
              
               
                <button className='my-4 bg-yellow-400 px-6 py-2 rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400'>Valider</button>
                <br />
                <Link className='italic hover:underline hover:underline-offset-4' to="/connexion">Retour à la connexion</Link>
            </form>
        </main>
    );
}

export default ForgotPassword;