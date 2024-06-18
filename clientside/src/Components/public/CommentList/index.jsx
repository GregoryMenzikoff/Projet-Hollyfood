import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import day from 'dayjs';
import MyState from '../MyContext';
import apiFetch from '../../../Utils/apiFetch';
import Comment from './Comment';
import {jwtDecode} from 'jwt-decode'

const AllComment = () => {
    
    const {comments, setComments, newComment, setNewComment} = useContext(MyState);
    const [creatComment, setCreateComment] = useState("");
 
    
    const {slug} = useParams()

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.userId;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };

    const userId = getUserIdFromToken();

    const getAllComment = async () => {
        const data = await apiFetch(`recettes/${encodeURIComponent(slug)}/comments`, {}, 'GET')
        setComments(data);
    }

    const addComment = async (e) => {
        e.preventDefault();

        const userId = getUserIdFromToken();
        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        const commentData = { 
            description: creatComment,
            user_id: userId,
        };


        try {
            const data = await apiFetch(`recettes/${encodeURIComponent(slug)}/comments`, commentData , 'POST');
    
            if (data && data.id) {
                setComments(prevComments => [...prevComments, data]);
                setCreateComment(''); // Clear the comment input field
            } else {
                console.error("Erreur lors de l'ajout du commentaire :", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error);
        }
    };

    const updateComment = async (commentId) => {
        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        const updateCommentData = { 
            description: newComment,
        };
        console.log(updateCommentData);
        try {
            const data = await apiFetch(`recettes/${encodeURIComponent(slug)}/comments/${commentId}`, updateCommentData , 'PUT');
            if (data ) {
                setComments(prevComments =>
                    prevComments.map(comment =>
                        comment.id === commentId ? { ...comment, description: newComment } : comment
                    )
                );
                // setNewComment(''); // Réinitialiser la valeur de newComment
            } else {
                console.error("Erreur lors de la modification du commentaire :", "La mise à jour du commentaire a échoué.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du commentaire :", error);
        }
    };

    const deleteComment = async (commentId) => {

        const userId = getUserIdFromToken(); // Obtention de l'ID de l'utilisateur connecté
        if (!userId) {
            console.error("User not authenticated"); // Affiche une erreur si l'utilisateur n'est pas authentifié
            return; // Arrête l'exécution de la fonction
        }    


        try {
            const data = await apiFetch(`recettes/${encodeURIComponent(slug)}/comments/${commentId}`, {}, 'DELETE');
            console.log(data);
            if (data && data.success) {
                // Met à jour l'état global en filtrant le commentaire supprimé
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));

            } else {
                console.error("Erreur lors de la suppression du commentaire :", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error);
        }
    };


    useEffect(() => {
        getAllComment();
        setComments([])
    }, [slug])

    return (
        <div className='flex flex-col items-center w-full'>
            <ul className='flex flex-col items-center w-full'>
            {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Comment
                            key={index}
                            description={comment.description}
                            createdAt={day(comment.createdAt).format("YYYY/MM/DD HH:mm:ss")}
                            onDelete={() => deleteComment(comment.id)}
                            onUpdate={() => updateComment(comment.id, newComment)}
                        />
                    ))
                ) : (
                    <p>Aucun commentaire ...</p>
                )}
            </ul>
            <div className='flex flex-col items-center m-4 w-full' >
                {userId && 
                    <form className='flex flex-col items-center w-full max-w-xl md:max-w-2xl ' onSubmit={addComment}>
                    <textarea
                        className='border-4 border-black-400 rounded-lg p-2 w-4/5 h-max mb-2 md:w-full'
                        value={creatComment}
                        onChange={(e) => setCreateComment(e.target.value)}
                        placeholder="Ajouter un commentaire ..."
                        required
                    ></textarea>
                    <button className='bg-yellow-400 px-2 py-2 m-1 w-1/4  rounded-lg font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400' type="submit">Ajouter</button>
                    </form>  
                }
            </div>           
        </div>
     
    )
}

export default AllComment;