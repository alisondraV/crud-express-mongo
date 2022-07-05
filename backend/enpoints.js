export async function getQuotes (req, res, quotesService) {
    try {
        res.render('index.ejs', { quotes: await quotesService.list() })
    } catch (error) {
        console.error('GET: ' + error)
    }
}

export async function createQuote(req, res, quotesService) {
    try {
        await quotesService.create(req.body)
        res.redirect('/')
    } catch(error) {
        console.error('POST: ' + error)
    }
}

export async function updateQuote (req, res, quotesService) {
    try {
        await quotesService.update(req.params.id, req.body)
        res.json('Success')
    } catch(error) {
        console.error('PUT: ' + error)
    }
}

export async function deleteQuote(req, res, quotesService) {
    try {
        const result = await quotesService.delete(req.body.quoteId)

        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
        }
        res.json('Deleted the quote quote')
    } catch (error) {
        console.error('DELETE: ' + error)
    }
}