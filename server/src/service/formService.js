const FormFactory = require('../model/DAOs/form/daoFactoryForm')
const Service = require('./base/service')

class FormService extends Service{
  constructor(){
    const formDao = FormFactory(process.env.STORE)
    super(formDao)
  }
}

module.exports = FormService