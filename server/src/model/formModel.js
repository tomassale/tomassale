const { Schema, model } = require('mongoose');

const FormSchema = new Schema({
  number: {type: String, require: false},
  email: {type: String, require: true},
  message: {type: String, require: true}
})

const FormModel = model('Forms', FormSchema, 'Form')
module.exports = FormModel