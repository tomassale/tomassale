const express = require('express')
const cors = require('cors')
require('dotenv').config()

//CONFIG
const app = express()
app.use(cors())
app.use(express.json())

const routeForm = require('./route/routeForm')

//ROUTE
app.use(routeForm)

//PORT
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Running on port ${PORT} - Process ${process.pid}`))