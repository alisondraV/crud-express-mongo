import express from 'express'
import { getQuotes, createQuote, updateQuote, deleteQuote } from './enpoints.js'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import { QuotesService } from './QuotesService.js'

config()

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

;(async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
        console.log('Connected to Database')

        const db = client.db('starwars')
        const quotesService = new QuotesService(db)

        app.use(bodyParser.urlencoded({ extended: true }))

        app.listen(3000, () => console.log('listening on 3000'))

        app.get('/', (req, res) => getQuotes(req, res, quotesService))

        app.post('/quotes',  (req, res) => createQuote(req, res, quotesService))

        app.put('/quotes/:id', async (req, res ) => updateQuote(req, res, quotesService))

        app.delete('/quotes', async (req, res) => deleteQuote(req, res, quotesService))
    } catch (error) {
        console.error(`There was a server error: ${error}`)
    }
})()
