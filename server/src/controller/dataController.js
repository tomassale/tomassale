import DataService from '../service/dataService.js'
import logger from '../util/config/loggerConfig.js'
const serviceData = new DataService()

class DataController{
  async getAll(req, res){
    const { collection } = req.params
    try{
      await serviceData.getCollection(collection)
      const dataAll = await serviceData.getAll(collection)
      return res.status(200).json(dataAll)
    }catch(error){
      logger.log('error', 'Error getting all: ' + error.message)
      res.status(500).json({ error: 'Error getting all on controller'})
    }
  }
}

export default DataController