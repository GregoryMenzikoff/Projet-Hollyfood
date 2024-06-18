import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from '../Models/User.js';
import validator from 'validator';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'
import Role from '../Models/Role.js';

dotenv.config()

// Fonction pour traiter le formulaire de connexion
const processLoginForm = async (req, res) => {
    // Récupérer les données en POST
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Vérifier avec Sequelize si l'utilisateur existe
        const user = await User.findOne({
            where: { email: email },
            include: [
                {
                    model: Role,
                    as: "role",
                }
            ]
            });

        // Si l'utilisateur existe
        if (user) {

            const comparePassword = await bcrypt.compare(password, user.password)
            
            // Vérifier si le mot de passe est correct
            if (comparePassword) {
                // Générer un token JWT
                const token = jwt.sign({ userId: user.id, userRole: user.role.id}, process.env.SECRET_TOKEN, { expiresIn: '1h' });
                // const tokenVerif = req.headers.authorization;

                // Vérifier le rôle de l'utilisateur
                if (user.role.id === 1) {
                    // Membre : renvoyer le token avec des informations spécifiques aux membres
                    res.json({ token: token, role: 'membre'});
                } else if (user.role.id === 2) {
                    // Administrateur : renvoyer le token avec des informations spécifiques aux administrateurs
                    res.json({ token: token, role: 'admin'});
                } else {
                    // Rôle non défini : renvoyer un message d'erreur
                    res.status(403).json({ message: 'Rôle non autorisé' });
                }

            } else {
                // Mot de passe incorrect
                res.status(401).json({ message: 'Mot de passe incorrect' });
            }
        } else {
            // Utilisateur non trouvé
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        // Erreur lors de la recherche de l'utilisateur
        console.error('Erreur lors de la recherche de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
    }
};

// Fonction pour traiter le formulaire d'inscription
const processSubForm = async (req, res) => {
    try {
        const { name, firstname, email, password } = req.body; // Extraire les valeurs des champs "name", "firstname", "email" et "password" du corps de la requête.

        const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }; // Définir les options de validation du mot de passe.
        if (!validator.isStrongPassword(password, options)) {
            throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
        }

        const hash = await bcrypt.hash(password, 10); // Générer un hachage du mot de passe en utilisant la fonction "hash" du module "bcrypt".
        const user = await User.create({    // Créer un nouvel utilisateur dans la base de données en utilisant la méthode "create" du modèle "User".
            name,
            firstname,
            email: email.toLowerCase(),
            password: hash // Stocker le hachage du mot de passe dans la base de données.

        });

        // Ajouter l'utilisateur créé à un tableau
        res.json({message: 'creation reussi', user}) // Renvoyer une réponse avec un message de succès et les données de l'utilisateur créé.    
        
    } catch (error) {
        console.error(error);
    }
};

// Fonction pour gérer la demande de réinitialisation de mot de passe
const forgotPassword = async (req, res) => {
    const { email } = req.body; // La propriété "email" est extraite du corps de la requête.
    try {
        const user = await User.findOne({ where: { email: email } });  
        if (!user) { // Si l'utilisateur n'existe pas, on renvoie une réponse avec un code d'erreur 404 et un message d'erreur.
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        const token = jwt.sign({ userId: user.id}, process.env.SECRET_TOKEN, { expiresIn: '1h' }); // On génère un token JWT avec une durée de validité de 1 heure.

        const resetPasswordUrl = `https://projet-hollyfood-front.onrender.com/nouveau-mot-de-passe/${user.id}/${token}`;  // On définit l'URL de réinitialisation du mot de passe.

        var transporter = nodemailer.createTransport({ // On crée un objet "transporter" pour envoyer l'email de réinitialisation du mot de passe.
            service: 'Gmail',
            auth: {
                user: '1hollyfood1@gmail.com',
                pass: 'ymwt zpsw cmcp oqyf',
            },
        });

        var mailContent = { // On définit le contenu de l'email.
            from: '1hollyfood1@gmail.com',
            to: email,
            subject: 'Réinitialisation du mot de passe',
            text: `Cliquez sur le lien pour réinitialiser votre mot de passe : ${resetPasswordUrl}`, // Le texte de l'email contient l'URL de réinitialisation du mot de passe.
        };

        transporter.sendMail(mailContent, function (error, info) { // On envoie l'email en utilisant la méthode "sendMail" de l'objet "transporter".
            if (error) { // Si une erreur se produit lors de l'envoi de l'email, on renvoie une réponse avec un code d'erreur 500 et un message d'erreur.
                console.log(error);
                return res.status(500).json({ message: 'Erreur serveur lors de l\'envoi du mail' });
            } else { // Si l'email est envoyé avec succès, on renvoie une réponse avec un message de succès.
                console.log('Email sent: ' + info.response);
                return res.json({ message: 'Email envoyé' });
            }
        });
    }
    catch (error) { // Si une erreur se produit lors de la recherche de l'utilisateur, on renvoie une réponse avec un code d'erreur 500 et un message d'erreur.
        console.error(error);
        return res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
    }
};

// Cette fonction asynchrone "resetPassword" est utilisée pour réinitialiser le mot de passe d'un utilisateur.
// Elle prend en paramètre une requête (req) et une réponse (res).
const resetPassword = async (req, res) => {
    // On extrait les valeurs des paramètres "id" et "token" de la requête.
    const { id, token } = req.params;
    // On extrait la valeur du champ "password" du corps de la requête.
    const { password } = req.body;

    // On définit les options de validation du mot de passe.
    // Ici, on exige un mot de passe d'au moins 12 caractères avec au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
    const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
    // On utilise la fonction "isStrongPassword" du module "validator" pour vérifier si le mot de passe respecte les critères définis.
    // Si le mot de passe n'est pas valide, on renvoie une réponse avec un code d'erreur 400 et un message d'erreur.
    if (!validator.isStrongPassword(password, options)) {
        return res.status(400).send({
            Status: "Error",
            message: 'Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial'
        });
    }

    try {
        // On utilise la fonction "verify" du module "jwt" pour vérifier la validité du token.
        // On utilise la clé secrète "SECRET_TOKEN" définie dans les variables d'environnement pour décoder le token.
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                // Si une erreur se produit lors de la vérification du token, on renvoie une réponse avec un message d'erreur.
                return res.json({ Status: "Error with token" });
            } else {
                try {
                    // On met à jour le mot de passe de l'utilisateur dans la base de données en utilisant la fonction "update" du modèle "User".
                    // On spécifie les nouvelles valeurs du champ "password" et on filtre les enregistrements en fonction de l'ID de l'utilisateur.
                    await User.update({ password: password }, { where: { id: id } });
                    // Si la mise à jour du mot de passe est réussie, on renvoie une réponse avec un statut de succès.
                    return res.send({ Status: "Success" });
                } catch (error) {
                    // Si une erreur se produit lors de la mise à jour du mot de passe, on renvoie une réponse avec un message d'erreur.
                    return res.send({ Status: error.message });
                }
            }
        });
    } catch (error) {
        // Si une erreur se produit lors de la vérification du token, on renvoie une réponse avec un code d'erreur 500 et un message d'erreur.
        return res.status(500).send({ Status: "Error occurred", error: error.message });
    }
};

export { processLoginForm, processSubForm, forgotPassword, resetPassword};
