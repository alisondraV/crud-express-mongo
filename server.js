require('dotenv').config()
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

;(async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
        console.log('Connected to Database')

        const db = client.db('starwars')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.listen(3000, () => console.log('listening on 3000'))

        app.get('/', async (req, res) => {
            try {
                const results = await quotesCollection.find().toArray()
                res.render('index.ejs', { quotes: results })
            } catch (error) {
                console.error('GET' + error)
            }
        })

        app.post('/quotes', async (req, res) => {
            try {
                const results = await quotesCollection.insertOne(req.body)
                console.log(results)
                res.redirect('/')
            } catch(error) {
                console.error(error)
            }
        })

        app.put('/quotes', async (req, res ) => {
            try {
                await quotesCollection.findOneAndUpdate(
                    {name: 'Yoda'},
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote
                        }
                    },
                    {
                        upsert: false
                    }
                )
                res.json('Success')

            } catch(error) {
                console.error(error)
            }
        })

        app.delete('/quotes', async (req, res) => {
            try {
                const result = await quotesCollection.deleteOne({name: req.body.name});

                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                }
                res.json(`Deleted Darth Vadar's quote`)
            } catch (error) {
                console.error(error)
            }
        })
    } catch (error) {
        console.error(`There was a server error: ${error}`)
    }
})()
