import { Link } from 'react-router-dom';


const AFooter = () => {
    return (
        <footer>
            <div className="text-white text-center bg-slate-900">
                <Link to="/contact">Nous contacter - </Link>
                <Link to="/plandusite">Plan du site - </Link>
                <Link to="/a-propos">A propos de nous - </Link>
                <Link to="/mentions-legales">Mentions légales</Link>
            </div>
        </footer>
    );
}

export default AFooter;