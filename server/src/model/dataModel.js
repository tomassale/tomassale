import { Schema, model } from 'mongoose'

const DataSchema = new Schema(
  {}, 
  {strict: false}
)

const dataModel = model('GenericSchema', DataSchema, 'Data')
export default dataModel