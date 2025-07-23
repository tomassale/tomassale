process.loadEnvFile()

import express from 'express'
import cors from 'cors'
import sendEmail from './utils/mailTransporter.js'
import { handleValidation, regexValidation } from './middleware/mailValidation.js'

//CONFIG
const app = express()
app.use(cors())
app.use(express.json())

//ROUTE
app.post('/form', handleValidation, regexValidation, async (req, res) => {
  try{
    await sendEmail(req.body)
    res.status(200).json({ message: 'Email sent successfully'})
  }catch(error){
    console.log(error)
    res.status(500).json({ error: 'Error on post email'})
  }
})

//PORT
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Running on port ${PORT} - Process ${process.pid}`))