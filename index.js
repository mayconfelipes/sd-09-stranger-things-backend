const express = require('express');
const cors = require('cors');
require('dotenv/config');
//  gerenciando variaveis de ambiente nodeJS
//  https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/

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
    process.env.UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});

// passo 01: git clone https://github.com/tryber/sd-09-stranger-things-backend.git
// passo 02: cd path_sd-09-stranger-things-backend
// passo 03: heroku login
// passo 04: git checkout -b adrianoforcellini-strangerthings
// passo 05: npm i express
// passo 06: heroku create adriano-stranger-heroku
// passo 07: git commit -am 'iniciando deploy'
// passo 08: git push heroku adrianoforcellini-strangerthings:main
// passo 09: criação do arquivo .env  e das variaveis de ambiente.
// passo 10: configurações do .env em index.js
// passo 11: modificando o nome do app para gerar compatibilidade com o teste: 
// heroku apps:rename adriano-stranger-heroku-bd --app adriano-stranger-heroku
// fonte: https://stackoverflow.com/questions/14161098/whats-the-correct-way-to-rename-a-heroku-app
// passo 12: criando um novo remote para upsidedown=false;
// heroku create --remote adriano-stranger-heroku-bk
// passo 13: realizando o deploy:
//  git add. , git commit, git push adriano-stranger-heroku-bk adrianoforcellini-strangerthings:main 
// passo 14: não deu certo. trocando nome do app:
// heroku apps:rename adriano-stranger-heroku-bk --app gentle-fjord-15296
// passo 15: modificando a variavel UPSIDEDOWN_MODE e realizando o push para o app.
// git push adriano-stranger-heroku-bk adrianoforcellini-strangerthings:main
// deu super certo. mas não isso que o teste queria não, viajei.
// passo 16: voltar a variavel e fazer a modificação adequada.