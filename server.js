const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = process.env.MONGODB_CONNECTION;

MongoClient.connect(connectionString,(err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})
