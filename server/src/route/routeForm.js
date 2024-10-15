const express = require('express')
const FormController = require('../controller/formController')

const routeForm = express.Router()
const routeController = new FormController()

routeForm.post('/form', (req, res) => routeController.save(req, res))

routeForm.get('/form', (req, res) => routeController.getAll(req, res))

routeForm.delete('/form', (req, res) => routeController.deleteAll(req, res))

module.exports = routeForm