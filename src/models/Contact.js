const {Schema, model } = require('mongoose');

const contactSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: false,
    default: 1
  }
});

module.exports = model('Contact', contactSchema);