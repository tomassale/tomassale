const FormService = require('../service/formService')
const serviceForm = new FormService()
const logger = require('../util/config/loggerConfig')
const sendEmailToAdmin = require('../util/config/mailController')

class FormController {
  async save(req, res) {
    try {
      const { number, email, message } = req.body
      if (number && email && message) {
        const formSave = await serviceForm.save(req.body)
        await sendEmailToAdmin(req.body)
        res.status(200).json(formSave)
      } else {
        logger.log('warning', 'No object sent')
        return res.status(400).json({ error: 'Missing fields in the request' })
      }
    } catch (error) {
      logger.log('error', 'Error saving form: ' + error.message)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getAll(req, res) {
    try {
      const formAll = await serviceForm.getAll()
      res.status(200).json(formAll)
    } catch (error) {
      logger.log('error', 'Error getting all documents: ' + error.message)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async deleteAll(req, res) {
    try {
      const formDeleted = await serviceForm.deleteAll()
      res.status(200).json(formDeleted)
    } catch (error) {
      logger.log('error', 'Error deleting everything: ' + error.message)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = FormController