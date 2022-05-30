import express from "express";
import { getQuotes, createQuote, updateQuote, deleteQuote } from './enpoints.mjs'
import {config} from "dotenv";
import bodyParser from "body-parser";
import {MongoClient} from "mongodb";

config();

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

        app.get('/', (req, res) => getQuotes(req, res, quotesCollection))

        app.post('/quotes',  (req, res) => createQuote(req, res, quotesCollection))

        app.put('/quotes', async (req, res ) => updateQuote(req, res, quotesCollection))

        app.delete('/quotes', async (req, res) => deleteQuote(req, res, quotesCollection))
    } catch (error) {
        console.error(`There was a server error: ${error}`)
    }
})()
