const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: null
    },
    ingredients: {
        type: [], // ! find how
        default: ''
    },
    weight: {
        type: Number,
        default: null
    },
    image: {
        data: Buffer,
        contentType: String
    },
    // imageUrl: {
    //     type: String, 
    //     default: ''
    // },
    categories: {
        type: [ObjectId],
        ref: 'Category'
    }
})
module.exports = model('Food', schema)