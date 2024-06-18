import { Link } from "react-router-dom";
import Subform from "../../../Components/public/subForm"

const Subscribe = () => {
    return (
        <main  className='flex flex-col text-center mb-2'>
        <fieldset className="text-center mb-2">
            <legend className="text-lg font-medium my-2 underline underline-offset-4">Inscription</legend>
            <p className="italic text-sm">Les champs avec * sont obligatoires</p>
            < Subform />
        </fieldset>
        <p className="italic">Déjà membre ? Cliquez <Link className="font-semibold underline underline-offset-2 hover:text-yellow-400" to="/connexion">ici</Link></p>
        </main>
    )
};

export default Subscribe;

