const express = require('express');
const cors = require('cors');
require('dotenv/config');
//  gerenciando variaveis de ambiente nodeJS
//  https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

// const hereIsTheUpsideDown = true;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    process.env.UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});

// passo 1: git clone https://github.com/tryber/sd-09-stranger-things-backend.git
// passo 2: cd path_sd-09-stranger-things-backend
// passo 3: heroku login
// passo 4: git checkout -b adrianoforcellini-strangerthings
// passo 5: npm i express
// passo 6: heroku create adriano-stranger-heroku
// passo 7: git commit -am 'iniciando deploy'
// passo 8: git push heroku adrianoforcellini-strangerthings:main
