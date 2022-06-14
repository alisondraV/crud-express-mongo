import { ObjectId } from 'mongodb'

export async function getQuotes (req, res, quotesCollection) {
    try {
        const results = await quotesCollection.find().toArray()
        res.render('index.ejs', { quotes: results })
    } catch (error) {
        console.error('GET' + error)
    }
}

export async function createQuote(req, res, quotesCollection) {
    try {
        const results = await quotesCollection.insertOne(req.body)
        console.log(results)
        res.redirect('/')
    } catch(error) {
        console.error(error)
    }
}

export async function updateQuote (req, res, quotesCollection) {
    const id = req.params.id;

    try {
        await quotesCollection.findOneAndUpdate(
            {
                _id: ObjectId(id),
            },
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
}

export async function deleteQuote(req, res, quotesCollection) {
    try {
        const result = await quotesCollection.deleteOne({ _id: ObjectId(req.body.quoteId) });

        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
        }
        res.json(`Deleted the quote quote`)
    } catch (error) {
        console.error(error)
    }
}