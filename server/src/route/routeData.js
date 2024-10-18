import express from 'express'
import DataController from '../controller/dataController.js'

const routeData = express.Router()
const routeController = new DataController()

routeData.get('/icons', (req, res) => routeController.getAll(req, res))

routeData.get('/project', (req, res) => routeController.getAll(req, res))

routeData.get('/skill', (req, res) => routeController.getAll(req, res))

export default routeData