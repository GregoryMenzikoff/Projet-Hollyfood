import React, { useState, useContext } from 'react';
import MyState from '../../public/MyContext';


const ASearchBar = () => {
    const { setSearchAdmin} = useContext(MyState);
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchAdmin(value);

        setValue('');
    };

    const handleReset = () => {
        setSearchAdmin('');
        setValue('');
    };


    return (

        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <label htmlFor="Asearch" className="sr-only">Recherche</label>
        <input 
            type="text" 
            name="Asearch"  
            id="Asearch" 
            placeholder="Recherche par Nom ou par Email..." 
            value={value} 
            onChange={handleChange} 
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button 
            type="submit" 
            className="bg-yellow-400 border border-black text-black px-4 py-2 rounded shadow-xl hover:bg-black hover:text-yellow-400 transition duration-300"
        >
            Rechercher
        </button>
        <button type="button" onClick={handleReset}>Réinitialiser</button>
    </form>
    
        
       
    );
};

export default ASearchBar;
