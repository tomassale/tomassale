import DataMongoDAO from './dataMongoDao'

const DataFactory = (type = process.env.STORE) => {
  if(type === 'MONGO') {
    return DataMongoDAO.getInstance(process.env.MONGODB_URL)
  }
}

export default DataFactory