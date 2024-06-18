import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    let pathnames = location.pathname.split('/').filter(x => x);

    const convertSlugToTitle = (slug) => {
        const decodedSlug = decodeURIComponent(slug);
        return decodedSlug.split(/%|-|20/).map((word) => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const isHomePage = location.pathname === '/' || location.pathname === '/accueil';

    if (location.pathname === '/accueil') {
        pathnames = [];
    }

    return (
        <nav className='my-4 mx-1 lg:mx-16'>
            <ul className='flex flew-row'>
                <li className='py-1 px-2 bg-yellow-400 rounded-2xl shadow-lg shadow-stone-300'>
                    {isHomePage ? (
                        <span className='flex items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-1">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>
                      Accueil</span>
                    ) : (
                        <Link to='/' className='hover:underline flex items-center'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-1">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>
                      Accueil</Link>
                    )}
                </li>
                {pathnames.map((value, index) => {
                    const lastRoute = index === pathnames.length - 1;
                    let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    
                    let title = convertSlugToTitle(value);
                

                    return (
                        <li className='mt-1 mx-1' key={routeTo}>
                            <span > / </span>
                            {lastRoute ? (
                                <span className='py-1 px-2 bg-yellow-400 rounded-2xl shadow-lg shadow-stone-300'>{title.length > 10 ? title.substring(0, 10) + '...' : title}</span>
                            ) : (
                                <Link to={routeTo} className='hover:underline py-1 px-2 bg-yellow-400 rounded-2xl shadow-lg shadow-stone-300'>{title.length > 10 ? title.substring(0, 10) + '...' : title}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
