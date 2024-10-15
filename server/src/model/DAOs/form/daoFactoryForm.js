const FormMongoDAO = require('./formMongoDao')

const FormFactory = (type = process.env.STORE) => {
  if(type === 'MONGO') {
    return FormMongoDAO.getInstance(process.env.MONGODB_URL)
  }
}

module.exports = FormFactory