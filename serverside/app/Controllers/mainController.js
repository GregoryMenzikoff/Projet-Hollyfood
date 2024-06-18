import {Recipe, Work} from "../Models/index.js";


const mainController = {

    home: async function (req, res) {
      try {
        const recipes = await Recipe.findAll({
          include: {
            model: Work,
            as: 'work'
            },
        });

        res.json({recipes});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des recettes.' });
      };
    },

    notFound: function(req, res) {
      res.status(404).render('error', {
        message: 'Page non trouvée',
      });
    }};
  
  export default mainController;