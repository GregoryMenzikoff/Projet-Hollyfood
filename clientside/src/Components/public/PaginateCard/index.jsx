import React, { useEffect, useState } from 'react';
import Card from '../../../Components/public/Card';
import Pagination from '../../../Components/public/Pagination';

const PaginateCard = ({ recipes }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false); 
    const [isTablet, setIsTablet] = useState(false); 
    const [isDesktop, setIsDesktop] = useState(false); 

    const itemsPerPage = isMobile ? 1 : (isTablet ? 2 : 4);


    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); 
            setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1280); 
            setIsDesktop(window.innerWidth > 1280); 
        };
        handleResize(); 
        window.addEventListener('resize', handleResize); 
        return () => window.removeEventListener('resize', handleResize); 
    }, []);

    const pageCount = Math.ceil(recipes.length / itemsPerPage);

    const offset = currentPage * itemsPerPage;
    const currentItems = recipes.slice(offset, offset + itemsPerPage);

    return (
        <main>
            <div className='flex flex-col items-center'>
                {recipes ? (
                    <div className='flex flex-nowrap gap-4'>
                        {currentItems.map((recipe) => (
                            <div key={recipe.id} >
                                <Card
                                    score={recipe.averageRating}
                                    picture={recipe.picture}
                                    name={recipe.name}
                                    workTitle={recipe.work.title}
                                    difficulty={recipe.difficulty}
                                    slug={recipe.slug}
                                    id={recipe.id}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Recettes indisponsibles</p>
                )}
                <Pagination
                    key={pageCount}
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            </div>
        </main>
    );
};

export default PaginateCard;
