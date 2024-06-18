
 const validateForm = (credentials) => {
    const errors = {};

    // Validation du champ name
    if (!credentials.name.trim()) {
        errors.name = "Le nom est requis";
    }

    // Validation du champ firstname
    if (!credentials.firstname.trim()) {
        errors.firstname = "Le prénom est requis";
    }

    // Validation du champ email
    if (!credentials.email.trim()) {
        errors.email = "L'adresse e-mail est requise";
    } else if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
        errors.email = "L'adresse e-mail est invalide";
    }

    // Validation du champ password
    if (!credentials.password.trim()) {
        errors.password = "Le mot de passe est requis";
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>\-])[A-Za-z\d!@#$%^&*(),.?":{}|<>\-]{12,}$/.test(credentials.password)) {
        errors.password = "Le mot de passe doit comporter au moins 12 caractères, avec au moins une majuscule et un caractère spécial";
    }
   
    

    // Validation du champ confirmPassword
    if (!credentials.confirmPassword.trim()) {
        errors.confirmPassword = "Veuillez confirmer le mot de passe";
    } else if (credentials.password !== credentials.confirmPassword) {
        errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    return errors;
};


export default validateForm;
