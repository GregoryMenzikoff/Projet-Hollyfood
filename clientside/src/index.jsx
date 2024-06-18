import { createRoot } from 'react-dom/client';

import './Asset/index.css';


import App from './App/index'; // On importe notre application

const rootDOMElement = document.getElementById('app'); // On récupère l'élément du DOM où on va injecter notre application
const root = createRoot(rootDOMElement); // On crée un root pour injecter notre application
root.render(<App />); // On injecte notre application dans le root