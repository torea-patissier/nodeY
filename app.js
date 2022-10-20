const express = require('express');
const app = express();
const port = 3000;
let pokemons = require('./mock-pokemon');

app.get('/', (req,res)=> res.send('HELLO  WORLD'))

app.get('/api/pokemons/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.send(`Vous avez trouvé le pokemon ${pokemon.name}.`);
})
/**
 * parseInt or we get error because express transform id type int in string
 * pokémon id == id pass in URL
 */

app.get('/api/pokemons',(req,res)=>{
    res.send(`Il y'a ${pokemons.length} pokémons dans la Bdd`)
});
/**
 * Get ALL
 */

app.listen(port,()=> console.log(`Notre app à démmarrée sur le port ${port}`));