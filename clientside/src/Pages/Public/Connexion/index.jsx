import { Link } from "react-router-dom";
import ConnectForm from "../../../Components/public/connectForm"

const Connect = () => {
    return (
        <main className='flex flex-col text-center'>
        <fieldset className="text-center mb-2">
            <legend className="text-lg font-medium my-2 underline underline-offset-4">Connexion</legend>
            < ConnectForm />
        </fieldset>
        <p className="italic">Pas encore inscrit ? Inscrivez-vous en cliquant <Link className="font-semibold underline underline-offset-2 hover:text-yellow-400" to="/inscription">ici</Link></p>
        </main>
    )
};

export default Connect;