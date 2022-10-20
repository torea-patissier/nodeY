const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=> res.send('HELLO  WORLD'))

app.get('/api/pokemons/:id',(req,res)=>{ // id dynamique
    const id = req.params.id;
    res.send(`Vous avez demandé le pokemon n ${id}`);
});


app.listen(port,()=> console.log(`Notre app à démmarrée sur le port ${port}`));