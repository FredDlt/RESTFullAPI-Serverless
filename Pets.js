const mongoose = require('mongoose')

const Pets = mongoose.model('Pet',{
  nombre: String,
  tipo: String,
  descripcion: String,
})

module.exports = Pets