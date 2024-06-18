const apiFetch = async (path, body = {}, method = 'GET') => {
  const token = localStorage.getItem('token') || null;

  // Détermine si une requête nécessite un corps de requête ou non
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  
  if (method !== 'GET') { // Si la méthode n'est pas GET, inclure le corps de la requête
    options.body = JSON.stringify(body);
  }


  const response = await fetch( `https://projet-hollyfood-fphz.onrender.com/api/${path}`, options); // Envoyer : la requête à l'API http://localhost:3000/api/${path} ou https://projet-hollyfood-fphz.onrender.com/api/${path}



  if (!response.ok) {
    throw new Error('Erreur lors de la connexion');
  }

  return await response.json();
}

export default apiFetch;
