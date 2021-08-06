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

// Verifiquei no PR da Nathalia como corrigir o problema de não conseguir ler a variável corretamente no heroku https://github.com/tryber/sd-09-stranger-things-backend/pull/87/commits/7cae5ddae25f75ad5e9d1d643abd913e90d922bb

const upsideDown = process.env.UPSIDEDOWN_MODE;
const hereIsTheUpsideDown = /true/i.test(upsideDown);


app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
