const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const user = require('./routes/user/index')

mongoose.connect(process.env.DB_LOG, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, ()=> console.log("Successfully connected to DB"))

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req,res) => {
    res.send("REST API")
})

app.use('/user', user)

app.listen(process.env.API_PORT, () => {
    console.log(`API started at port ${process.env.API_PORT}`)
})