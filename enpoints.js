export async function getQuotes (req, res, quotesService) {
    try {
        const results = await quotesService.list()
        res.render('index.ejs', { quotes: results })
    } catch (error) {
        console.error('GET' + error)
    }
}

export async function createQuote(req, res, quotesService) {
    try {
        const results = await quotesService.create(req.body)
        console.log(results)
        res.redirect('/')
    } catch(error) {
        console.error(error)
    }
}

export async function updateQuote (req, res, quotesService) {
    const id = req.params.id

    try {
        await quotesService.update(id, req.body)
        res.json('Success')

    } catch(error) {
        console.error(error)
    }
}

export async function deleteQuote(req, res, quotesService) {
    try {
        const result = await quotesService.delete(req.body.quoteId)

        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
        }
        res.json(`Deleted the quote quote`)
    } catch (error) {
        console.error(error)
    }
}