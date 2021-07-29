const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');
require('dotenv/config');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const convertStringToBoolean = (text) => (text === 'true');

const hereIsTheUpsideDown = convertStringToBoolean(process.env.UPSIDEDOWN_MODE) || false;

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
