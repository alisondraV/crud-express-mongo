require('dotenv').config()
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

MongoClient.connect(process.env.MONGODB_CONNECTION)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('starwars')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.listen(3000, function() {
            console.log('listening on 3000')
        })

        app.get('/', (req, res) => {
            res.sendFile(__dirname+'/index.html')
        })

        app.post('/quotes', (req, res) => {
            console.log(req.body)
        })
    })
    .catch(error => console.error(error))
