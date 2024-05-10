const express = require('express');
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3333;

const client = require('./config/client')


app.use(express.json())







client.once('open', () => {
console.log('Connected to DB')

app.listen(PORT, () => {
    console.log('Connected on port', PORT)
})
})
