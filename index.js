require('dotenv').config();
const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();
const { PORT, UPSIDEDOWN_MOD } = process.env;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
  );
  const strangerThingsService = new StrangerThingsService(
    strangerThingsRepository,
    );

const hereIsTheUpsideDown = UPSIDEDOWN_MOD === 'true';

app.use(cors());

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});
