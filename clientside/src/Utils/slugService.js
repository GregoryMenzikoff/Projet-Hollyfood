const slugToTitle = (slug) => {
    // Décodage de la chaîne d'URL encodée
    const decodedSlug = decodeURIComponent(slug);
  
    // Division de la chaîne décodée en utilisant les délimiteurs souhaités
    return decodedSlug.split(/%|-|20/).map((word) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

export default slugToTitle;