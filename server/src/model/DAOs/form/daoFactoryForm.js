import FormMongoDAO from './formMongoDao.js'

const FormFactory = (type = process.env.STORE) => {
  if(type === 'MONGO') {
    return FormMongoDAO.getInstance(process.env.MONGODB_URL)
  }
}

export default FormFactory