const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;

app
   .use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(bodyParser.json())

sequelize.initDb();

//Routes of API
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemons')(app);
require('./src/routes/deletePokemons')(app);

//Errors gestion
app.use(({res}) => {
  const message = `Impossible de trouver la route demandé! Essayez une autre URL.`
  res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre app à démmarrée sur le port localhost:${port}`));