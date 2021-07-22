const express = require('express');
const cors = require('cors');

require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const { PORT, UPSIDEDOWN_MODE } = process.env;

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const isTrue = () => {
  if (UPSIDEDOWN_MODE === 'true') return true;
  return false;
};

const hereIsTheUpsideDown = isTrue();

app.get('/', (req, res) => {
  console.log(hereIsTheUpsideDown);
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta, ${PORT}`);
});
