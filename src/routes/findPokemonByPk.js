const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
       .then(pokemon => {
         const message = 'Un pokémon a bien été trouvé.'
         res.json({ message, data: pokemon })
       })
       .catch( error =>{
         const message = `Impossible de récupérer le pokémon, réessayez plus tard`
         error.status(500).json({message, data: error})
       })
  })
}