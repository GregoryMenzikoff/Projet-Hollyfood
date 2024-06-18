import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiFetch from '../../../Utils/apiFetch';

const ConnectForm = () => {

const navigate = useNavigate();   // hook de navigation

 // mise en place des useState sous forme d'objet pour factoriser
 const [credentials, setCredentials] = useState({
    email:'',
    password:''
});

const [errors, setErrors] = useState({}); // stockage des erreurs de validation.


// fusion des target.name et target.value car les values sont dans un objet
const onChange = (e) => {
    setCredentials({
        ...credentials,     // ancien état du state
        [e.target.name]: e.target.value     // la valeur name de l'input (email, password ...) contient désormais le target value
    })
};

const onSubmit = async (e) => {  // fonction asynchrone pour envoyer les données du formulaire
    e.preventDefault(); // empêcher le rechargement de la page

 

    try {
        const data = await apiFetch('connexion', credentials, 'POST') // envoyer les données du formulaire à l'API
        localStorage.setItem('token', data.token) // stocker le token dans le local storage
            console.log('Réponse de l\'API :', data);
            navigate('/accueil');

                    // Déconnexion automatique après une heure
        setTimeout(() => {
            localStorage.removeItem('token');
            // Rediriger vers la page de connexion ou faire toute autre action nécessaire
            navigate('/connexion');
        }, 3600000); // 3 600 000 millisecondes équivalent à une heure, une heure est la durée de vie du token dans le backend.
          } catch (error) {
            // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
            console.error('Erreur lors de la connexion :', error); 
            
            if (errors.response && errors.response.data) {
                setErrors({ api: errors.response.data.error });
            } else {
                setErrors({ api: 'Une erreur est survenue. Veuillez réessayer.' });
            }
    }
};

return (
    <div>
        <form  onSubmit={onSubmit}>
            <div className='flex flex-col items-center'>
                <label htmlFor="email">E-mail</label>
                <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400' type="email" name="email" id="email" required value={credentials.email} onChange={onChange}/>
     
            </div>
            <div className='flex flex-col items-center'>
                <label htmlFor="password">Mot de passe</label>
                <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400' type="password" name="password" id="password" required value={credentials.password} onChange={onChange}/>
            </div>
            {errors.api && <div className="error text-red-400 mb-2">{errors.api}</div>}
            <div>
            <Link className='italic hover:underline hover:underline-offset-4' to="/mdp-oublie">Mot de passe oublié ?</Link>
            </div>
            <button className='my-4 bg-yellow-400 px-6 py-2 rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400'>Valider</button>
        </form>
    </div>
    );
};

export default ConnectForm;