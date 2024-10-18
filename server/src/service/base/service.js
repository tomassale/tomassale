class Service {
  constructor(dao) {
    this.dao = dao
  }

  async getDocument(filter, populateFields) {
    try{
      return await this.dao.getDocument(filter, populateFields)
    }catch(error){
      logger.log('error', 'Error getting documents in service: ' + error.message)
      throw new Error('Error while getting documents')
    }
  }

  async save(entity) {
    try{  
      return await this.dao.save(entity)
    }catch(error){
      logger.log('error', 'Error saving in service: ' + error.message)
      throw new Error('Error while saving form')
    }
  }

  async getById(id, populateFields) {
    try{
      return await this.dao.getById(id, populateFields)
    }catch(error){
      logger.log('error', 'Error getting by id in service: ' + error.message)
      throw new Error('Error while getting by id')
    }
  }

  async getAll(filter, populateFields) {
    try{  
      return await this.dao.getAll(filter, populateFields)
    }catch(error){
      logger.log('error', 'Error getting all in service: ' + error.message)
      throw new Error('Error while getting all')
    }
  }

  async update(id, entity) {
    try{
      return await this.dao.update(id, entity)
    }catch(error){
      logger.log('error', 'Error updating in service: ' + error.message)
      throw new Error('Error while updating')
    }
  }

  async deleteById(id) {
    try{  
      return await this.dao.deleteById(id)
    }catch(error){
      logger.log('error', 'Error deleting by id in service: ' + error.message)
      throw new Error('Error while deleting by id')
    }
  }

  async deleteAll() {
    try{ 
      return await this.dao.deleteAll()
    }catch(error){
      logger.log('error', 'Error deleting all in service: ' + error.message)
      throw new Error('Error while deleting all')
    }
  }
}

export default Service 