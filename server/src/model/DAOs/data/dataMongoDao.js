import MongoDbContainer from '../../container/mongoDBContainer.js'
import {getModel} from '../../dataModel.js'

class DataMongoDAO extends MongoDbContainer{
  constructor(url){
    super(url, getModel)
  }
  
  async getCollection(collection){
    const model = getModel(collection)
    return model.find({})
  }

  async getAll(){
    return await super.getAll()
  }

  static getInstance(url){
    if(!this.instance){
      this.instance = new DataMongoDAO(url)
    }
    return this.instance
  }
}

export default DataMongoDAO