const MongoDbContainer = require('../../container/mongoDBContainer')
const FormModel = require('../../formModel')

class FormMongoDAO extends MongoDbContainer{
  constructor(url){
    super(url, FormModel)
  }

  async save(form){
    return await super.save(new FormModel(form))
  }

  async getAll(){
    return await super.getAll()
  }

  async deleteAll(){
    return await super.deleteAll()
  }

  static getInstance(url){
    if(!this.instance){
      this.instance = new FormMongoDAO(url)
    }
    return this.instance
  }
}

module.exports = FormMongoDAO