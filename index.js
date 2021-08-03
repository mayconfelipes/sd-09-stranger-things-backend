const express = require('express');
const cors = require('cors');
require('dotenv/config');

const UPSIDEDOWN_MODE = Boolean(process.env.UPSIDEDOWN_MODE);

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

const hereIsTheUpsideDown = UPSIDEDOWN_MODE;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});
const PORT = process.env.PORT || 3000;

const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Escutando na porta: ${PORT} e seu estado é: ${NODE_ENV}`);
});
