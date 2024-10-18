import FormFactory from '../model/DAOs/form/daoFactoryForm.js'
import Service from './base/service.js'
import sendEmailToAdmin from '../util/config/mailController.js'

class FormService extends Service{
  constructor(){
    const formDao = FormFactory(process.env.STORE)
    super(formDao)
  }

  async sendEmailToAdmin(data){
    try{
      await sendEmailToAdmin(data)
    }catch(error){
      throw new Error('Error sending email to admin')
    }
  }

}

export default FormService