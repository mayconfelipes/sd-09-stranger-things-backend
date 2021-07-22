const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

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

const hereIsTheUpsideDown = Boolean(process.env.UPSIDEDOWN_MODE === 'true');
console.log('index21', hereIsTheUpsideDown);
app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});
const port = Number(process.env.PORT);
app.listen(port || 3001, () => {
  console.log(`Escutando na porta ${port}`);
});

// "pm2-runtime start ecosystem.config.yml",
