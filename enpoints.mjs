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
}

export async function deleteQuote(req, res, quotesCollection) {
    try {
        const result = await quotesCollection.deleteOne({name: req.body.name});

        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
        }
        res.json(`Deleted Darth Vadar's quote`)
    } catch (error) {
        console.error(error)
    }
}