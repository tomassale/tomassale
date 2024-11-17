import express from 'express'
import DataController from '../controller/dataController.js'

const routeData = express.Router()
const routeController = new DataController()

routeData.get('/:collection', (req, res) => routeController.getAll(req, res))

export default routeData