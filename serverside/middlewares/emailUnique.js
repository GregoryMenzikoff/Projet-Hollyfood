import User from "../app/Models/User.js";

const emailUnique =  async (req,res, next) => {
        // On compare l'email de la base de donnée avec celui du formulaire d'inscription
        const email = await User.findOne({where: {email: req.body.email}})

        // SI l'email existe
        if (email) {

            res.json({exists: true})

        }
        
        else {
            res.json({exists: false})
            next()
        }
    };


export default emailUnique;