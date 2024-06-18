import express from 'express';
import * as dotenv from 'dotenv';
import router from './app/router.js';
import cors from 'cors';
import bodyParser from 'express'


// ici import controllers
dotenv.config();

const port = process.env.PORT || 100000 ;

const app = express();

app.use(cors());
// app.use(express.static('./public'));
// app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Creation d'une API endpoint avec un message dans un objet JSON. Pour tester, vérifier que le message apparait bien  dans http://localhost:3000/api
// app.get('/api', (req, res)=> {
//   res.json({message: "Hello from server!"});
// })

// On crée notre url API REST qui renvera nos données au front
app.use('/api', router);


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });
