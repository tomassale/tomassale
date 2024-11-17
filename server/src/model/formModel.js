import { Schema, model } from 'mongoose'

const FormSchema = new Schema({
  number: {type: String, require: true, minlength: 1},
  email: {
    type: String,
    require: true,
  },
  message: {type: String, require: true}
})

const FormModel = model('Forms', FormSchema, 'Form')
export default FormModel