import express from 'express'
import cors from 'cors'
import routeForm from './route/routeForm.js'
import routeData from './route/routeData.js'
import dotenv from 'dotenv'

//CONFIG
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

//ROUTE
app.use(routeForm)
app.use(routeData)

//PORT
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Running on port ${PORT} - Process ${process.pid}`))