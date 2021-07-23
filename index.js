const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const { PORT } = process.env;
const { UPSIDEDOWN_MODE } = process.env;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    // UPSIDEDOWN_MODE,
    console.log(UPSIDEDOWN_MODE),
  );

  res.status(200).send(characters);
});

app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });
