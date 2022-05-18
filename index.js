import axios from 'axios'
import cors from 'cors'
import express from 'express'
import Http from 'http'

const pokeApiBase = 'https://pokeapi.co/api/v2'

const app = express.Router()
app.use(cors())

app.route('/api/pokemon/:id')
  .get((req, res)=>{
    const pokeId = req.params.id

    axios.get(
      `${pokeApiBase}/pokemon-species/${pokeId}`
    ).then(externalResponse=>{
      const data = externalResponse.data
      const pokemon = {
        id: data.id,
        name: data.name,
        isLegendary: data.is_legendary,
        description: data.flavor_text_entries[0].flavor_text,
      }
      res.status(200).json(pokemon)
    })
  })

const expressServer = express()
expressServer.use('/', app)

async function startServer(){
  const server = Http.createServer(expressServer)
  server.listen(4000, ()=>{
    console.info('Up and running on', server.address())
  })
}

startServer().catch(console.error)