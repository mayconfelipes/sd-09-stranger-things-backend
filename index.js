const express = require('express');
const cors = require('cors');

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

const hereIsTheUpsideDown = true;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Escutando na porta 3000');
});

// passo 1: git clone https://github.com/tryber/sd-09-stranger-things-backend.git
// passo 2: cd path_sd-09-stranger-things-backend
// passo 3: heroku login
// passo 4: git checkout -b adrianoforcellini-strangerthings
// passo 5: npm i expres's
// passo 6: heroku create adriano-stranger-heroku
// passo 7: git commit -am 'iniciando deploy'
// passo 8: git push heroku adrianoforcellini-strangerthings
