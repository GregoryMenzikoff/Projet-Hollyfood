import React, { useState, useEffect, useContext } from 'react';
import apiFetch from '../../../Utils/apiFetch';
import MyState from '../../../Components/public/MyContext/index.jsx';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState(-1);

  const {users, setUsers}=useContext(MyState)

  const fetchData = async () => {
    try {
      const userdata = { name: lastName, firstName: firstName, email:email, password: password, role_id: role}
      const data = await apiFetch('admin/user', userdata, 'POST');
      console.log(userdata);
      console.log(data);
      setUsers(prevAddUser => [...prevAddUser, data])
    } catch (error) {
      console.error(error);
    }
  };
 useEffect(() => {
   

     fetchData(); // Appelez la fonction fetchData
   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Vérifiez si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    // Effectuez ici une action avec les données soumises, comme une requête API
    fetchData()
    console.log('Soumission du formulaire avec les données:', { firstName, lastName, email, password, role });
    // Réinitialisez les champs après la soumission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setRole(-1)
  };

  return (
    <div className='ASubForm'>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Prénom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <input  min="1" max="2" type="number" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
          {error && <p>{error}</p>}
          <button type="submit">Créer un nouveau membre</button>
        </form>
      </fieldset>
    </div>
  );
};

export default SignUpForm;


