const express = require('express');
const app = express();
const port = 3000;
let pokemons = require('./mock-pokemon');
const helper = require('./helper');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes} = require('sequelize'); //Datatype add
const pokemonModel = require('./src/models/pokemon'); // add

const sequelize = new Sequelize('pokedex', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
   .then(console.log('Connexion OK'))
   .catch(error => console.log(`Error on connexion = " ${error} "`))

const Pokemon = pokemonModel(sequelize,DataTypes) // instance of the pokemon model

sequelize.sync({force:true}) //This creates the table, dropping it first if it already existed, see documentation
   .then( () => {
     console.log(`Bdd créé`)

     Pokemon.create({
       name: 'bulbizzare',
       hp: 5,
       cp: 10,
       picture: 'https://aze.png/',
       types: ["Plante","Poison"].join() //join to send an array in Bdd separate by "," => "Plante","Poison"
     }).then( item => console.log(item.toJSON())) // then because we return a promise
   })

app
   .use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hi again'))

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Pokémon trouvé'
  res.json(helper.success(message, pokemon));
})

app.get('/api/pokemons', (req, res) => {
  const message = 'Tous les pokémons sont ici : '
  res.json(helper.success(message, pokemons));
});

app.post('/api/pokemons', (req, res) => {
  const id = helper.getUniqueId(pokemons);
  const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokémon ${pokemonCreated.name} à bien été créé!`;
  res.json(helper.success(message, pokemonCreated));
})

app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonUpdated = {...req.body, id: id}
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Le pokémon ${pokemonUpdated.name} à bien été modifié !`
  res.json(helper.success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons  = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} à bien été supprimé !`
    res.json(helper.success(message,pokemonDeleted))
})

app.listen(port, () => console.log(`Notre app à démmarrée sur le port localhost:${port}`));