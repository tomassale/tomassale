import DataFactory from "../model/DAOs/data/daoFactoryData";
import Service from "./base/service";

class DataService extends Service{
  constructor(){
    const dataDao = DataFactory(process.env.STORE)
    super(dataDao)
  }
}

export default DataService