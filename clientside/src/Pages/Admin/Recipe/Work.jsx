import React, { useState, useEffect, useContext } from 'react';
import apiFetch from '../../../Utils/apiFetch';
import MyState from '../../../Components/public/MyContext';
import ASearchBar from '../../../Components/admin/AsearchBar';
import RecipeHeader from '../../../Components/admin/AHeader/RecipeHeader';

const ManageIngredient = () => {
  const { searchAdmin } = useContext(MyState);
  const [works, setWorks] = useState([]);
  const [filteredWork, setFilteredWork] = useState([]);
  const [addTitle, setAddTitle] = useState("");
  const [addSynopsis, setAddSynopsis] = useState("");
  const [editTitle, setEditTitle] = useState('');
  const [editSynopsis, setEditSynopsis] = useState('');
  const [editUpdate, setEditUpdate] = useState(null);
  const [addWork, setAddWork] = useState(false);
  const [editWorkError, setEditWorkError] = useState("");

  useEffect(() => {
    const fetchWorks = async () => {
      const data = await apiFetch('admin/work');
      const sortedWorks = data.works.sort((a, b) => a.id - b.id);
      setWorks(sortedWorks);
      setFilteredWork(sortedWorks);
    };
    fetchWorks();
  }, []);

  useEffect(() => {
    if (searchAdmin.trim() === '') {
      setFilteredWork(works);
    } else {
      const newList = works.filter(work =>
        work.title.toLowerCase().includes(searchAdmin.toLowerCase())
      );
      setFilteredWork(newList);
    }
  }, [searchAdmin, works]);

  const createWork = async (e) => {
    e.preventDefault();
    if (addTitle.trim() === "" || addSynopsis.trim() === "") {
      setEditWorkError("Les champs sont requis");
      return;
    }

    const workData = {
      title: addTitle,
      synopsis: addSynopsis,
    };

    try {
      const data = await apiFetch('admin/work', workData, 'POST');
      setWorks(prevWorks => [...prevWorks, data.work]);
      setAddTitle('');
      setAddSynopsis('');
      setEditWorkError('');
      setAddWork(false); // Masquer le formulaire après l'ajout
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setEditWorkError(error.response.data.error);
      } else {
        setEditWorkError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  const handleUpdate = async (workId) => {
    const updatedWork = {
      title: editTitle,
      synopsis: editSynopsis,
    };

    try {
      const data = await apiFetch(`admin/work/${workId}`, updatedWork, 'PUT');
      if (data) {
        setWorks(prevWorks =>
          prevWorks.map(work =>
            work.id === workId ? { ...work, title: editTitle, synopsis: editSynopsis } : work
          )
        );
        setFilteredWork(prevWorks =>
          prevWorks.map(work =>
            work.id === workId ? { ...work, title: editTitle, synopsis: editSynopsis } : work
          )
        );
        setEditUpdate(null);
      } else {
        console.error("Erreur lors de la mise à jour de l'œuvre :", "La mise à jour a échoué.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showUpdate = (work) => {
    setEditUpdate(work.id);
    setEditTitle(work.title);
    setEditSynopsis(work.synopsis);
  };

  const showAdd = () => {
    setAddTitle("");
    setAddSynopsis("");
    setAddWork(true); // Afficher le formulaire
  };

  const handleCancel = () => {
    setEditUpdate(false);
    setAddWork(false);
  };

  const handleDelete = async (workId) => {
    try {
      const data = await apiFetch(`admin/work/${workId}`, {}, 'DELETE');
      if (data && data.success) {
        setWorks(prevWorks => prevWorks.filter(work => work.id !== workId));
        setFilteredWork(filteredWork.filter(work => work.id !== workId));
      } else {
        console.error("Erreur lors de la suppression de l'œuvre :", data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mr-10 ml-10 mb-10">
      <div className='flex-col'>
        <RecipeHeader />
        <ASearchBar />
        <h2 className='bg-black text-yellow-400 font-bold mt-8 pl-10 px-4 py-2 rounded'>LISTE DES ŒUVRES</h2>

        {addWork ?
          <form method='post' onSubmit={createWork}>
            <div className='flex flex-row'>
              <div>
                <label htmlFor="addTitle">Titre</label>
                <input
                  type="text"
                  id="addTitle"
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
              <div>
                <label htmlFor="addSynopsis">Synopsis</label>
                <input
                  type="text"
                  id="addSynopsis"
                  value={addSynopsis}
                  onChange={(e) => setAddSynopsis(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
            </div>
            {editWorkError && <div className="error text-red-400 mb-2">{editWorkError}</div>}
            <button type="submit" className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300'>Valider</button>
            <button
              type="button"
              className='bg-red-500 text-white ml-4 px-3 py-1 rounded hover:bg-red-700 transition duration-300'
              onClick={handleCancel}
            >
              Annuler
            </button>
          </form>
          :
          <button onClick={showAdd} className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300 mt-4'>Ajouter</button>
        }

        <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
          <thead className='bg-gray-200'>
            <tr>
              <th className="px-4 py-2 text-center">ID</th>
              <th className="px-4 py-2 text-center">Nom</th>
              <th className="px-4 py-2 text-center">Synopsis</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWork.map(work => (
              <tr key={work.id} className="border-t border-gray-200">
                {editUpdate === work.id ?
                  <>
                    <td className="px-4 py-2 text-center">{work.id}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="text"
                        name="name"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                      {editWorkError.api && <div className="error text-red-400 mb-2">{editWorkError.api}</div>}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="text"
                        name="synopsis"
                        value={editSynopsis}
                        onChange={(e) => setEditSynopsis(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                      {editWorkError.api && <div className="error text-red-400 mb-2">{editWorkError.api}</div>}
                    </td>
                    <td className="px-4 py-2 flex justify-center space-x-2">
                      <button
                        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300'
                        onClick={() => handleUpdate(work.id)}
                      >
                        Enregistrer
                      </button>
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300'
                        onClick={handleCancel}
                      >
                        Annuler
                      </button>
                    </td>
                  </>
                  :
                  <>
                    <td className="px-4 py-2 text-center">{work.id}</td>
                    <td className="px-4 py-2 text-center">{work.title}</td>
                    <td className="px-4 py-2 text-center">{work.synopsis}</td>
                    <td className="px-4 py-2 flex justify-center space-x-2">
                      <button
                        className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300'
                        onClick={() => showUpdate(work)}
                      >
                        Modifier
                      </button>
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300'
                        onClick={() => handleDelete(work.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ManageIngredient;