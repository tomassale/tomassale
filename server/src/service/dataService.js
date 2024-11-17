import DataFactory from "../model/DAOs/data/daoFactoryData.js";
import Service from "./base/service.js";
import logger from "../util/config/loggerConfig.js";

class DataService extends Service{
  constructor(){
    const dataDao = DataFactory(process.env.STORE)
    super(dataDao)
    this.dataDao = dataDao
  } 

  async getCollection(collection){
    try{
      await this.dataDao.getCollection(collection)
    }catch(error){
      logger.log('error', 'Error getting collection on service')
      throw new Error('Error getting collection' + error.message)
    }
  }

  async getAll(collection) {
    try {
      return await this.dataDao.getAll(collection)
    } catch (error) {
      logger.log('error', 'Error getting all data: ' + error.message)
      throw new Error('Error getting all data: ' + error.message)
    }
  }
}

export default DataService