import { Schema, model } from 'mongoose'

const DataSchema = new Schema(
  {}, 
  {strict: false}
)

export const getModel = (collection) => {
  const dataModel = model('GenericSchema', DataSchema, collection)
  return dataModel
}