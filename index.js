const functions = require('firebase-functions');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const mogooseConfig = { useNewUrlParser: true , useUnifiedTopology: true}

const{username, password} = functions.config().mongo
const mongouri =
  `mongodb+srv://${username}:${password}@cluster0.cl7xh.gcp.mongodb.net/DBPets?retryWrites=true&w=majority`
  

mongoose.connect(mongouri, mogooseConfig)

const Pets = require('./Pets')

const app = express()

const createServer = () => {

  app.use(cors({ origin: true }))
  app.get('/pets',async (req,res)=>{
    const resultado = await Pets.find({}).exec()

    res.send(resultado)
  })

  app.post('/pets',async (req,res) => {
    const {body} = req

    const pet = new Pets(JSON.parse(body))
    await pet.save()
    res.send(pet._id)
  })

  app.get('/pets/:id/daralta', async (req,res) => {
    const {id} = req.params
    await Pets.deleteOne({_id:id}).exec()
    res.sendStatus(204)
  })

  return app
}

exports.api = functions.https.onRequest(createServer());
