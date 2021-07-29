const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');
// comentario
const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());
const { PORT, UPSIDEDOWN_MODE } = process.env;
const hereIsTheUpsideDown = transformationBoolean(UPSIDEDOWN_MODE);

const transformationBoolean = () => {
  if (UPSIDEDOWN_MODE === 'false') {
    return false
  }
  return true;
}

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen( PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
