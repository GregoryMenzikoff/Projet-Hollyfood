import React, { useState, useEffect } from "react";
import apiFetch from "../../../../Utils/apiFetch";

const FavButton = ({ recipeId }) => {
    const [isFav, setIsFav] = useState(false); // vrai si la recette est dans les favoris de l'utilisateur
    const [loading, setLoading] = useState(true); // vrai si la requête est en cours
    const [error, setError] = useState(null); // message d'erreur si la requête échoue

    const token = localStorage.getItem('token'); // récupérer le token de l'utilisateur

    useEffect(() => {
        const fetchFavorites = async () => { // Fonction pour obtenir les favoris de l'utilisateur
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await apiFetch('favorites', {}, 'GET'); // Récupérer les favoris de l'utilisateur
                if (data.favoriteRecipes) {  // Vérifier si les favoris ont été récupérés
                    const isRecipeInFavorites = data.favoriteRecipes.some(recipe => recipe.id === recipeId); // Vérifier si la recette est dans les favoris
                    setIsFav(isRecipeInFavorites); // Mettre à jour l'état isFav
                } else {
                    throw new Error('Failed to fetch favorites');
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites(); // Appeler la fonction pour obtenir les favoris de l'utilisateur

        // Cleanup function to reset state when the component unmounts or token changes
        return () => {  // Fonction de nettoyage pour réinitialiser l'état lorsque le composant est démonté ou que le token change
            setIsFav(false);
            setLoading(true);
            setError(null);
        };
    }, [recipeId, token]); // Déclencher l'effet lorsque recipeId ou token change

    // Fonction pour ajouter ou retirer une recette des favoris de l'utilisateur
    const handleFav = async () => {
        if (!token) { // Vérifier si l'utilisateur est connecté
            alert("Veuillez vous connecter ou vous inscrire pour ajouter aux favoris");
            return;
        }

        try {
            const handleMethod = isFav ? 'DELETE' : 'POST'; // Déterminer la méthode en fonction de l'état actuel
            const response = await apiFetch(`favorites`, {recipe_id: recipeId }, handleMethod) // Envoyer une requête pour ajouter ou retirer la recette des favoris
            if (response) {  // Vérifier si la requête a réussi                
                setIsFav(!isFav); // Mettre à jour l'état isFav 
            }
                 else {
                throw new Error(`Failed to ${isFav ? 'remove from' : 'add to'} favorites`); // Afficher un message d'erreur
            }
        } catch (error) {
            console.error('Error updating favorite:', error);
            setError(error.message || 'Something went wrong');
        }
    };

    if (loading) return <p>Loading...</p>; // Afficher un message de chargement
    if (error) return <p>{error}</p>; // Afficher un message d'erreur

    return (
        <button className="mt-2" onClick={handleFav}>  
            {isFav ? 
            <div className="flex hover:-translate-y-1 hover:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 color-yellow-400">Retirer des favoris</span>
           </div>
            :
            <div className="flex hover:-translate-y-1 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
            </svg>
            <span className="ml-2">Ajouter aux favoris</span>
           </div>
             }
        </button>
    );
};

export default FavButton;
