import express from 'express'
import { handleValidationErrors } from './middleware/handleValidationErrors.js'
import { validateForm } from './middleware/validationMiddleware.js'
import FormController from '../controller/formController.js'

const routeForm = express.Router()
const routeController = new FormController()

routeForm.post('/form', validateForm, handleValidationErrors, (req, res) => routeController.save(req, res))
routeForm.get('/form', (req, res) => routeController.getAll(req, res))
routeForm.delete('/form', (req, res) => routeController.deleteAll(req, res))

export default routeForm