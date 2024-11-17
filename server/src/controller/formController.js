import FormService from '../service/formService.js'
import logger from '../util/config/loggerConfig.js'
const serviceForm = new FormService()

class FormController {
  async save(req, res) {
    try {
      const formSave = await serviceForm.save(req.body)
      res.status(200).json(formSave)
    } catch (error) {
      logger.log('error', 'Error saving form: ' + error.message)
      res.status(500).json({ error: 'Error saving on controller' })
    }
  }

  async getAll(req, res) {
    try {
      const formAll = await serviceForm.getAll()
      res.status(200).json(formAll)
    } catch (error) {
      logger.log('error', 'Error getting all: ' + error.message)
      res.status(500).json({ error: 'Error getting all on controller' })
    }
  }

  async deleteAll(req, res) {
    try {
      const formDeleted = await serviceForm.deleteAll()
      res.status(200).json(formDeleted)
    } catch (error) {
      logger.log('error', 'Error deleting all: ' + error.message)
      res.status(500).json({ error: 'Error deleting all on controller' })
    }
  }
}

export default FormController