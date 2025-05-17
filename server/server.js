const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('<h1>Hello, Gamer!</h1><p>So, you are a gamer with some tech skills right!</p>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


