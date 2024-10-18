import MongoDbContainer from "../../container/mongoDBContainer";
import DataModel from '../../dataModel'

class DataMongoDAO extends MongoDbContainer{
  constructor(url){
    super(url, DataModel)
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