import React, { useEffect, useState, useContext } from 'react';
import MyState from '../../../Components/public/MyContext';
import apiFetch from '../../../Utils/apiFetch';
import ASearchBar from '../../../Components/admin/AsearchBar';

const User = () => {
    const { searchAdmin, users, setUsers } = useContext(MyState);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editName, setEditName] = useState("");
    const [editFirstname, setEditFirstname] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] = useState(-1);
    const [editUpdate, setEditUpdate] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiFetch('admin/users', {}, 'GET');
                console.log(data);
                 // Tri des utilisateurs par ordre croissant d'identifiant
                const sortedUsers = data.sort((a, b) => a.id - b.id);
                setUsers(sortedUsers);
                setFilteredUsers(sortedUsers);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchAdmin.trim() === '') {
            setFilteredUsers(users);
        } else {
            console.log(searchAdmin);
            const newList = users.filter(user =>
                user.name.toLowerCase().includes(searchAdmin.toLowerCase()) ||
                user.email.toLowerCase().includes(searchAdmin.toLowerCase())
            );
            setFilteredUsers(newList);
            console.log(newList);
        }
    }, [searchAdmin, users]);

    const handleUpdate = async (userId) => {
        const updateCommentData = {
            name: editName,
            firstname: editFirstname,
            email: editEmail,
            role_id: editRole || -1
        };

        try {
            const data = await apiFetch(`admin/user/${userId}`, updateCommentData, 'PUT');
            if (data) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? {
                            ...user,
                            name: editName,
                            firstname: editFirstname,
                            email: editEmail,
                            role_id: editRole
                        }
                            :
                            user
                    )
                );

                setFilteredUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? {
                            ...user,
                            name: editName,
                            firstname: editFirstname,
                            email: editEmail,
                            role_id: editRole
                        }
                            :
                            user
                    )
                );

                setEditUpdate(null);
                console.log({ message: 'Modification reussie' });
            } else {
                console.error("Erreur lors de la modification du commentaire :", "La mise à jour du commentaire a échoué.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du commentaire :", error);
        }
    };

    const showUpdate = (user) => {
        setEditUpdate(user.id);
        setEditName(user.name);
        setEditFirstname(user.firstname);
        setEditEmail(user.email);
        setEditRole(user.role_id);
    }

    const handleCancel = () => {
        setEditUpdate(false)
    }

    const handleDelete = async (userId) => {
        try {
            console.log(userId);
            const data = await apiFetch(`admin/user/${userId}`, {}, 'DELETE');
            console.log(data);
            if (data && data.success) {
                setUsers(prevUser => prevUser.filter(user => user.id !== userId));
                setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
            } else {
                console.error("Erreur lors de la suppression de l'utilisateur :", data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <main className="mr-10 ml-10 mb-10">
            <div className='flex-col'>
                <ASearchBar />
                <h2 className='bg-black text-yellow-400 font-bold mt-8 pl-10 px-4 py-2 rounded'>LISTE DES MEMBRES</h2>
                <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className="px-4 py-2 text-center">#</th>
                            <th className="px-4 py-2 text-center">Nom</th>
                            <th className="px-4 py-2 text-center">Prénom</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Rôle</th>
                            <th className="px-4 py-2 text-center">Création</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-t border-gray-200">
                                {editUpdate === user.id ?
                                    <>
                                        <td className="px-4 py-2 text-center">{user.id}</td>
                                        <td className="px-4 py-2 text-center">
                                            <input
                                                type="text"
                                                name="name"
                                                value={editName.trim()}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="border border-gray-300 rounded p-1"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <input
                                                type="text"
                                                name="firstname"
                                                value={editFirstname.trim()}
                                                onChange={(e) => setEditFirstname(e.target.value)}
                                                className="border border-gray-300 rounded p-1"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <input
                                                type="email"
                                                name="email"
                                                value={editEmail.trim()}
                                                onChange={(e) => setEditEmail(e.target.value)}
                                                className="border border-gray-300 rounded p-1"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <input
                                                type="number"
                                                name="role"
                                                value={editRole}
                                                min="1"
                                                max="2"
                                                onChange={(e) => setEditRole(e.target.value)}
                                                className="border border-gray-300 rounded p-1"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-center">{user.createdAt}</td>
                                        <td className="px-4 py-2 flex justify-center space-x-2">
                                            <button
                                                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300'
                                                onClick={() => handleUpdate(user.id)}
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
                                        <td className="px-4 py-2 text-center">{user.id}</td>
                                        <td className="px-4 py-2 text-center">{user.name}</td>
                                        <td className="px-4 py-2 text-center">{user.firstname}</td>
                                        <td className="px-4 py-2 text-center">{user.email}</td>
                                        <td className="px-4 py-2 text-center">{user.role_id}</td>
                                        <td className="px-4 py-2 text-center">{user.createdAt}</td>
                                        <td className="px-4 py-2 flex justify-center space-x-2">
                                            <button
                                                className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300'
                                                onClick={() => showUpdate(user)}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300'
                                                onClick={() => handleDelete(user.id)}
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

export default User;
