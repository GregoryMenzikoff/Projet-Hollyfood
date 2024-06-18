import React, { useState } from 'react';

const ASubForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifiez si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    // Effectuez ici une action avec les données soumises, comme une requête API
    console.log('Soumission du formulaire avec les données:', { firstName, lastName, email, password });
    // Réinitialisez les champs après la soumission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className='ASubForm'>
      <fieldset>
        <legend>Ajouter un nouveau membre</legend>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Prénom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {error && <p>{error}</p>}
          <button type="submit">Créer le membre</button>
        </form>
      </fieldset>
    </div>
  );
};

export default ASubForm;
