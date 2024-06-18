import apiFetch from "./apiFetch";

const checkEmailExists = async (email) => { // Fonction pour vérifier si un email existe déjà
    const response = await apiFetch('checkEmail', {email}, 'POST'); // Envoyer l'email à l'API
    return response.exists || false; // Retourner true si l'email existe, sinon false
}

export default checkEmailExists;