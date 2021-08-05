const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    process.env.UPSIDEDOWN_MODE === 'true',
  );

  res.status(200).json(characters);
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Narguileira na porta ${PORT}`);
});

/* end com suporte do Joao Victor */