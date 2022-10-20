const express = require('express');
const app = express();
const port = 3000;
let pokemons = require('./mock-pokemon');
const helper = require('./helper');

app.get('/', (req,res)=> res.send('HELLO  WORLD'))

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

app.listen(port,()=> console.log(`Notre app à démmarrée sur le port localhost:${port}`));