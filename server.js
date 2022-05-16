require('dotenv').config()
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect(process.env.MONGODB_CONNECTION)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('starwars')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.listen(3000, function() {
            console.log('listening on 3000')
        })

        app.get('/', (req, res) => {
            quotesCollection.find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            ).then(_ => {
                res.json('Success')
            })
            .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))
