import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import validateForm from '../../../Utils/formValidation'; // Import de la fonction de validation
import apiFetch from '../../../Utils/apiFetch';
import checkEmailExists from '../../../Utils/apiEmailExist';
import emailvalidator from 'email-validator';

const Subform = () => {
    let navigate = useNavigate();

    // mise en place des useState sous forme d'objet pour factoriser
    const [credentials, setCredentials] = useState({
        name: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({}); // stockage des erreurs de validation.
    const [exist, setExist] = useState(false); // verification de l'email existant
    // fusion des target.name et target.value car les values sont dans un objet
    const onChange = (e) => {
        setCredentials({
            ...credentials, // ancien état du state
            [e.target.name]: e.target.value // la valeur name de l'input (name, firstname, password ...) contient désormais le target value
        });

        // retour à l'etat initial si l'email est modifié dans l'input
        setExist(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Object contenant les  propriétés du formulaire
        const validationErrors = validateForm(credentials);
      
        // On vérifie si il y a des erreurs de validation dans l'objet contenant les propriétés du formulaire
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({}); // Réinitialiser les erreurs

            // Vérifier si l'email est valide
            if (emailvalidator.validate(credentials.email)) {
                try {
                    // Vérifier si l'e-mail existe déjà
                    const emailExists = await checkEmailExists(credentials.email.toLowerCase());
                    console.log(!emailExists);

                    // Si l'email n'existe pas
                    if (!emailExists) {
                        // Les données du formulaire sont envoyé dans la base de donnée 
                        const data = await apiFetch('inscription', credentials, 'POST');
                        if (data){ navigate('/connexion'); } 

                    // Sinon si l'email existe déja on indique un message d'alerte  
                    } else if (emailExists) {
                        setExist(true)
                        alert('Veuillez saisir un email unique')
                    }

                } catch (error) {
                    console.error('Erreur lors de la vérification de l\'adresse email:', error);
                }
            } else {
                // Si l'e-mail n'est pas valide, afficher une alerte
                alert('Adresse email non valide');
            }
        }
    };
    

    return (
        <div>
            <form onSubmit={onSubmit}>
            {exist && <div className="error">Cette adresse email existe déjà</div>}
                <div className='flex flex-col items-center mt-4 mb-4'>
                    <label htmlFor="name">Nom *</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400 m-1 md:w-96 ' type="text" name="name" id="name" required value={credentials.name} onChange={onChange} />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div className='flex flex-col items-center mb-4'>
                    <label htmlFor="firstname">Prénom *</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400 m-1 md:w-96 ' type="text" name="firstname" id="firstname" required value={credentials.firstname} onChange={onChange} />
                    {errors.firstname && <div className="error">{errors.firstname}</div>}
                </div>
                <div className='flex flex-col items-center mb-4'>
                    <label htmlFor="email">Adresse mail *</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400 m-1 md:w-96 ' type="email" name="email" id="email" required value={credentials.email} onChange={onChange} />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className='flex flex-col items-center mb-4'>
                    <label htmlFor="password">Mot de passe *</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400 m-1 md:w-96 ' type="password" name="password" id="password" required value={credentials.password} onChange={onChange} />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div className='flex flex-col items-center mb-4'>
                    <label htmlFor="confirmPassword">Confirmation du mot de passe *</label>
                    <input className='bg-yellow-50 rounded-lg border-2 border-yellow-400 m-1 md:w-96 ' type="password" name="confirmPassword" id="confirmPassword" required value={credentials.confirmPassword} onChange={onChange} />
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                </div>
                <button className='bg-yellow-400 px-6 py-2 rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400'>Valider</button>
            </form>
        </div>
    );
};

export default Subform;
