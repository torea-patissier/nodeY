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
/**
 * parseInt or we get error because express transform id type int in string
 * pokémon id == id pass in URL
 */

app.get('/api/pokemons',(req,res)=>{
    res.send(`Il y'a ${pokemons.length} pokémons dans la Bdd`)
});

app.listen(port,()=> console.log(`Notre app à démmarrée sur le port localhost:${port}`));