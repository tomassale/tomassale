import DataService from '../service/formService.js'
import logger from '../util/config/loggerConfig.js'
const dataService = new DataService()

class DataController{
  async getAll(req, res){
    try{
      const dataAll = await dataService.getAll()
      return res.status(200).json(dataAll)
    }catch(error){
      logger.log('error', 'Error getting all: ' + error.message)
      res.status(500).json({ error: 'Internal server error'})
    }
  }
}

export default DataController