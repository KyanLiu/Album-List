const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const auth = require('./routes/auth')
const profile = require('./routes/profile')

mongoose.connect('mongodb://127.0.0.1/albumDetailUsers').then(() => {
    console.log('Connected to Mongodb')
}).catch((error) => {
    console.error('Error connecting to database', error)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dotenv.config();



app.use('/api/auth', auth)
app.use('/api/profile', profile)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})