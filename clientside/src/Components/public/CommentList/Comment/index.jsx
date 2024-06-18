import { useState,useContext } from 'react';
import MyState from '../../MyContext';

const isAuthenticated = () => { // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    return !!token;
  };


const Comment = ({ commentId, description, createdAt, onDelete, onUpdate }) => {


    const {newComment, setNewComment} = useContext(MyState)
    const [editMode, setEditMode] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false)
   
   

    const handleUpdate = () => {
        onUpdate(commentId, newComment);
        setEditMode(false); // Sortir du mode édition après la mise à jour
        setIsSubstring(false)
    };

    const handleDelete = () => {
        onDelete(commentId);
    };

    const handleCancel = () => {
        setEditMode(false)
    }

    const toggleShowMore = () => {
        setIsShowMore(!isShowMore);
    };

    const shouldTruncate = description.length > 50;

    return (
    <li className='flex flex-col items-center mb-4 w-4/5'>
        {isAuthenticated() ?
            <>
                {editMode ? (
                    <>
                        <textarea
                        className='border-4 border-yellow-400 bg-slate-50 rounded-lg w-1/2 p-2 mb-4'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}                    
                        rows={4}
                   
                        >                   
                        </textarea>
                        <div className='md:ml-4 md:flex'>
                            <button className='bg-yellow-400 px-2 rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400 m-1 ' type="submit" onClick={handleUpdate}>Enregistrer</button>
                            <button className='bg-yellow-400 px-2 rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400 m-1 ' onClick={handleCancel}>Annuler</button>
                        </div>   
                    </>
                    ) : (
                    <div className='flex flex-col items-center w-full md:w-2/3 md:flex md:flex-row md:justify-center '>
                        <div className="items-end border-4 border-black-400 bg-slate-50 text-start rounded-lg p-2 w-1/2 break-words ">
                            {shouldTruncate ? (
                            <div className='md:flex md:flex-col'>
                                <p className='ml-2 '> {isShowMore ? description : `${description.substring(0, 50)} ...`}</p>
                                <div className='flex justify-between mt-4 pt-1 border-t-2'>
                                    <button className='text-sm underline' onClick={toggleShowMore}> {isShowMore ? 'Afficher moins' : 'Afficher plus'}</button>
                                    <span className='text-sm italic text-right'>{createdAt}</span>
                                </div>
                        </div>
                            ) : (
                        <div className='flex flex-col'>
                            <p className='ml-2 md:ml-0'>{description}</p>
                            <span className='text-sm italic text-right mt-4 pt-1 border-t-2'>{createdAt}</span>
                        </div>
                        )}
                        </div>
                        <div className='flex flex-col  items-center md:mx-2'>
                            <button className='px-2 py-2 rounded-full font-semibold  hover:scale-105 hover:bg-black hover:text-yellow-400'  onClick={() => setEditMode(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-5 hover:text-yellow-400"
                                >
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>
                            </button>
                            <button className='px-2 py-2  rounded-full font-semibold hover:scale-105 hover:bg-black hover:text-yellow-400' onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </>

        :
            <div className='flex flex-col items-center w-full md:w-2/3 md:flex md:flex-row md:justify-center '>
                <div className="items-end border-4 border-black-400 bg-slate-50 text-start rounded-lg p-2 w-1/2 break-words ">
                    {shouldTruncate ? (
                    <div className='md:flex md:flex-col'>
                        <p className='ml-2 '> {isShowMore ? description : `${description.substring(0, 50)} ...`}</p>
                        <div className='flex justify-between mt-4 pt-1 border-t-2'>
                            <button className='text-sm underline' onClick={toggleShowMore}> {isShowMore ? 'Afficher moins' : 'Afficher plus'}</button>
                            <span className='text-sm italic text-right'>{createdAt}</span>
                        </div>
                </div>
                    ) : (
                <div className='flex flex-col'>
                    <p className='ml-2 md:ml-0'>{description}</p>
                    <span className='text-sm italic text-right mt-4 pt-1 border-t-2'>{createdAt}</span>
                </div>
                )}
                </div>
            </div>
        }
    </li>
    );
};

export default Comment;