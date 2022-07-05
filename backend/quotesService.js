import { ObjectId } from 'mongodb'

export class QuotesService {
    constructor(db) {
        this.db = db
    }

    get collection() {
        return this.db.collection('quotes')
    }

    list() {
        return this.collection.find().toArray()
    }

    create(quote) {
        return this.collection.insertOne(quote)
    }

    delete(quoteId) {
        return this.collection.deleteOne({ _id: ObjectId(quoteId) });
    }

    async update(quoteID, quote) {
        await this.collection.findOneAndUpdate(
            {
                _id: ObjectId(quoteID),
            },
            {
                $set: {
                    name: quote.name,
                    quote: quote.quote
                }
            },
            {
                upsert: false
            }
        )
    }
}