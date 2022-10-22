const express = require('express');
const app = express();
const port = 3000;
let pokemons = require('./mock-pokemon');
const helper = require('./helper');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

app
   .use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(bodyParser.json()) // Pour parser toutes les données envoyés vers l'API

app.get('/',(req,res)=>res.send('Hi again'))

app.get('/api/pokemons/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Pokémon trouvé'
    res.json(helper.success(message,pokemon));
})

app.get('/api/pokemons',(req,res)=>{
    const message = 'Tous les pokémons sont ici : '
    res.json(helper.success(message,pokemons));
});

app.post('/api/pokemons',(req,res) => {
    const id = helper.getUniqueId(pokemons);
    const pokemonCreated = {...req.body,... { id: id, created: new Date()} }
    /**
     * On ajoute dans pokemonCreated
     * req.body = le body du formulaire
     * id = l'id créé à la mano
     * created new date = la date
     */
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} à bien été créé!`;
    res.json(helper.success(message, pokemonCreated));
})

app.put('/api/pokemons/:id',(req,res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} à bien été modifié !`
    res.json(helper.success(message, pokemonUpdated))
})

app.listen(port,()=> console.log(`Notre app à démmarrée sur le port localhost:${port}`));