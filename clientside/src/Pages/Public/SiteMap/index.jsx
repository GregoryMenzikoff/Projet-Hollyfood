import { Link } from "react-router-dom"

const SiteMap = () => {
    return (
        <main className='flex flex-col text-center mb-8'>
            <h2 className="text-lg font-medium my-2 underline underline-offset-4">Plan du Site</h2>
            <ul className="my-2">
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/accueil">Accueil</Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/recettes">Recettes</Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/a-propos">À Propos</Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/contact">Contact</Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/connexion">Connexion</Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/inscription">Inscription</Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/profil">Profil</Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                    <Link to="/mentions-legales">Mentions légales</Link>
                </li>
            </ul>
        </main>
    );
}

export default SiteMap;
