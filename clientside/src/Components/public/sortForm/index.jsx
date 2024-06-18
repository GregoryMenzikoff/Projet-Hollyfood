import apiFetch from "../../../Utils/apiFetch";
import { useContext, useEffect } from 'react'
import MyState from "../MyContext";

const SortForm = () => {
    const { setRecipes, checked, setChecked } = useContext(MyState)

    const getRecipesList = async () => {
        try {
            const data = await apiFetch('recettes', {}, 'GET');
            setRecipes(data.recipes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRecipesList()
    }, [])

    useEffect(() => {
        // Réinitialiser l'état des cases à cocher lorsque le composant est monté
        setChecked({
            Série: false,
            Film: false,
            Salé: false,
            Sucré: false
        });
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        // Si l'utilisateur coche "Film", désactive "Série"
        if (name === "Film" && checked) {
            setChecked(prevChecked => ({
                ...prevChecked,
                Série: false
            }));
        }
        // Si l'utilisateur coche "Série", désactive "Film"
        else if (name === "Série" && checked) {
            setChecked(prevChecked => ({
                ...prevChecked,
                Film: false
            }));
        }

        setChecked(prevChecked => ({
            ...prevChecked,
            [name]: checked
        }));
    };

    return (
        <section>
            <form className="flex justify-center my-4 font-medium text-lg">
                <div>
                    <label><input className="accent-yellow-400" type="checkbox" name="Série" checked={checked.Série} onChange={handleCheckboxChange} /> Série</label>
                </div>
                <div>
                    <label><input className="accent-yellow-400" type="checkbox" name="Film" checked={checked.Film} onChange={handleCheckboxChange} />Film</label>
                </div>
                <div>
                    <label><input className="accent-yellow-400" type="checkbox" name="Salé" checked={checked.Salé} onChange={handleCheckboxChange} />Salé</label>
                </div>
                <div>
                    <label><input className="accent-yellow-400" type="checkbox" name="Sucré" checked={checked.Sucré} onChange={handleCheckboxChange} />Sucré</label>
                </div>
            </form>
        </section>
    )
};

export default SortForm;
