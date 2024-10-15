const FormService = require('../service/formService')
const serviceForm = new FormService()
const logger = require('../util/config/loggerConfig')
const sendEmailToAdmin = require('../util/config/mailController')

class FormController {
  async save(req, res){
    try{
      if(req.body.number != '' && req.body.email != '' && req.body.message != ''){
        const formSave = await serviceForm.save(req.body)
        await sendEmailToAdmin(req.body)
        res.status(200).json(formSave)
      }else{
        logger.log('warning', 'No object sent')
      }
    } catch(error){
      logger.log('error', 'Error saving form')
    }
  }

  async getAll(req, res){
    try{
      const formAll = await serviceForm.getAll()
      res.status(200).json(formAll)
    }catch(error){
      logger.log('error', 'Error getting all documents')
    }
  }

  async deleteAll(req, res){
    try{
      const formDeleted = await serviceForm.deleteAll()
      res.status(200).json(formDeleted)
    }catch(error){
      logger.log('error', 'Error deleting everything')
    }
  }
}

module.exports = FormController