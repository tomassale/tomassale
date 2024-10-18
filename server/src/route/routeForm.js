import express from 'express'
import FormController from '../controller/formController.js'

const routeForm = express.Router()
const routeController = new FormController()

routeForm.post('/form', (req, res) => routeController.save(req, res))
routeForm.get('/form', (req, res) => routeController.getAll(req, res))
routeForm.delete('/form', (req, res) => routeController.deleteAll(req, res))

export default routeForm