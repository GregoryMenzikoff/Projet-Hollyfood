import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className='mt-auto sticky'>
            <div className="text-center bg-black text-white py-8 items-center">
                <Link className='hover:underline' to="/contact">Nous contacter</Link>
                <span> - </span> 
                <Link className='hover:underline' to="/plandusite">Plan du site</Link>
                <span> - </span> 
                <Link className='hover:underline' to="/a-propos">A propos de nous</Link>
                <span> - </span> 
                <Link className='hover:underline' to="/mentions-legales">Mentions légales</Link>
            </div>
        </footer>
    );
}

export default Footer;